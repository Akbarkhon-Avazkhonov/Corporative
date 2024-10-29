import { Module } from '@nestjs/common';
import { OnecService } from './onec.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [OnecService],
})
export class OnecModule {}
