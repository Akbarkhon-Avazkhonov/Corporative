import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any>;
    remove(id: string): Promise<any>;
}
