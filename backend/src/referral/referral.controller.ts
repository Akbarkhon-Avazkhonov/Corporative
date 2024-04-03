import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Request,
  Req
} from '@nestjs/common';
import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guad';

@ApiTags('Referral Lincks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product_id: { type: 'number' },
        title: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() createReferralDto: CreateReferralDto, @Request() req: any) {
    createReferralDto.user_id = req.user_id;
    return this.referralService.create(createReferralDto);
  }

  @Get('')
  findAll(@Request() req: any) {
    return this.referralService.findAll(req.user_id);
  }

  @Get('id/:id')
  findOne(@Param('id') id: number, @Request() req: any) {
    return this.referralService.findOne(+id, req.user_id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number, @Request() req: any) {
    return this.referralService.deleteOne(+id, req.user_id);
  }
}
