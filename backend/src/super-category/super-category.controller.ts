import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperCategoryService } from './super-category.service';
import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guad';

@ApiTags('SuperCategory')
@Controller('super-category')
export class SuperCategoryController {
  constructor(private readonly superCategoryService: SuperCategoryService) {}

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
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

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuperCategoryDto: UpdateSuperCategoryDto,
  ) {
    return this.superCategoryService.update(+id, updateSuperCategoryDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superCategoryService.remove(+id);
  }
}
