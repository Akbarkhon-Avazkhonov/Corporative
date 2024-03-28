import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): import(".prisma/client").Prisma.Prisma__OrdersClient<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        count: number;
        status: string;
        referral_id: number;
        link_id: number;
        created_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
