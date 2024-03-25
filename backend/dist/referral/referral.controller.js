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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralController = void 0;
const common_1 = require("@nestjs/common");
const referral_service_1 = require("./referral.service");
const create_referral_dto_1 = require("./dto/create-referral.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guad_1 = require("../auth/auth.guad");
let ReferralController = class ReferralController {
    constructor(referralService) {
        this.referralService = referralService;
    }
    create(createReferralDto) {
        return this.referralService.create(createReferralDto);
    }
    findAll(user_id) {
        return this.referralService.findAll(+user_id);
    }
    findOne(id) {
        return this.referralService.findOne(+id);
    }
    deleteOne(id) {
        return this.referralService.deleteOne(+id);
    }
};
exports.ReferralController = ReferralController;
__decorate([
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                user_id: { type: 'number' },
                product_id: { type: 'number' },
                category_id: { type: 'number' },
                title: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_referral_dto_1.CreateReferralDto]),
    __metadata("design:returntype", void 0)
], ReferralController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferralController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReferralController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReferralController.prototype, "deleteOne", null);
exports.ReferralController = ReferralController = __decorate([
    (0, swagger_1.ApiTags)('Referral'),
    (0, common_1.UseGuards)(auth_guad_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('referral'),
    __metadata("design:paramtypes", [referral_service_1.ReferralService])
], ReferralController);
//# sourceMappingURL=referral.controller.js.map