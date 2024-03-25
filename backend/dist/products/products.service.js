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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const fs_1 = require("fs");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        return await this.prisma.product.create({ data: createProductDto });
    }
    async findAll() {
        return await this.prisma.product.findMany();
    }
    async findOne(id) {
        return await this.prisma.product.findUnique({ where: { id: id } });
    }
    async findByCategory(category_id) {
        return await this.prisma.product.findMany({
            where: { category_id: category_id },
        });
    }
    async update(id, updateProductDto) {
        return await this.prisma.product.update({
            where: { id: id },
            data: updateProductDto,
        });
    }
    async remove(id) {
        return await this.prisma.product.delete({ where: { id: id } });
    }
    async uploadFile(file) {
        try {
            const uploadDir = 'uploads';
            const filename = `${Date.now()}-${file.originalname}`;
            const filePath = uploadDir + `/` + filename;
            await fs_1.promises.writeFile(filePath, file.buffer);
            const fileUrl = `http://localhost:3002/${filePath}`;
            return fileUrl;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map