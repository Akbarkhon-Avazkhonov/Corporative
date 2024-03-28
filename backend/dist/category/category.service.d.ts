import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        super_category_id: number;
    }>;
}
