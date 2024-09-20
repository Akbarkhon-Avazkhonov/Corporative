import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        Product: {
            id: number;
            title: string;
            compound: string;
            category_id: number;
            action: string;
            price: number;
            description: string;
            count: number;
            testimony: string;
            contraction: string;
            image: import(".prisma/client").Prisma.JsonValue;
            color: number;
            extra: import(".prisma/client").Prisma.JsonValue;
        };
    } & {
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        comment: string;
        reason: string;
        count: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        link_id: number;
        user_id: number;
        created_at: Date;
    }>;
    findAll(): Promise<({
        Product: {
            id: number;
            title: string;
            compound: string;
            category_id: number;
            action: string;
            price: number;
            description: string;
            count: number;
            testimony: string;
            contraction: string;
            image: import(".prisma/client").Prisma.JsonValue;
            color: number;
            extra: import(".prisma/client").Prisma.JsonValue;
        };
    } & {
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        comment: string;
        reason: string;
        count: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        link_id: number;
        user_id: number;
        created_at: Date;
    })[]>;
    findReferralOrders(id: number): Promise<({
        Link: {
            id: number;
            title: string;
            product_id: number;
            user_id: number;
            url_link: string;
            created_at: Date;
        };
    } & {
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        comment: string;
        reason: string;
        count: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        link_id: number;
        user_id: number;
        created_at: Date;
    })[]>;
    findReferralOrdersPaginated(id: number, skip: number, take: number): Promise<({
        Link: {
            id: number;
            title: string;
            product_id: number;
            user_id: number;
            url_link: string;
            created_at: Date;
        };
    } & {
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        comment: string;
        reason: string;
        count: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        link_id: number;
        user_id: number;
        created_at: Date;
    })[]>;
    findOne(id: number): string;
    updateOrderStatus(updateOrderDto: {
        order_id: number;
        status: OrderStatus;
        comment: string;
        reason: string;
    }): Promise<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        comment: string;
        reason: string;
        count: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        link_id: number;
        user_id: number;
        created_at: Date;
    }>;
    updateOrdersStatus(updateOrderDto: {
        orders: {
            order_id: number;
            status: OrderStatus;
            comment: string;
            reason: string;
        }[];
    }): Promise<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        city: string;
        product_id: number;
        comment: string;
        reason: string;
        count: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        link_id: number;
        user_id: number;
        created_at: Date;
    }[]>;
    update(id: number): string;
    remove(id: number): string;
}
