/// <reference types="multer" />
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): unknown;
    uploadFile(file: Express.Multer.File): Promise<string>;
    findAll(): unknown;
    findOne(id: string): unknown;
    findByCategory(category_id: string): unknown;
    update(id: string, updateProductDto: UpdateProductDto): unknown;
    remove(id: string): unknown;
}
