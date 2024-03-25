import { Injectable } from '@nestjs/common';
import { CreateSuperCategoryDto } from './dto/create-super-category.dto';
import { UpdateSuperCategoryDto } from './dto/update-super-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SuperCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSuperCategoryDto: CreateSuperCategoryDto) {
    return await this.prisma.superCategory.create({
      data: createSuperCategoryDto,
    });
  }

  async findAll() {
    const superCategories = await this.prisma.superCategory.findMany();
    const categories = await this.prisma.category.findMany();
    const products = await this.prisma.product.findMany();

    const data = superCategories.map((superCategory) => {
      const category = categories.filter(
        (category) => category.super_category_id === superCategory.id,
      );
      const categoryData = category.map((category) => {
        const product = products.filter(
          (product) => product.category_id === category.id,
        );
        return {
          ...category,
          products: product,
        };
      });
      return {
        ...superCategory,
        categories: categoryData,
      };
    });

    return {
      superCategories: data,
    };
  }

  findOne(id: number) {
    return this.prisma.superCategory.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateSuperCategoryDto: UpdateSuperCategoryDto) {
    return await this.prisma.superCategory.update({
      where: {
        id: id,
      },
      data: updateSuperCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.superCategory.delete({
      where: {
        id: id,
      },
    });
  }
}
