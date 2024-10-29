"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        if (createOrderDto.link_id) {
            const link = await this.prisma.link.findUnique({
                where: { id: +createOrderDto.link_id },
                select: { user_id: true },
            });
            createOrderDto.user_id = +link.user_id;
        }
        const order = await this.prisma.orders.create({
            data: createOrderDto,
            include: { Product: true },
        });
        sendOrderTo1C(order, this.prisma);
        return order;
    }
    async findAll() {
        return await this.prisma.orders.findMany({
            include: { Product: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async findSome(take, skip) {
        return await this.prisma.orders.findMany({
            include: { Product: true },
            take,
            skip,
            orderBy: { created_at: 'desc' },
        });
    }
    async findReferralOrders(id) {
        return await this.prisma.orders.findMany({
            where: { user_id: id },
            include: { Link: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async findReferralOrdersPaginated(id, skip, take) {
        return await this.prisma.orders.findMany({
            where: { user_id: id },
            include: { Link: true },
            skip,
            take,
            orderBy: { created_at: 'desc' },
        });
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    async updateOrderStatus(updateOrderDto) {
        try {
            if (updateOrderDto.status === client_1.OrderStatus.PAID) {
                const user = await this.prisma.orders.findUnique({
                    where: { id: updateOrderDto.order_id },
                    select: { user_id: true },
                });
                if (user) {
                    await this.prisma.user.update({
                        where: { id: user.user_id },
                        data: { balance: { increment: 1 } },
                    });
                }
            }
            if (updateOrderDto.order_id) {
                return this.prisma.orders.update({
                    where: { id: +updateOrderDto.order_id },
                    data: {
                        status: updateOrderDto.status,
                        comment: updateOrderDto.comment,
                        reason: updateOrderDto.reason,
                    },
                });
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async updateOrdersStatus(updateOrderDto) {
        try {
            const orders = updateOrderDto.orders.map((order) => {
                if (order.status === client_1.OrderStatus.PAID) {
                    this.prisma.user.update({
                        where: { id: order.order_id },
                        data: { balance: { increment: 1 } },
                    });
                }
                return this.prisma.orders.update({
                    where: { id: order.order_id },
                    data: {
                        status: order.status,
                        comment: order.comment,
                        reason: order.reason,
                    },
                });
            });
            return await this.prisma.$transaction(orders);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async remove(id) {
        return await this.prisma.orders.delete({ where: { id } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
function convertDate(created_at) {
    const date = new Date(created_at);
    return date.toISOString().split('.')[0].replace('T', ' ');
}
function sendOrderTo1C(order, prisma) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic RXhjaGFuZ2VVc2VyOmZEaUFDQ3JDdm9MTg==');
    const raw = JSON.stringify({
        auth: {
            login: 'ExchangeUser',
            password: 'oKB0DXgn',
        },
        order_id: '1',
        order_date: convertDate(order.created_at),
        category: 'partenrs',
        cpa: 'partners',
        client_name: order.name + ' ' + order.surname,
        phone_number: order.phone,
        webmaster_id: 'webmaster_id',
        city: order.city,
        items: {
            id: order.Product.id,
            title: 'Corporative' + order.Product.title,
            quantity: order.count,
            PromotionalPrice: order.Product.price,
        },
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    fetch('https://flashcloud.uz/trade_test2/hs/arbdata/orders/post', requestOptions)
        .then((response) => {
        if (!response.ok) {
            console.log(response);
        }
        else {
            prisma.orders.update({
                where: { id: order.id },
                data: { status: client_1.OrderStatus.NEW },
            });
            response.text();
        }
    })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
//# sourceMappingURL=orders.service.js.map