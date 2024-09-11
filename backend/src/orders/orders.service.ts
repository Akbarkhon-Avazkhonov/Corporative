import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
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

    const order = await this.prisma.orders.create({ data: createOrderDto });
    console.log(order);

    return order;
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
    comment: string;
    reason: string;
  }) {
    try {
      if (updateOrderDto.status === OrderStatus.PAID) {
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
          data: {
            status: updateOrderDto.status,
            comment: updateOrderDto.comment,
            reason: updateOrderDto.reason,
          },
        });
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async updateOrdersStatus(updateOrderDto: {
    orders: {
      order_id: number;
      status: OrderStatus;
      comment: string;
      reason: string;
    }[];
  }) {
    try {
      const orders = updateOrderDto.orders.map((order) => {
        if (order.status === OrderStatus.PAID) {
          this.prisma.user.update({
            where: { id: order.order_id },
            data: { balance: { increment: 1 } },
          });
        }
        return this.prisma.orders.update({
          where: { id: order.order_id },
          data: {
            status: order.status,
            comment: order.comment,
            reason: order.reason,
          },
        });
      });
      return await this.prisma.$transaction(orders);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
