import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

import { promises as fsPromises } from 'fs';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ where: { id: id } });
  }

  async findByCategory(category_id: number) {
    return await this.prisma.product.findMany({
      where: { category_id: category_id },
    });
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({ where: { id: id } });
  }
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDir = 'uploads'; // Directory where you want to save the uploaded files
      const filename = `${Date.now()}-${file.originalname}`; // Constructing a unique filename
      const filePath = uploadDir + `/` + filename; // Constructing the file path

      // Saving the file to the local path
      await fsPromises.writeFile(filePath, file.buffer);

      // Returning the file path or any other relevant information
      const fileUrl = `${process.env.BACKEND_URL}/${filePath}`;
      return fileUrl;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
