/// <reference types="multer" />
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    findAll(): Promise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }>;
    findByCategory(category_id: string): Promise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }>;
}
