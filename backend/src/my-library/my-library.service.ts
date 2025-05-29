/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateMyLibraryDto } from './dto/create-my-library.dto';
// import { UpdateMyLibraryDto } from './dto/update-my-library.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyLibraryService {
  constructor(private prisma: PrismaService) {}

  async addToLibrary(dto: any) {
    const existing = await this.prisma.myLibrary.findUnique({
      where: { userId_bookId: { userId: dto?.userId, bookId: dto?.bookId } },
    });

    if (existing) {
      throw new BadRequestException('Book already exists in your library');
    }

    return await this.prisma.myLibrary.create({
      data: {
        userId: dto?.userId,
        bookId: dto?.bookId,
        status: 'Want to Read',
      },
    });
  }

  async updateStatus(userId: number, bookId: number, dto: any) {
    const existing = await this.prisma.myLibrary.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });
    if (!existing) throw new NotFoundException('Entry not found');

    return this.prisma.myLibrary.update({
      where: { userId_bookId: { userId, bookId } },
      data: dto,
    });
  }

  async getAll(userId: number, page = 1, limit = 10) {
    console.log(userId, page, limit);
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.myLibrary.findMany({
          where: { userId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            book: true,
          },
        }),
        this.prisma.myLibrary.count({
          where: { userId },
        }),
      ]);

      return { data, total, page, limit };
    } catch (error) {
      console.log(error);
    }

    // return await this.prisma.myLibrary.findMany({
    //   where: { userId },
    //   // include: { book: true },
    // });
  }

  async remove(userId: number, bookId: number) {
    return await this.prisma.myLibrary.delete({
      where: { userId_bookId: { userId, bookId } },
    });
  }
}
