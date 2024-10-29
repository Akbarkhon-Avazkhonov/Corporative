import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

import { promises as fsPromises } from 'fs';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    if (product) {
      await fetch(
        'https://flashcloud.uz/trade_test2/hs/arbdata/itemslist/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // basic auth
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.LOGIN_1C}:${process.env.PASSWORD_1C}`,
              ).toString('base64'),
          },
          body: JSON.stringify({
            id: product.id,
            title: 'Corporative' + product.title,
            price: product.price,
            new_price: 0,
          }),
        },
      );
    }
    return product;
  }

  async findAll() {
    return await this.prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findSome(take: number, skip: number) {
    return await this.prisma.product.findMany({
      take: take,
      skip: skip,
      orderBy: { id: 'desc' },
    });
  }

  async search(search: string) {
    return await this.prisma.product.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ where: { id: id } });
  }

  async findByCategory(category_id: number) {
    return await this.prisma.product.findMany({
      where: { category_id: category_id },
      orderBy: { id: 'desc' },
    });
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
    if (product) {
      await fetch(
        'https://flashcloud.uz/trade_test2/hs/arbdata/itemslist/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // basic auth
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.LOGIN_1C}:${process.env.PASSWORD_1C}`,
              ).toString('base64'),
          },
          body: JSON.stringify({
            id: product.id,
            title: 'Corporative' + product.title,
            price: product.price,
            new_price: product.price,
          }),
        },
      );
      await fetch(
        'https://flashcloud.uz/trade_test2/hs/arbdata/itemslist/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // basic auth
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.LOGIN_1C}:${process.env.PASSWORD_1C}`,
              ).toString('base64'),
          },
          body: JSON.stringify({
            id: product.id,
            title: 'Corporative' + product.title,
            price: product.price,
            new_price: 0,
          }),
        },
      );
    }
    return product;
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
