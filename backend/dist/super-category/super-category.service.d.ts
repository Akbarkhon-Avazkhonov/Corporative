import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class SuperCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSuperCategoryDto: CreateSuperCategoryDto): Promise<{
        id: number;
        title: string;
    }>;
    findAll(): Promise<{
        superCategories: {
            categories: {
                products: {
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
                }[];
                id: number;
                title: string;
                super_category_id: number;
            }[];
            id: number;
            title: string;
        }[];
    }>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__SuperCategoryClient<{
        id: number;
        title: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateSuperCategoryDto: UpdateSuperCategoryDto): Promise<{
        id: number;
        title: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
    }>;
}
