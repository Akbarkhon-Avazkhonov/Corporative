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

    const order = await this.prisma.orders.create({
      data: createOrderDto,
      include: { Product: true },
    });

    sendOrderTo1C(order);

    return order;
  }

  async findAll() {
    return await this.prisma.orders.findMany({
      include: { Product: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findSome(take: number, skip: number) {
    return await this.prisma.orders.findMany({
      include: { Product: true },
      take,
      skip,
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
      orderBy: { created_at: 'desc' },
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

  async remove(id: number) {
    return await this.prisma.orders.delete({ where: { id } });
  }
}

function convertDate(created_at: string | Date) {
  const date = new Date(created_at);
  return date.toISOString().split('.')[0].replace('T', ' ');
}
async function sendOrderTo1C(order) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'Basic RXhjaGFuZ2VVc2VyOmZEaUFDQ3JDdm9MTg==',
  );

  const raw = JSON.stringify({
    auth: {
      login: 'ExchangeUser',
      password: 'oKB0DXgn',
    },
    order_id: '1',
    order_date: convertDate(order.created_at),
    category: 'partenrs',
    cpa: 'partners',
    client_name: order.name + ' ' + order.surname,
    phone_number: order.phone,
    webmaster_id: 'webmaster_id',
    city: order.city,
    items: {
      id: order.Product.id,
      title: 'Corporative' + order.Product.title,
      quantity: order.count,
      PromotionalPrice: order.Product.price,
    },
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  await fetch(
    'https://flashcloud.uz/trade_test2/hs/arbdata/orders/post',
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
