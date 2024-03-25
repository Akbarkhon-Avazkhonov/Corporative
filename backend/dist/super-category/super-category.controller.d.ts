import { SuperCategoryService } from './super-category.service';
import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
export declare class SuperCategoryController {
    private readonly superCategoryService;
    constructor(superCategoryService: SuperCategoryService);
    create(createSuperCategoryDto: CreateSuperCategoryDto): Promise<any>;
    findAll(): Promise<{
        superCategories: any;
    }>;
    findOne(id: string): any;
    update(id: string, updateSuperCategoryDto: UpdateSuperCategoryDto): Promise<any>;
    remove(id: string): Promise<any>;
}
