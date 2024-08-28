import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Bid')
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        surname: { type: 'string' },
        phone: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidService.create(createBidDto);
  }

  @Get()
  findAll() {
    return this.bidService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidService.remove(+id);
  }
}
