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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createUser(body) {
        try {
            const password = await bcrypt.hash(body.password, +process.env.BCRYPT_SALT_ROUNDS);
            const user = await this.prisma.user.create({
                data: {
                    ...body,
                    password: password,
                },
            });
            const payload = { sub: user.id, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
                user_id: user.id,
            };
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.CONFLICT);
        }
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.HttpException('Wrong password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user_id: user.id,
        };
    }
    async getProfile(email) {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
            include: {
                Orders: {
                    take: 15,
                    orderBy: { created_at: 'desc' },
                },
                _count: {
                    select: { Links: true, Orders: true },
                },
            },
        });
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
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            id: user.id,
            fullname: user.fullname,
            phone_number: user.phone_number,
            email: email,
            balance: user.balance,
            isVerified: user.isVerified,
            Orders: user.Orders,
            total_orders: user._count.Orders,
            referral_links: user._count.Links,
            DONE: DONE,
            IN_PROGRESS: IN_PROGRESS,
            REJECTED: REJECTED,
            TRASH: TRASH,
        };
    }
    async sendPhoneCode(number) {
        try {
            const code = await this.getRandomSixDigitNumber();
            const message = `Euphoria регистрация Ваш код / Sizning kodingiz - ${code}`;
            await this.prisma.phoneCode.upsert({
                where: { phone: number },
                update: { code: code },
                create: { phone: number, code: code },
            });
            await this.sendSMS(number, message);
            return true;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            console.log(e);
        }
    }
    async verifyPhoneCode(number, code) {
        const phoneCode = await this.prisma.phoneCode.findUnique({
            where: {
                phone: number,
                code: code,
            },
        });
        if (!phoneCode) {
            throw new common_1.HttpException('Invalid code', common_1.HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
    async sendSMS(number, message) {
        let TOKEN = await this.prisma.smsToken.findUnique({
            where: { id: 1 },
        });
        if (!TOKEN) {
            await this.getToken();
        }
        TOKEN = TOKEN.token;
        const response = await fetch(process.env.SMS_URL + 'message/sms/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                mobile_phone: number,
                message: message,
                from: process.env.SMS_FROM,
            }),
        });
        if (response.status !== 200) {
            await this.getToken();
            const response = await fetch(process.env.SMS_URL + 'message/sms/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                    mobile_phone: number,
                    message: message,
                    from: process.env.SMS_FROM,
                }),
            });
            if (response.status !== 200) {
                throw new common_1.HttpException('SMS not sent', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                return true;
            }
        }
        return true;
    }
    async getToken() {
        const newToken = await fetch(process.env.SMS_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: process.env.SMS_EMAIL,
                password: process.env.SMS_PASSWORD,
            }),
        })
            .then((res) => res.json())
            .catch((error) => {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
        });
        if (newToken.data.token) {
            await this.prisma.smsToken.upsert({
                where: { id: 1 },
                update: { token: newToken.data.token },
                create: { id: 1, token: newToken.data.token },
            });
        }
    }
    async getRandomSixDigitNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map