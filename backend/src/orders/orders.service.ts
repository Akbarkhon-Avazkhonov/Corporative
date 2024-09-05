import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
import { OrderStatus } from '@prisma/client';
@Injectable()
export class OrdersService {
  // private readonly prisma: PrismaService
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    if (createOrderDto.link_id) {
      const link = await this.prisma.link.findUnique({
        where: { id: +createOrderDto.link_id },
        select: { user_id: true },
      });
      createOrderDto.user_id = +link.user_id;
    }

    return await this.prisma.orders.create({ data: createOrderDto });
  }

  async findAll() {
    return await this.prisma.orders.findMany({
      include: { Product: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findReferralOrders(id: number) {
    return await this.prisma.orders.findMany({
      where: { user_id: id },
      include: { Link: true },
      orderBy: { created_at: 'desc' },
    });
  }
  async findReferralOrdersPaginated(id: number, skip: number, take: number) {
    return await this.prisma.orders.findMany({
      where: { user_id: id },
      include: { Link: true },
      skip,
      take,
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async updateOrderStatus(updateOrderDto: {
    order_id: number;
    status: OrderStatus;
  }) {
    return true;
    if (updateOrderDto.status === OrderStatus.DONE) {
      const user = await this.prisma.orders.findUnique({
        where: { id: updateOrderDto.order_id },
        select: { user_id: true },
      });
      if (user) {
        await this.prisma.user.update({
          where: { id: user.user_id },
          data: { balance: { increment: 1 } },
        });
      }
    }
    if (updateOrderDto.order_id) {
      return this.prisma.orders.update({
        where: { id: +updateOrderDto.order_id },
        data: { status: updateOrderDto.status },
      });
    } else {
      throw new UnauthorizedException();
    }
  }
  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
