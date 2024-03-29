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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guad_1 = require("./auth.guad");
const auth_product_dto_1 = require("./dto/auth-product.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(body) {
        return this.authService.createUser(body);
    }
    async sendPhoneCode(body) {
        return this.authService.sendPhoneCode(body.phone_number);
    }
    async verifyPhoneCode(body) {
        return this.authService.verifyPhoneCode(body.phone_number, body.code);
    }
    async login(body) {
        return this.authService.login(body.email, body.password);
    }
    async getProfile(headers, req) {
        return this.authService.getProfile(req.email.email);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                fullname: { type: 'string' },
                email: { type: 'string' },
                phone_number: { type: 'string' },
                password: { type: 'string' },
                gender: { type: 'string' },
                age: { type: 'number' },
                city: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        description: 'Email & Password login endpoint for authentication',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return JWT token',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Cannot authorize with given Email and Password',
    }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_product_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiBody)({
        description: 'Send Phone Code',
        schema: {
            type: 'object',
            properties: {
                phone_number: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)('send-phone-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendPhoneCode", null);
__decorate([
    (0, swagger_1.ApiBody)({
        description: 'Verify Phone Code',
        schema: {
            type: 'object',
            properties: {
                phone_number: { type: 'string' },
                code: { type: 'number' },
            },
        },
    }),
    (0, common_1.Post)('verify-phone-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPhoneCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'JWT token validation endpoint',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Cannot authorize with given Email and Password',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guad_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map