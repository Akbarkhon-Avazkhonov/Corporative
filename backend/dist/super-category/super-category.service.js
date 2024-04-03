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
exports.SuperCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let SuperCategoryService = class SuperCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSuperCategoryDto) {
        return await this.prisma.superCategory.create({
            data: createSuperCategoryDto,
        });
    }
    async findAll() {
        const superCategories = await this.prisma.superCategory.findMany();
        const categories = await this.prisma.category.findMany();
        const products = await this.prisma.product.findMany();
        const data = superCategories.map((superCategory) => {
            const category = categories.filter((category) => category.super_category_id === superCategory.id);
            const categoryData = category.map((category) => {
                const product = products.filter((product) => product.category_id === category.id);
                return {
                    ...category,
                    products: product,
                };
            });
            return {
                ...superCategory,
                categories: categoryData,
            };
        });
        return {
            superCategories: data,
        };
    }
    findOne(id) {
        return this.prisma.superCategory.findUnique({
            where: {
                id: id,
            },
        });
    }
    async update(id, updateSuperCategoryDto) {
        return await this.prisma.superCategory.update({
            where: {
                id: id,
            },
            data: updateSuperCategoryDto,
        });
    }
    async remove(id) {
        const categories_id = await this.prisma.category.findMany({
            where: {
                super_category_id: id,
            },
            select: {
                id: true,
            },
        });
        const categoriesId = categories_id.map((category) => category.id);
        const superCategory = await this.prisma.superCategory.delete({
            where: {
                id: id,
            },
        });
        const categories = await this.prisma.category.deleteMany({
            where: {
                id: {
                    in: categoriesId,
                },
            },
        });
        const products = await this.prisma.product.deleteMany({
            where: {
                category_id: {
                    in: categoriesId,
                },
            },
        });
        return {
            superCategory,
            categories,
            products,
        };
    }
};
exports.SuperCategoryService = SuperCategoryService;
exports.SuperCategoryService = SuperCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuperCategoryService);
//# sourceMappingURL=super-category.service.js.map