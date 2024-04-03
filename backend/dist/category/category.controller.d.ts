import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }>;
    remove(id: string): Promise<{
        category: {
            id: number;
            title: string;
            super_category_id: number;
        };
        products: import(".prisma/client").Prisma.BatchPayload;
    }>;
}
