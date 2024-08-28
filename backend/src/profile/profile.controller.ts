import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guad';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        info: { type: 'object' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Request() req: any,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    return this.profileService.create(req.user_id, files, body.info);
  }

  @Get('all')
  findAll() {
    return this.profileService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch('one/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.profileService.update(+id, body.isVerified);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
