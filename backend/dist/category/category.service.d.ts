import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<any>;
    remove(id: number): Promise<any>;
}
