import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadSingleBase64(
    userId: number,
    base64Image: string,
    folder: string = 'default',
  ): Promise<{ image_url: string }> {
    try {
      console.log('Base64 Image:', base64Image);
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: folder,
        resource_type: 'image',
      });

      console.log('Cloudinary Upload Result:', result);

      return { image_url: result.secure_url };
    } catch (error) {
      throw new Error(
        `Failed to upload Base64 image to Cloudinary: ${error.message}`,
      );
    }
  }
}
