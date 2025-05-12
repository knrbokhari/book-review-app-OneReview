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
        // authors: true,
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
        ...rest,
        ...(author && {
          authors: {
            set: author.map((id) => ({ id })),
          },
        }),
        ...(categories && {
          categories: {
            set: categories.map((id) => ({ id })),
          },
        }),
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
