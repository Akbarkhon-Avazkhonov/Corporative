import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GuidesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createGuideDto: CreateGuideDto) {
    return await this.prisma.guide.create({
      data: createGuideDto,
    });
  }

  async findAll() {
    return await this.prisma.guide.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.guide.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    return await this.prisma.guide.update({
      where: { id: id },
      data: updateGuideDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.guide.delete({
      where: { id: id },
    });
  }
}
