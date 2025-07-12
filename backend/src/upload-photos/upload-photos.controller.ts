import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadPhotosService } from './upload-photos.service';
import { CreateUploadPhotoDto } from './dto/create-upload-photo.dto';
import { UpdateUploadPhotoDto } from './dto/update-upload-photo.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload-photos')
export class UploadPhotosController {
  constructor(
    private readonly uploadPhotosService: UploadPhotosService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadPhotos(@Body() createUploadPhotoDto: CreateUploadPhotoDto) {
    return this.uploadPhotosService.create(createUploadPhotoDto);
  }
  @Get()
  findAll() {
    return this.uploadPhotosService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadPhotosService.findOne(+id);
  }
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateUploadPhotoDto: UpdateUploadPhotoDto,
    @Body('userId') userId: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadSingleBase64(
        Number(userId),
        updateUploadPhotoDto.image_url,
      );
      updateUploadPhotoDto.image_url = uploadResult.image_url;
    }

    return this.uploadPhotosService.update(+id, updateUploadPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadPhotosService.remove(+id);
  }
}
