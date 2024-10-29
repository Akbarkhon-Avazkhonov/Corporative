import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OnecService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const orders = await this.prisma.orders.findMany({
      orderBy: { created_at: 'asc' },
      where: { status: OrderStatus.CREATED },
    });

    orders.forEach((order) => {
      const onecStatus = sendOrderTo1C(order, this.prisma);
      if (!onecStatus) {
        // stop the loop if the order is not sent
        return;
      }
    });
  }
}

function convertDate(created_at: string | Date) {
  const date = new Date(created_at);
  return date.toISOString().split('.')[0].replace('T', ' ');
}

async function sendOrderTo1C(order, prisma) {
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

  const onecStatus = await fetch(
    'https://flashcloud.uz/trade_test2/hs/arbdata/orders/post',
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        return false;
      } else {
        prisma.orders.update({
          where: { id: order.id },
          data: { status: OrderStatus.NEW },
        });
        response.text();
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return onecStatus;
}
