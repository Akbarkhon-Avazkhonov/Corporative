import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReferralDto } from './dto/create-referral.dto';
import { PrismaService } from 'src/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class ReferralService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReferralDto: CreateReferralDto) {
    const link = await this.prisma.link.create({
      data: {
        ...createReferralDto,
        url_link: `${process.env.FRONTEND_URL}/product/${createReferralDto.product_id}/?link_id=`,
      },
    });
    return await this.prisma.link.update({
      where: { id: link.id },
      data: {
        url_link: `${process.env.FRONTEND_URL}/product/${createReferralDto.product_id}/?link_id=${link.id}`,
      },
    });
  }

  async findAll(user_id: number) {
    return await this.prisma.link.findMany({
      orderBy: { id: 'desc' },
      where: { user_id: user_id },
      include: {
        _count: {
          select: {
            Orders: true, // This will give you the total count of orders
          },
        },
        Orders: {
          select: {
            status: true,
          },
        },
      },
    });
  }

  async findOne(id: number, user_id: number) {
    const orders = {
      NEW: 0,
      IN_PROGRESS: 0,
      DONE: 0,
      TRASH: 0,
      REJECTED: 0,
    };
    const referral = await this.prisma.link.findUnique({
      where: { id: id, user_id: user_id },
    });
    if (!referral) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    orders.NEW = await this.prisma.orders.count({
      where: { link_id: id, status: OrderStatus.NEW },
    });

    orders.IN_PROGRESS = await this.prisma.orders.count({
      where: { link_id: id, status: OrderStatus.IN_PROGRESS },
    });

    orders.DONE = await this.prisma.orders.count({
      where: { link_id: id, status: OrderStatus.DONE },
    });

    orders.TRASH = await this.prisma.orders.count({
      where: { link_id: id, status: OrderStatus.TRASH },
    });

    orders.REJECTED = await this.prisma.orders.count({
      where: { link_id: id, status: OrderStatus.REJECTED },
    });

    return { ...referral, orders };
  }

  async deleteOne(id: number, user_id: number) {
    if (
      !(await this.prisma.link.findUnique({
        where: { id: id, user_id: user_id },
      }))
    ) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.link.delete({ where: { id: id } });
  }
}
