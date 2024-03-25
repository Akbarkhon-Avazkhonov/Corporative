/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    findByCategory(category_id: number): Promise<any>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<any>;
    remove(id: number): Promise<any>;
    uploadFile(file: Express.Multer.File): Promise<string>;
}
