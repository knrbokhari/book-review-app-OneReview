import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    const { authors, categories, ...rest } = data;

    return this.prisma.book.create({
      data: {
        ...rest,
        authors: {
          connect: authors.map((id) => ({ id })),
        },
        categories: {
          connect: categories.map((id) => ({ id })),
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
          authors: true,
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
        authors: true,
        categories: true,
        publication: true,
      },
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, data: UpdateBookDto) {
    await this.ensureExists(id);
    const { authors, categories, ...rest } = data;

    return this.prisma.book.update({
      where: { id },
      data: {
        ...rest,
        ...(authors && {
          authors: {
            set: authors.map((id) => ({ id })),
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
