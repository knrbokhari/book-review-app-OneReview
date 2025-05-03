import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCommentDto) {
    if (!dto.reviewId && !dto.parentId) {
      throw new Error(
        'Comment must be attached to a review or another comment',
      );
    }

    return this.prisma.comment.create({
      data: {
        content: dto.content,
        userId,
        parentId: dto.parentId,
        reviewId: dto.reviewId,
      },
    });
  }

  async findAll(reviewId?: string) {
    const where = reviewId ? { reviewId, parentId: null } : { parentId: null };

    return this.prisma.comment.findMany({
      where,
      include: {
        user: true,
        replies: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
                replies: true, // Nested replies
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
        review: true,
        parent: true,
        replies: true,
      },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: string, userId: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId)
      throw new ForbiddenException('Not allowed to update this comment');

    return this.prisma.comment.update({
      where: { id },
      data: { content: dto.content },
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId)
      throw new ForbiddenException('Not allowed to delete this comment');

    return this.prisma.comment.delete({ where: { id } });
  }
}
