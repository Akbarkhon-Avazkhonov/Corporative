import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BidService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBidDto: CreateBidDto) {
    return await this.prisma.bid.create({ data: createBidDto });
  }

  async findAll() {
    return await this.prisma.bid.findMany();
  }

  async findSome(take: number, skip: number) {
    return await this.prisma.bid.findMany({
      take,
      skip,
      orderBy: { id: 'desc' },
    });
  }

  async remove(id: number) {
    return await this.prisma.bid.delete({ where: { id } });
  }
}
