import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Server is running! ';
  }

  search(search: string) {
    return this.prisma.product.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }
}
