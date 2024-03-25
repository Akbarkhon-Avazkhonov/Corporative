import { Module } from '@nestjs/common';
import { SuperCategoryService } from './super-category.service';
import { SuperCategoryController } from './super-category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SuperCategoryController],
  providers: [SuperCategoryService, PrismaService],
})
export class SuperCategoryModule {}
