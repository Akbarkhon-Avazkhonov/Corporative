import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): unknown;
    findAll(): unknown;
    findOne(id: number): unknown;
    update(id: number, updateCategoryDto: UpdateCategoryDto): unknown;
    remove(id: number): unknown;
}
