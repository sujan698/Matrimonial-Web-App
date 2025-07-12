import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CloudinaryService, CloudinaryProvider,PrismaService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}