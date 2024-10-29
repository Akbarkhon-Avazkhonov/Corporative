import { Module } from '@nestjs/common';
import { OnecService } from './onec.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [OnecService, PrismaService],
})
export class OnecModule {}
