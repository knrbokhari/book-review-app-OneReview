import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateReviewDto) {
    const existing = await this.prisma.review.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId: dto.bookId,
        },
      },
    });
    if (existing) {
      throw new ForbiddenException('You have already reviewed this book');
    }

    return this.prisma.review.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(bookId?: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = bookId ? { bookId } : {};
    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          book: true,
          likes: true,
          comments: true,
        },
      }),
      this.prisma.review.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        book: true,
        likes: true,
        comments: true,
      },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: number, userId: number, dto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    if (review.userId !== userId)
      throw new ForbiddenException('You can only update your own review');

    return this.prisma.review.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    if (review.userId !== userId)
      throw new ForbiddenException('You can only delete your own review');

    return this.prisma.review.delete({ where: { id } });
  }
}
