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
exports.GuidesController = void 0;
const common_1 = require("@nestjs/common");
const guides_service_1 = require("./guides.service");
const create_guide_dto_1 = require("./dto/create-guide.dto");
const update_guide_dto_1 = require("./dto/update-guide.dto");
const swagger_1 = require("@nestjs/swagger");
const admin_guad_1 = require("../admin/admin.guad");
let GuidesController = class GuidesController {
    constructor(guidesService) {
        this.guidesService = guidesService;
    }
    create(createGuideDto) {
        return this.guidesService.create(createGuideDto);
    }
    findAll() {
        return this.guidesService.findAll();
    }
    findOne(id) {
        return this.guidesService.findOne(+id);
    }
    update(id, updateGuideDto) {
        return this.guidesService.update(+id, updateGuideDto);
    }
    remove(id) {
        return this.guidesService.remove(+id);
    }
};
exports.GuidesController = GuidesController;
__decorate([
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                subtitle: { type: 'string' },
                description: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guide_dto_1.CreateGuideDto]),
    __metadata("design:returntype", void 0)
], GuidesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GuidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuidesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                subtitle: { type: 'string' },
                description: { type: 'string' },
            },
        },
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_guide_dto_1.UpdateGuideDto]),
    __metadata("design:returntype", void 0)
], GuidesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guad_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuidesController.prototype, "remove", null);
exports.GuidesController = GuidesController = __decorate([
    (0, swagger_1.ApiTags)('Guides'),
    (0, common_1.Controller)('guides'),
    __metadata("design:paramtypes", [guides_service_1.GuidesService])
], GuidesController);
//# sourceMappingURL=guides.controller.js.map