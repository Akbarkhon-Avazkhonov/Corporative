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
exports.BidController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const bid_service_1 = require("./bid.service");
const create_bid_dto_1 = require("./dto/create-bid.dto");
const swagger_1 = require("@nestjs/swagger");
let BidController = class BidController {
    constructor(bidService) {
        this.bidService = bidService;
    }
    create(createBidDto) {
        return this.bidService.create(createBidDto);
    }
    findAll() {
        return this.bidService.findAll();
    }
    findSome(take, skip) {
        return this.bidService.findSome(take, skip);
    }
    remove(id) {
        return this.bidService.remove(+id);
    }
};
exports.BidController = BidController;
__decorate([
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                surname: { type: 'string' },
                phone: { type: 'string' },
                message: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bid_dto_1.CreateBidDto]),
    __metadata("design:returntype", void 0)
], BidController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BidController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('some/:take/:skip'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('take')),
    __param(1, (0, common_1.Param)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BidController.prototype, "findSome", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BidController.prototype, "remove", null);
exports.BidController = BidController = __decorate([
    (0, swagger_1.ApiTags)('Bid'),
    (0, common_1.Controller)('bid'),
    __metadata("design:paramtypes", [bid_service_1.BidService])
], BidController);
//# sourceMappingURL=bid.controller.js.map