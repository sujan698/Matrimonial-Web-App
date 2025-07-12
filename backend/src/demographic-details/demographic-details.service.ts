import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDemographicDetailsDto } from './dto/create-demographic-detail.dto';
import { UpdateDemographicDetailsDto } from './dto/update-demographic-detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DemographicDetailsService {
  constructor(private prismaService: PrismaService) {}

  async create(createDemographicDetailsDto: CreateDemographicDetailsDto) {
    // Check if the related user exists
    const user = await this.prismaService.user.findUnique({
      where: { id: createDemographicDetailsDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createDemographicDetailsDto.userId} does not exist`,
      );
    }

    // Create demographic details
    return this.prismaService.demographicDetails.create({
      data: {
        maritalStatus: createDemographicDetailsDto.maritalStatus,
        residentialStatus: createDemographicDetailsDto.residentialStatus,
        educationLevel: createDemographicDetailsDto.educationLevel,
        employmentStatus: createDemographicDetailsDto.employmentStatus,
        dietPreference: createDemographicDetailsDto.dietPreference,
        height: createDemographicDetailsDto.height,
        incomeRange: createDemographicDetailsDto.incomeRange,
        motherTongue: createDemographicDetailsDto.motherTongue,
        user: {
          connect: { id: createDemographicDetailsDto.userId },
        },
        province: {
          connect: { id: createDemographicDetailsDto.provinceId },
        },
        district: {
          connect: { id: createDemographicDetailsDto.districtId },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.demographicDetails.findMany({
      include: { user: true, province: true, district: true },
    });
  }

  async findOne(id: number) {
    const demographicDetails =
      await this.prismaService.demographicDetails.findUnique({
        where: { id },
        include: { user: true, province: true, district: true },
      });

    if (!demographicDetails) {
      throw new NotFoundException(
        `DemographicDetails with ID ${id} does not exist`,
      );
    }

    return demographicDetails;
  }

  async update(
    id: number,
    updateDemographicDetailsDto: UpdateDemographicDetailsDto,
  ) {
    const existingDetails =
      await this.prismaService.demographicDetails.findUnique({
        where: { id },
      });

    if (!existingDetails) {
      throw new NotFoundException(
        `DemographicDetails with ID ${id} does not exist`,
      );
    }

    // Ensure user relationship integrity
    const updateData: any = { ...updateDemographicDetailsDto };

    if (updateDemographicDetailsDto.userId) {
      const user = await this.prismaService.user.findUnique({
        where: { id: updateDemographicDetailsDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateDemographicDetailsDto.userId} does not exist`,
        );
      }

      updateData.user = { connect: { id: updateDemographicDetailsDto.userId } };
      delete updateData.userId;
    }

    if (updateDemographicDetailsDto.districtId) {
      updateData.district = {
        connect: { id: updateDemographicDetailsDto.districtId },
      };
      delete updateData.districtId;
    }

    if (updateDemographicDetailsDto.provinceId) {
      updateData.province = {
        connect: { id: updateDemographicDetailsDto.provinceId },
      };
      delete updateData.provinceId;
    }

    return this.prismaService.demographicDetails.update({
      where: { id },
      data: updateData,
    });
  }

  // async update(
  //   id: number,
  //   updateDemographicDetailsDto: UpdateDemographicDetailsDto,
  // ) {
  //   const existingDetails =
  //     await this.prismaService.demographicDetails.findUnique({
  //       where: { id },
  //     });

  //   if (!existingDetails) {
  //     throw new NotFoundException(
  //       `DemographicDetails with ID ${id} does not exist`,
  //     );
  //   }

  //   // Ensure user relationship integrity
  //   if (updateDemographicDetailsDto.userId) {
  //     const user = await this.prismaService.user.findUnique({
  //       where: { id: updateDemographicDetailsDto.userId },
  //     });

  //     if (!user) {
  //       throw new NotFoundException(
  //         `User with ID ${updateDemographicDetailsDto.userId} does not exist`,
  //       );
  //     }
  //   }

  //   // Update demographic details
  //   return this.prismaService.demographicDetails.update({
  //     where: { id },
  //     data: {
  //       userId: updateDemographicDetailsDto.userId,
  //       maritalStatus: updateDemographicDetailsDto.maritalStatus,
  //       residentialStatus: updateDemographicDetailsDto.residentialStatus,
  //       districtId: updateDemographicDetailsDto.districtId,
  //       provinceId: updateDemographicDetailsDto.provinceId,
  //       educationLevel: updateDemographicDetailsDto.educationLevel,
  //       employmentStatus: updateDemographicDetailsDto.employmentStatus,
  //       dietPreference: updateDemographicDetailsDto.dietPreference,
  //       height: updateDemographicDetailsDto.height,
  //       incomeRange: updateDemographicDetailsDto.incomeRange,
  //       motherTongue: updateDemographicDetailsDto.motherTongue,
  //     },
  //   });
  // }

  async remove(id: number) {
    const demographicDetails =
      await this.prismaService.demographicDetails.findUnique({
        where: { id },
      });

    if (!demographicDetails) {
      throw new NotFoundException(
        `DemographicDetails with ID ${id} does not exist`,
      );
    }

    return this.prismaService.demographicDetails.delete({ where: { id } });
  }
}
