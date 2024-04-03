import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  // private readonly prisma: PrismaService
  constructor(private readonly prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prisma.orders.create({ data: createOrderDto });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  updateOrderStatus(updateOrderDto: { order_id: number; status: string }) {
    if (updateOrderDto.order_id) {
      return this.prisma.orders.update({
        where: { id: updateOrderDto.order_id },
        data: { status: updateOrderDto.status },
      });
    } else {
      throw new UnauthorizedException();
    }

  }
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
