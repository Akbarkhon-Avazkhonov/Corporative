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
        return await this.prisma.orders.create({ data: createOrderDto });
    }
    async findAll() {
        return await this.prisma.orders.findMany({
            include: { Product: true },
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
        });
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    async updateOrderStatus(updateOrderDto) {
        try {
            if (updateOrderDto.status === client_1.OrderStatus.DONE) {
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
                if (order.status === client_1.OrderStatus.DONE) {
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
    update(id) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map