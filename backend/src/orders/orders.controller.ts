import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guad';
import { AuthGuard } from 'src/auth/auth.guad';
import { OrderStatus } from '@prisma/client';
import { BasicAuthGuard } from 'src/admin/basicAuth.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('referral')
  findReferralOrders(@Request() req: any) {
    const id = req.user_id;
    return this.ordersService.findReferralOrders(+id);
  }

  @Get('referral/:skip/:take')
  findReferralOrdersPaginated(
    @Param('skip') skip: string,
    @Param('take') take: string,
    @Request() req: any,
  ) {
    const id = req.user_id;
    return this.ordersService.findReferralOrdersPaginated(+id, +skip, +take);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(BasicAuthGuard)
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
      status: OrderStatus;
    },
  ) {
    return this.ordersService.updateOrderStatus(updateOrderDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
