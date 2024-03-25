"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const super_category_service_1 = require("./super-category.service");
const super_category_controller_1 = require("./super-category.controller");
const prisma_service_1 = require("../prisma.service");
let SuperCategoryModule = class SuperCategoryModule {
};
exports.SuperCategoryModule = SuperCategoryModule;
exports.SuperCategoryModule = SuperCategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [super_category_controller_1.SuperCategoryController],
        providers: [super_category_service_1.SuperCategoryService, prisma_service_1.PrismaService],
    })
], SuperCategoryModule);
//# sourceMappingURL=super-category.module.js.map