import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuperCategoryService } from './super-category.service';
import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('SuperCategory')
@Controller('super-category')
export class SuperCategoryController {
  constructor(private readonly superCategoryService: SuperCategoryService) {}

  @ApiBody({
    description: 'Create Super Category',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() createSuperCategoryDto: CreateSuperCategoryDto) {
    return this.superCategoryService.create(createSuperCategoryDto);
  }

  @Get()
  findAll() {
    return this.superCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuperCategoryDto: UpdateSuperCategoryDto) {
    return this.superCategoryService.update(+id, updateSuperCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superCategoryService.remove(+id);
  }
}
