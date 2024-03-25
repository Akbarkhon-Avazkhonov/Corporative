import { PartialType } from '@nestjs/swagger';
import { CreateSuperCategoryDto } from './create-super-category.dto';

export class UpdateSuperCategoryDto extends PartialType(CreateSuperCategoryDto) {}
