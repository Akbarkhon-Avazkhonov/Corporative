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
let ReferralService = class ReferralService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createReferralDto) {
        return await this.prisma.link.create({
            data: {
                ...createReferralDto,
                url_link: `/user_id=${createReferralDto.user_id}&product_id=${createReferralDto.product_id}`,
            },
        });
    }
    async findAll(user_id) {
        return await this.prisma.link.findMany({
            where: { user_id: user_id },
        });
    }
    async findOne(id) {
        return await this.prisma.link.findUnique({
            where: { id: id },
        });
    }
    async deleteOne(id) {
        if (!(await this.prisma.link.findUnique({ where: { id: id } }))) {
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