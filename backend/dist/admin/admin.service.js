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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
let AdminService = class AdminService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(name, password) {
        if (name != process.env.ADMIN_NAME) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!(await bcrypt.compare(password, process.env.ADMIN_PASSWORD))) {
            throw new common_1.HttpException('Wrong password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: 1, name: name };
        return {
            access_token: await this.jwtService.signAsync(payload),
            name: name,
        };
    }
    async getReferralCount() {
        return await this.prisma.link.count();
    }
    async getBalance() {
        const sum = await this.prisma.user.aggregate({
            _sum: { balance: true },
        });
        return sum._sum.balance;
    }
    async getTopReferrals() {
        const users = await this.prisma.user.findMany({
            take: 10,
            orderBy: { balance: 'desc' },
            include: {
                Links: {
                    select: {
                        id: true,
                        title: true,
                        product_id: true,
                        url_link: true,
                        created_at: true,
                        Orders: {
                            select: {
                                status: true,
                            },
                        },
                    },
                },
            },
        });
        for (let i = 0; i < users.length; i++) {
            users[i].total_links = await this.prisma.link.count({
                where: { user_id: users[i].id },
            });
        }
        return users;
    }
    async getUsers(page) {
        const users = await this.prisma.user.findMany({
            skip: page * 10,
            take: 10,
            select: {
                id: true,
                fullname: true,
                phone_number: true,
                email: true,
                gender: true,
                age: true,
                city: true,
                created_at: true,
                balance: true,
            },
        });
        for (let i = 0; i < users.length; i++) {
            users[i].total_links = await this.prisma.link.count({
                where: { user_id: users[i].id },
            });
        }
        const count = await this.prisma.user.count();
        return {
            users: users,
            count: count,
        };
    }
    async getUserProfile(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            include: {
                Orders: {
                    take: 100,
                    orderBy: { created_at: 'desc' },
                },
                _count: {
                    select: { Links: true, Orders: true },
                },
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const DONE = await this.prisma.orders.count({
            where: { user_id: user.id, status: 'DONE' },
        });
        const IN_PROGRESS = await this.prisma.orders.count({
            where: {
                user_id: user.id,
                OR: [{ status: 'NEW' }, { status: 'IN_PROGRESS' }],
            },
        });
        const REJECTED = await this.prisma.orders.count({
            where: {
                user_id: user.id,
                OR: [{ status: 'REJECTED' }],
            },
        });
        const TRASH = await this.prisma.orders.count({
            where: {
                user_id: user.id,
                OR: [{ status: 'TRASH' }],
            },
        });
        const PAID = await this.prisma.orders.count({
            where: {
                user_id: user.id,
                OR: [{ status: 'PAID' }],
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            id: user.id,
            fullname: user.fullname,
            phone_number: user.phone_number,
            email: user.email,
            balance: user.balance,
            isVerified: user.isVerified,
            Orders: user.Orders,
            total_orders: user._count.Orders,
            referral_links: user._count.Links,
            PAID: PAID,
            DONE: DONE,
            IN_PROGRESS: IN_PROGRESS,
            REJECTED: REJECTED,
            TRASH: TRASH,
        };
    }
    async getProducts(page) {
        const products = await this.prisma.product.findMany({
            skip: page * 10,
            take: 10,
            select: {
                id: true,
                title: true,
                price: true,
                category_id: true,
            },
        });
        for (let i = 0; i < products.length; i++) {
            products[i].category = await this.prisma.category.findUnique({
                where: { id: products[i].category_id },
                select: { title: true },
            });
            products[i].total_orders = await this.prisma.orders.count({
                where: { product_id: products[i].id },
            });
            products[i].total_paid_orders = await this.prisma.orders.count({
                where: { product_id: products[i].id, status: client_1.OrderStatus.DONE },
            });
        }
        const count = await this.prisma.product.count();
        return {
            products: products,
            count: count,
        };
    }
    async getNewUsers() {
        const thisMonth = [];
        const today = new Date().getDate();
        for (let i = 0; i < today; i++) {
            thisMonth.push({
                day: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000).getDate(),
                count: await this.prisma.user.count({
                    where: {
                        created_at: {
                            gte: new Date(new Date().getTime() - (i + 1) * 24 * 60 * 60 * 1000),
                            lt: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000),
                        },
                    },
                }),
            });
        }
        const lastMonth = [];
        const numberOfDaysLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
        for (let i = 0; i < numberOfDaysLastMonth; i++) {
            lastMonth.push({
                day: new Date(new Date().getFullYear(), new Date().getMonth() - 1, numberOfDaysLastMonth - i).getDate(),
                count: await this.prisma.user.count({
                    where: {
                        created_at: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, numberOfDaysLastMonth - i + 1),
                            lt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, numberOfDaysLastMonth - i),
                        },
                    },
                }),
            });
        }
        thisMonth.reverse();
        lastMonth.reverse();
        return { thisMonth, lastMonth };
    }
    async getRate() {
        const answer = await this.prisma.rate.findFirst();
        if (answer) {
            return answer.rate;
        }
        return 0;
    }
    async changeRate(rate) {
        if (rate < 0) {
            throw new common_1.HttpException('Rate must be positive', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            try {
                const answer = await this.prisma.rate.update({
                    where: { id: 1 },
                    data: { rate: rate },
                });
                return answer.rate;
            }
            catch {
                const answer = await this.prisma.rate.create({
                    data: { rate: rate },
                });
                return answer.rate;
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map