import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class SuperCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSuperCategoryDto: CreateSuperCategoryDto): Promise<any>;
    findAll(): Promise<{
        superCategories: any;
    }>;
    findOne(id: number): any;
    update(id: number, updateSuperCategoryDto: UpdateSuperCategoryDto): Promise<any>;
    remove(id: number): Promise<any>;
}
