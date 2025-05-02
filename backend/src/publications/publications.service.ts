import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePublicationDto) {
    return this.prisma.publication.create({ data });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.publication.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.publication.count(),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const pub = await this.prisma.publication.findUnique({ where: { id } });
    if (!pub) throw new NotFoundException('Publication not found');
    return pub;
  }

  async update(id: number, data: UpdatePublicationDto) {
    await this.ensureExists(id);
    return this.prisma.publication.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.publication.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const found = await this.prisma.publication.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Publication not found');
  }
}
