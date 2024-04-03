import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guad';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        surname: { type: 'string' },
        phone: { type: 'string' },
        city: { type: 'string' },
        product_id: { type: 'number' },
        count: { type: 'number' },
      },
    },
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }


  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        order_id: { type: 'number' },
        status: { type: 'string' },
      },
    },
  })
  @Post('/orderStatus')
  updateOrderStatus(
    @Body()
    updateOrderDto: {
      order_id: number;
      status: string;
    },
  ) {
    return this.ordersService.updateOrderStatus(updateOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
