import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
