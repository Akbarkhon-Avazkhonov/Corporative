import { SuperCategoryService } from './super-category.service';
import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
export declare class SuperCategoryController {
    private readonly superCategoryService;
    constructor(superCategoryService: SuperCategoryService);
    create(createSuperCategoryDto: CreateSuperCategoryDto): unknown;
    findAll(): unknown;
    findOne(id: string): any;
    update(id: string, updateSuperCategoryDto: UpdateSuperCategoryDto): unknown;
    remove(id: string): unknown;
}
