import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    const categories: any = await this.prisma.category.findMany();

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await this.prisma.product.count({
          where: { category_id: category.id },
        });
        return { ...category, count }; // Add the count to each category
      }),
    );

    return categoriesWithCount;
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({ where: { id: id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id: id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({ where: { id: id } });
    const products = await this.prisma.product.deleteMany({
      where: { category_id: id },
    });
    return { category, products };
  }
}
