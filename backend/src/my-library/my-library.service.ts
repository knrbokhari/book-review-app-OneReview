/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateMyLibraryDto } from './dto/create-my-library.dto';
// import { UpdateMyLibraryDto } from './dto/update-my-library.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyLibraryService {
  constructor(private prisma: PrismaService) {}

  async addToLibrary(dto: any) {
    return await this.prisma.myLibrary.create({
      data: {
        userId: dto?.userId,
        bookId: dto?.bookId,
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

  async getAll(userId: number) {
    return await this.prisma.myLibrary.findMany({
      where: { userId },
      include: { book: true },
    });
  }

  async remove(userId: number, bookId: number) {
    return await this.prisma.myLibrary.delete({
      where: { userId_bookId: { userId, bookId } },
    });
  }
}
