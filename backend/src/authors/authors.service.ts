import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorDto) {
    return this.prisma.authors.create({ data });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.authors.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.authors.count(),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const author = await this.prisma.authors.findUnique({ where: { id } });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: number, data: UpdateAuthorDto) {
    await this.ensureExists(id);
    return this.prisma.authors.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.authors.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const author = await this.prisma.authors.findUnique({ where: { id } });
    if (!author) throw new NotFoundException('Author not found');
  }
}
