import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUploadPhotoDto } from './dto/create-upload-photo.dto';
import { UpdateUploadPhotoDto } from './dto/update-upload-photo.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UploadPhotosService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUploadPhotoDto: CreateUploadPhotoDto) {
    const { userId, image_url } = createUploadPhotoDto;

    console.log('Received userId:', userId);
    console.log('Received image_url:', image_url);

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const uploadResult = await this.cloudinaryService.uploadSingleBase64(
      userId,
      image_url,
    );

    console.log('Cloudinary Upload Result:', uploadResult); // Debugging

    const uploadPhotoRecord = await this.prismaService.uploadPhoto.create({
      data: {
        userId,
        image_url: uploadResult.image_url,
      },
    });

    console.log('Upload Photo Record:', uploadPhotoRecord); // Debugging

    return uploadPhotoRecord;
  }

  findAll() {
    return this.prismaService.uploadPhoto.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number) {
    const uploadPhoto = await this.prismaService.uploadPhoto.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!uploadPhoto) {
      throw new NotFoundException(`UploadPhoto with ID ${id} not found`);
    }

    return uploadPhoto;
  }

  async update(id: number, updateUploadPhotoDto: UpdateUploadPhotoDto) {
    const uploadPhoto = await this.prismaService.uploadPhoto.findUnique({
      where: { id },
    });

    if (!uploadPhoto) {
      throw new NotFoundException(`UploadPhoto with ID ${id} not found`);
    }

    return this.prismaService.uploadPhoto.update({
      where: { id },
      data: updateUploadPhotoDto,
    });
  }

  async remove(id: number) {
    const uploadPhoto = await this.prismaService.uploadPhoto.findUnique({
      where: { id },
    });

    if (!uploadPhoto) {
      throw new NotFoundException(`UploadPhoto with ID ${id} not found`);
    }

    await this.prismaService.uploadPhoto.delete({ where: { id } });
    return { message: `UploadPhoto with ID ${id} has been deleted` };
  }
}
