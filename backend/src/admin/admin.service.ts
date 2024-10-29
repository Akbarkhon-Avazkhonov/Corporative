import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrderStatus } from '@prisma/client';
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
    const users: any = await this.prisma.user.findMany({
      take: 10,
      orderBy: { balance: 'desc' },
      include: {
        Links: {
          select: {
            id: true,
            title: true,
            product_id: true,
            url_link: true,
            created_at: true,
            Orders: {
              select: {
                status: true,
              },
            },
          },
        },
      },
    });
    for (let i = 0; i < users.length; i++) {
      users[i].total_links = await this.prisma.link.count({
        where: { user_id: users[i].id },
      });
    }
    return users;
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
    const count = await this.prisma.user.count();
    return {
      users: users,
      count: count,
    };
  }

  async getUserProfile(id: number) {
    const user: any = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        Orders: {
          take: 100,
          orderBy: { created_at: 'desc' },
        },
        _count: {
          select: { Links: true, Orders: true },
        },
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const DONE = await this.prisma.orders.count({
      where: { user_id: user.id, status: 'DONE' },
    });
    const IN_PROGRESS = await this.prisma.orders.count({
      where: {
        user_id: user.id,
        OR: [{ status: 'NEW' }, { status: 'IN_PROGRESS' }],
      },
    });

    const REJECTED = await this.prisma.orders.count({
      where: {
        user_id: user.id,
        OR: [{ status: 'REJECTED' }],
      },
    });

    const TRASH = await this.prisma.orders.count({
      where: {
        user_id: user.id,
        OR: [{ status: 'TRASH' }],
      },
    });
    const PAID = await this.prisma.orders.count({
      where: {
        user_id: user.id,
        OR: [{ status: 'PAID' }],
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: user.id,
      fullname: user.fullname,
      phone_number: user.phone_number,
      email: user.email,
      balance: user.balance,
      isVerified: user.isVerified,
      Orders: user.Orders,
      total_orders: user._count.Orders,
      referral_links: user._count.Links,
      PAID: PAID,
      DONE: DONE,
      IN_PROGRESS: IN_PROGRESS,
      REJECTED: REJECTED,
      TRASH: TRASH,
    };
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
        where: { product_id: products[i].id, status: OrderStatus.DONE },
      });
    }
    const count = await this.prisma.product.count();
    return {
      products: products,
      count: count,
    };
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
              gte: new Date(
                new Date().getTime() - (i + 1) * 24 * 60 * 60 * 1000,
              ),
              lt: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000),
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
                numberOfDaysLastMonth - i + 1,
              ),
              lt: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                numberOfDaysLastMonth - i,
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

  async getRate() {
    const answer = await this.prisma.rate.findFirst();
    if (answer) {
      return answer.rate;
    }
    return 0;
  }

  async changeRate(rate: number) {
    if (rate < 0) {
      throw new HttpException('Rate must be positive', HttpStatus.BAD_REQUEST);
    }
    try {
      try {
        const answer = await this.prisma.rate.update({
          where: { id: 1 },
          data: { rate: rate },
        });
        return answer.rate;
      } catch {
        const answer = await this.prisma.rate.create({
          data: { rate: rate },
        });
        return answer.rate;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
