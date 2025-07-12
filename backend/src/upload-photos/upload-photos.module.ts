import { Module } from '@nestjs/common';
import { UploadPhotosService } from './upload-photos.service';
import { UploadPhotosController } from './upload-photos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [UploadPhotosController],
  providers: [UploadPhotosService,PrismaService,CloudinaryService],
})
export class UploadPhotosModule {}
