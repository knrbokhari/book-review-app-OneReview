import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { authUser: true },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
  }

  async listUsers(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, isActive, isDeleted } = paginationDto;
    const skip = (page - 1) * limit;

    const filters: { authUser?: { isActive?: boolean; isDeleted?: boolean } } =
      {};

    if (typeof isActive !== 'undefined') {
      filters.authUser = { isActive: isActive === 'true' };
    }

    if (typeof isDeleted !== 'undefined') {
      filters.authUser = {
        ...filters.authUser,
        isDeleted: isDeleted === 'true',
      };
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { authUser: true },
      }),
      this.prisma.user.count({ where: filters }),
    ]);

    return {
      data: users,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async deactivateAccount(userId: string) {
    await this.prisma.authUser.update({
      where: { id: userId },
      data: {
        isActive: false,
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return { message: 'Account deactivated successfully' };
  }
}
