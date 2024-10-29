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
exports.OnecService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
let OnecService = class OnecService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleCron() {
        const orders = await this.prisma.orders.findMany({
            orderBy: { created_at: 'asc' },
            where: { status: client_1.OrderStatus.CREATED },
        });
        orders.forEach((order) => {
            const onecStatus = sendOrderTo1C(order, this.prisma);
            if (!onecStatus) {
                return;
            }
        });
    }
};
exports.OnecService = OnecService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnecService.prototype, "handleCron", null);
exports.OnecService = OnecService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OnecService);
function convertDate(created_at) {
    const date = new Date(created_at);
    return date.toISOString().split('.')[0].replace('T', ' ');
}
async function sendOrderTo1C(order, prisma) {
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
    const onecStatus = await fetch('https://flashcloud.uz/trade_test2/hs/arbdata/orders/post', requestOptions)
        .then((response) => {
        if (!response.ok) {
            console.log(response);
            return false;
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
    return onecStatus;
}
//# sourceMappingURL=onec.service.js.map