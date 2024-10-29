import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiDefaultResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/admin/admin.guad';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiBody({
    description: 'Create Product',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        compound: { type: 'string' },
        category_id: { type: 'number' },
        action: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        count: { type: 'number' },
        testimony: { type: 'string' },
        contraction: { type: 'string' },
        color: { type: 'number' },
        image: { type: 'object' },
        extra: { type: 'object' },
      },
    },
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.productsService.uploadFile(file);
  }

  @ApiDefaultResponse({
    description: 'Find All Products',
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('some/:take/:skip')
  findSome(@Param('take') take: number, @Param('skip') skip: number) {
    return this.productsService.findSome(take, skip);
  }

  @Get('search/:search')
  search(@Param('search') search: string) {
    return this.productsService.search(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('category/:category_id')
  findByCategory(@Param('category_id') category_id: string) {
    return this.productsService.findByCategory(+category_id);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
