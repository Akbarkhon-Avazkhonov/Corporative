import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { promises as fsPromises } from 'fs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, images: any, info: any) {
    const fileUrls: string[] = [];

    const uloadedPromises = images.map(async (file: any) => {
      const uploadDir = 'uploads'; // Directory where you want to save the uploaded files
      const filename = `${Date.now()}-${file.originalname}`; // Constructing a unique filename
      const filePath = uploadDir + `/` + filename; // Constructing the file path

      // Saving the file to the local path
      await fsPromises.writeFile(filePath, file.buffer);

      // Returning the file path or any other relevant information
      const fileUrl = `${process.env.BACKEND_URL}/${filePath}`;
      fileUrls.push(fileUrl);
    });
    await Promise.all(uloadedPromises);

    return await this.prisma.profile.upsert({
      where: { user_id: user_id },
      create: {
        user_id: user_id,
        images: fileUrls,
        info: info,
      },
      update: {
        images: fileUrls,
        info: info,
      },
    });
    // Create a profile with the fileUrls and info
  }

  async findAll() {
    return await this.prisma.profile.findMany({
      orderBy: { id: 'desc' },
      include: {
        user: {
          include: {
            _count: {
              select: { Links: true },
            },
          },
        },
      },
    });
  }

  async search(query: string) {
    return await this.prisma.profile.findMany({
      where: {
        OR: [
          {
            user: {
              fullname: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              phone_number: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: { user: true },
    });
  }

  async findSome(take: number, skip: number) {
    return await this.prisma.profile.findMany({
      take,
      skip,
      orderBy: { id: 'desc' },
      include: {
        user: {
          include: {
            _count: {
              select: { Links: true },
            },
          },
        },
      },
    });
  }

  async findOne(user_id: number) {
    return await this.prisma.profile.findUnique({
      where: { user_id: user_id },
      include: { user: true },
    });
  }

  async update(id: number, isVerified: any) {
    if (isVerified == 'true') {
      isVerified = true;
    }
    if (isVerified == 'false') {
      isVerified = false;
    }
    return await this.prisma.user.update({
      where: { id: id },
      data: { isVerified: Boolean(isVerified) },
    });
  }

  async remove(id: number) {
    return await this.prisma.profile.delete({ where: { id: id } });
  }
}
