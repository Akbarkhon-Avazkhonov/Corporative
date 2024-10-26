import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/auth-product.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto) {
    try {
      const password = await bcrypt.hash(
        body.password,
        +process.env.BCRYPT_SALT_ROUNDS,
      );
      const user = await this.prisma.user.create({
        data: {
          ...body,
          password: password,
        },
      });
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user_id: user.id,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id,
    };
  }

  async getProfile(email: string) {
    const user: any = await this.prisma.user.findUnique({
      where: { email: email },
      include: {
        Orders: {
          take: 15,
          orderBy: { created_at: 'desc' },
        },
        _count: {
          select: { Links: true, Orders: true },
        },
      },
    });

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
      email: email,
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

  async sendPhoneCode(number: string) {
    try {
      const code = await this.getRandomSixDigitNumber();
      const message = `Euphoria регистрация Ваш код / Sizning kodingiz - ${code}`;
      // save code to db  if not exist
      await this.prisma.phoneCode.upsert({
        where: { phone: number },
        update: { code: code },
        create: { phone: number, code: code },
      });
      await this.sendSMS(nuprismamber, message);
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      console.log(e);
    }
  }

  async verifyPhoneCode(number: string, code: number) {
    const phoneCode = await this..phoneCode.findUnique({
      where: {
        phone: number,
        code: code,
      },
    });
    if (!phoneCode) {
      throw new HttpException('Invalid code', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  async sendSMS(number: string, message: string) {
    let TOKEN: any = await this.prisma.smsToken.findUnique({
      where: { id: 1 },
    });
    if (!TOKEN) {
      await this.getToken();
    }
    TOKEN = TOKEN.token;
    const response = await fetch(process.env.SMS_URL + 'message/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        mobile_phone: number,
        message: message,
        from: process.env.SMS_FROM,
      }),
    });
    if (response.status !== 200) {
      await this.getToken();
      const response = await fetch(process.env.SMS_URL + 'message/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          mobile_phone: number,
          message: message,
          from: process.env.SMS_FROM,
        }),
      });
      if (response.status !== 200) {
        throw new HttpException('SMS not sent', HttpStatus.BAD_REQUEST);
      } else {
        return true;
      }
    }
    return true;
  }
  async getToken() {
    const newToken = await fetch(process.env.SMS_URL + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: process.env.SMS_EMAIL,
        password: process.env.SMS_PASSWORD,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      });

    if (newToken.data.token) {
      await this.prisma.smsToken.upsert({
        where: { id: 1 },
        update: { token: newToken.data.token },
        create: { id: 1, token: newToken.data.token },
      });
    }
  }
  // get random 6 digit number
  async getRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
