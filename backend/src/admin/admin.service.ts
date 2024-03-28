import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(name: string, password: string) {
    if (name != process.env.ADMIN_NAME) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!(await bcrypt.compare(password, process.env.ADMIN_PASSWORD))) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: 1, name: name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: name,
    };
  }

  async getReferralCount() {
    return await this.prisma.link.count();
  }
  async getBalance() {
    // return all balance from all users
    const sum = await this.prisma.user.aggregate({
      _sum: { balance: true },
    });
    return sum._sum.balance;
  }

  async getTopReferrals() {
    // Get the top 10 user with the highest balance
    return await this.prisma.user.findMany({
      take: 10,
      orderBy: { balance: 'desc' },
    });
  }

  async getUsers(page: number) {
    const users: any = await this.prisma.user.findMany({
      skip: page * 10,
      take: 10,
      select: {
        id: true,
        fullname: true,
        phone_number: true,
        email: true,
        gender: true,
        age: true,
        city: true,
        created_at: true,
        balance: true,
      },
    });
    // add to all users the total number of their links
    for (let i = 0; i < users.length; i++) {
      users[i].total_links = await this.prisma.link.count({
        where: { user_id: users[i].id },
      });
    }
    return users;
  }

  async getProducts(page: number) {
    const products: any = await this.prisma.product.findMany({
      skip: page * 10,
      take: 10,
      select: {
        id: true,
        title: true,
        price: true,
        category_id: true,
      },
    });

    // add to all products the category name
    for (let i = 0; i < products.length; i++) {
      products[i].category = await this.prisma.category.findUnique({
        where: { id: products[i].category_id },
        select: { title: true },
      });

      // add to all products the total number of their orders
      products[i].total_orders = await this.prisma.orders.count({
        where: { product_id: products[i].id },
      });
      //add to all products the total number of their paid orders
      products[i].total_paid_orders = await this.prisma.orders.count({
        where: { product_id: products[i].id, status: 'PAID' },
      });
    }
    return products;
  }

  async getNewUsers() {
    //get all users that created in the last day
    const thisMonth = [];
    
    // push {day: date} to thisMonth array
    const today = new Date().getDate();
    // this month
    for (let i = 0; i < today; i++) {
      thisMonth.push({
        day: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000).getDate(),
        count: await this.prisma.user.count({
          where: {
            created_at: {
              gte: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000),
              lt: new Date(
                new Date().getTime() - (i - 1) * 24 * 60 * 60 * 1000,
              ),
            },
          },
        }),
      });
    }
    
    const lastMonth = [];
    // last month
    const numberOfDaysLastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0,
    ).getDate();
    for (let i = 0; i < numberOfDaysLastMonth; i++) {
      lastMonth.push({
        day: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          numberOfDaysLastMonth - i,
        ).getDate(),
        count: await this.prisma.user.count({
          where: {
            created_at: {
              gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                numberOfDaysLastMonth - i,
              ),
              lt: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                numberOfDaysLastMonth - i - 1,
              ),
            },
          },
        }),
      });
    }

    thisMonth.reverse();
    lastMonth.reverse();

    return { thisMonth, lastMonth };
  }
}
