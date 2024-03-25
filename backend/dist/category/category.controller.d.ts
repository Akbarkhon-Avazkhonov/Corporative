import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): unknown;
    findAll(): unknown;
    findOne(id: string): unknown;
    update(id: string, updateCategoryDto: UpdateCategoryDto): unknown;
    remove(id: string): unknown;
}
