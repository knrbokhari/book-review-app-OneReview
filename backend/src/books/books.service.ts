/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { toSnakeCase } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    const { author, categories, publisher, ratings, ratting, ...rest } = data;

    return this.prisma.book.create({
      data: {
        ...rest,
        ratings: parseFloat(ratings),
        page: Number(rest.page),
        price: Number(rest.price),
        slug: toSnakeCase(rest.name),
        authorId: author?.id || null,
        publicationId: publisher?.id || null,
        categories: {
          connect: categories.map((c) => ({ id: c.id })),
        },
      },
    });
  }

  async createMany() {
    const predata = [
      {
        title: 'Discipline Equals Freedom',
        author: 'Jocko Willink',
        publisher: "St. Martin's Press",
        rating: 4.8,
        image:
          'https://ejanani.sgp1.cdn.digitaloceanspaces.com/discipline-equals-freedom.jpg',
        price: '17.49',
        description: 'Field Manual for mental and physical toughness.',
        category: ['Motivational', 'Fitness', 'Self-Help'],
      },
    ];

    for (const book of predata) {
      const formattedData: any = {
        name: book.title,
        slug: toSnakeCase(book?.title), // you can change this
        summary: book.description,
        price: parseFloat(book?.price || '0'),
        image: book.image,
        ratings: book.rating,
        tags: [], // Empty array as not provided
        gallery: [], // Empty array as not provided
        status: 'published', // You can adjust this
      };

      // Find Author
      const author = await this.prisma.authors.findFirst({
        where: { name: book.author },
      });
      if (author) {
        formattedData.author = {
          connect: { id: author.id },
        };
      }

      // Find Publication
      const publication = await this.prisma.publication.findFirst({
        where: { name: book.publisher },
      });
      if (publication) {
        formattedData.publication = {
          connect: { id: publication.id },
        };
      }

      // Find and connect Categories
      const categoryConnections: any = [];
      for (const cat of book?.category || []) {
        const category = await this.prisma.categories.findFirst({
          where: { name: cat },
        });
        if (category) {
          categoryConnections.push({ id: category.id });
        }
      }

      // Create Book
      await this.prisma.book.create({
        data: {
          name: formattedData.name,
          slug: formattedData.slug,
          summary: formattedData.summary,
          price: formattedData.price,
          image: formattedData.image,
          ratings: formattedData.ratings,
          tags: formattedData.tags,
          gallery: formattedData.gallery,
          status: formattedData.status,
          authorId: formattedData?.author?.connect?.id || null,
          publicationId: formattedData?.publication?.connect?.id || null,
          categories: {
            connect: formattedData?.categories?.length
              ? formattedData?.categories?.map((c) => ({ id: c.id }))
              : [],
          },
        },
      });
    }

    return;
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
          categories: true,
          publication: true,
        },
      }),
      this.prisma.book.count(),
    ]);

    return { data, total, page, limit };
  }

  async popular(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { ratings: 'desc' },
        include: {
          author: true,
          categories: true,
          publication: true,
        },
      }),
      this.prisma.book.count(),
    ]);

    return { data, total, page, limit };
  }

  async newBook(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
          categories: true,
          publication: true,
        },
      }),
      this.prisma.book.count(),
    ]);

    return { data, total, page, limit };
  }
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        categories: true,
        publication: true,
      },
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, data: UpdateBookDto) {
    await this.ensureExists(id);
    const { author, categories, ...rest } = data;

    return this.prisma.book.update({
      where: { id },
      data: {
        // ...rest,
        image: data.image,
        name: data.name,
        ratings: parseFloat(data?.ratings),
        page: Number(rest.page),
        price: Number(rest.price),
        slug: toSnakeCase(rest.name),
        authorId: author?.id || null,
        publicationId: data?.publisher?.id || null,
        categories: {
          set: categories.map((c) => ({ id: c.id })),
        },
      },
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.book.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const found = await this.prisma.book.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Book not found');
  }
}
