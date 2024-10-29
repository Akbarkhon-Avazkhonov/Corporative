import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    findSome(take: number, skip: number): Promise<({
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
    findReferralOrders(req: any): Promise<({
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
    findReferralOrdersPaginated(skip: string, take: string, req: any): Promise<({
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
    findOne(id: string): string;
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
    updateOrdersStatus(updateOrdersDto: {
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
    remove(id: string): Promise<{
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
}
