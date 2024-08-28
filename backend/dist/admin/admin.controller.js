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
exports.AdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_guad_1 = require("./admin.guad");
const swagger_1 = require("@nestjs/swagger");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    login(body) {
        return this.adminService.login(body.name, body.password);
    }
    getReferralCount() {
        return this.adminService.getReferralCount();
    }
    getBalance() {
        return this.adminService.getBalance();
    }
    getTopReferrals() {
        return this.adminService.getTopReferrals();
    }
    getUsers(page) {
        return this.adminService.getUsers(page);
    }
    getProducts(page) {
        return this.adminService.getProducts(page);
    }
    getNewUsers() {
        return this.adminService.getNewUsers();
    }
    getEcoinRate() {
        return this.adminService.getRate();
    }
    changeEcoinRate(body) {
        return this.adminService.changeRate(body.rate);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, swagger_1.ApiBody)({
        description: 'Login with admin name and password',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                password: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)('/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get referral links count (just number)',
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/referral/count'),
    openapi.ApiResponse({ status: 200, type: Number }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getReferralCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get all balance (just number)',
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/balance'),
    openapi.ApiResponse({ status: 200, type: Number }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getBalance", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get top 10 users with the highest balance',
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/top-referrals'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getTopReferrals", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get all users with pagination',
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/users/:page'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get all products with pagination',
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/products/:page'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get new users by date',
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/new-users'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getNewUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get e-coin rate',
    }),
    (0, common_1.Get)('/rate'),
    openapi.ApiResponse({ status: 200, type: Number }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getEcoinRate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Change e-coin rate',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Change e-coin rate',
        schema: {
            type: 'object',
            properties: {
                rate: { type: 'number' },
            },
        },
    }),
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/rate'),
    openapi.ApiResponse({ status: 201, type: Number }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeEcoinRate", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map