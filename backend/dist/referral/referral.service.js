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
exports.ReferralService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let ReferralService = class ReferralService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createReferralDto) {
        const link = await this.prisma.link.create({
            data: {
                ...createReferralDto,
                url_link: `${process.env.FRONTEND_URL}/product/${createReferralDto.product_id}/?link_id=`,
            },
        });
        return await this.prisma.link.update({
            where: { id: link.id },
            data: {
                url_link: `${process.env.FRONTEND_URL}/product/${createReferralDto.product_id}/?link_id=${link.id}`,
            },
        });
    }
    async findAll(user_id) {
        return await this.prisma.link.findMany({
            where: { user_id: user_id },
            include: {
                _count: {
                    select: {
                        Orders: true,
                    },
                },
                Orders: {
                    select: {
                        status: true,
                    },
                },
            },
        });
    }
    async findOne(id, user_id) {
        const orders = {
            NEW: 0,
            IN_PROGRESS: 0,
            DONE: 0,
            TRASH: 0,
            REJECTED: 0,
        };
        const referral = await this.prisma.link.findUnique({
            where: { id: id, user_id: user_id },
        });
        if (!referral) {
            throw new common_1.HttpException('Link not found', common_1.HttpStatus.NOT_FOUND);
        }
        orders.NEW = await this.prisma.orders.count({
            where: { link_id: id, status: client_1.OrderStatus.NEW },
        });
        orders.IN_PROGRESS = await this.prisma.orders.count({
            where: { link_id: id, status: client_1.OrderStatus.IN_PROGRESS },
        });
        orders.DONE = await this.prisma.orders.count({
            where: { link_id: id, status: client_1.OrderStatus.DONE },
        });
        orders.TRASH = await this.prisma.orders.count({
            where: { link_id: id, status: client_1.OrderStatus.TRASH },
        });
        orders.REJECTED = await this.prisma.orders.count({
            where: { link_id: id, status: client_1.OrderStatus.REJECTED },
        });
        return { ...referral, orders };
    }
    async deleteOne(id, user_id) {
        if (!(await this.prisma.link.findUnique({
            where: { id: id, user_id: user_id },
        }))) {
            throw new common_1.HttpException('Link not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.link.delete({ where: { id: id } });
    }
};
exports.ReferralService = ReferralService;
exports.ReferralService = ReferralService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReferralService);
//# sourceMappingURL=referral.service.js.map