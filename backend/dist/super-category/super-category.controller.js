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
exports.SuperCategoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const super_category_service_1 = require("./super-category.service");
const create_super_category_dto_1 = require("./dto/create-super-category.dto");
const update_super_category_dto_1 = require("./dto/update-super-category.dto");
const swagger_1 = require("@nestjs/swagger");
const admin_guad_1 = require("../admin/admin.guad");
let SuperCategoryController = class SuperCategoryController {
    constructor(superCategoryService) {
        this.superCategoryService = superCategoryService;
    }
    create(createSuperCategoryDto) {
        return this.superCategoryService.create(createSuperCategoryDto);
    }
    findAll() {
        return this.superCategoryService.findAll();
    }
    findOne(id) {
        return this.superCategoryService.findOne(+id);
    }
    update(id, updateSuperCategoryDto) {
        return this.superCategoryService.update(+id, updateSuperCategoryDto);
    }
    remove(id) {
        return this.superCategoryService.remove(+id);
    }
};
exports.SuperCategoryController = SuperCategoryController;
__decorate([
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'Create Super Category',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_super_category_dto_1.CreateSuperCategoryDto]),
    __metadata("design:returntype", void 0)
], SuperCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_super_category_dto_1.UpdateSuperCategoryDto]),
    __metadata("design:returntype", void 0)
], SuperCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperCategoryController.prototype, "remove", null);
exports.SuperCategoryController = SuperCategoryController = __decorate([
    (0, swagger_1.ApiTags)('SuperCategory'),
    (0, common_1.Controller)('super-category'),
    __metadata("design:paramtypes", [super_category_service_1.SuperCategoryService])
], SuperCategoryController);
//# sourceMappingURL=super-category.controller.js.map