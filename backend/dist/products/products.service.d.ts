/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    findByCategory(category_id: number): Promise<{
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
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
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
    remove(id: number): Promise<{
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
}
