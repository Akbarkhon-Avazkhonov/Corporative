import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BidController],
  providers: [BidService, PrismaService],
})
export class BidModule {}
