import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { ReferralModule } from './referral/referral.module';
import { OrdersModule } from './orders/orders.module';
import { SuperCategoryModule } from './super-category/super-category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { GuidesModule } from './guides/guides.module';
import { BidModule } from './bid/bid.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CategoryModule,
    ReferralModule,
    OrdersModule,
    SuperCategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL path to serve the files from
    }),
    AdminModule,
    GuidesModule,
    BidModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
