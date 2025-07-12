import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Ethnicity,FamilyValue,FamilyClass,Religion } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FamilyDetailsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: {
    userId: number;
    ethnicity: Ethnicity;
    familyValues: FamilyValue;
    familyClass: FamilyClass;
    religion: Religion;
    gotra: string;
  }) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: data.userId },
      });

      if (!user) {
        throw new BadRequestException('User does not exist.');
      }

      return await this.prismaService.familyDetails.create({
        data: {
          userId: data.userId,
          ethnicity: data.ethnicity,
          familyValues: data.familyValues,
          familyClass: data.familyClass,
          religion: data.religion,
          gotra: data.gotra,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create family details.');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.familyDetails.findMany({
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to retrieve family details.');
    }
  }

  async findOne(id: number) {
    try {
      const familyDetails = await this.prismaService.familyDetails.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });

      if (!familyDetails) {
        throw new NotFoundException(`Family details with ID ${id} do not exist.`);
      }

      return familyDetails;
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to retrieve family details with ID ${id}.`);
    }
  }

  async update(
    id: number,
    data: {
      ethnicity?: Ethnicity;
      familyValues?: FamilyValue;
      familyClass?: FamilyClass;
      religion?: Religion;
      gotra?: string;
    },
  ) {
    try {
      const familyDetails = await this.prismaService.familyDetails.findUnique({
        where: { id },
      });

      if (!familyDetails) {
        throw new NotFoundException(`Family details with ID ${id} do not exist.`);
      }

      return await this.prismaService.familyDetails.update({
        where: { id },
        data: {
          ethnicity: data.ethnicity, 
          familyValues: data.familyValues,
          familyClass: data.familyClass,
          religion: data.religion,
          gotra: data.gotra,
        },
      });

      // return await this.prismaService.familyDetails.update({
      //   where: { id },
      //   data: {
      //     ethnicity: { set: data.ethnicity },
      //     familyValues: { set: data.familyValues },
      //     familyClass: { set: data.familyClass },
      //     religion: { set: data.religion },
      //     gotra: { set: data.gotra },
      //   },
      // });
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to update family details with ID ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      const familyDetails = await this.prismaService.familyDetails.findUnique({
        where: { id },
      });

      if (!familyDetails) {
        throw new NotFoundException(`Family details with ID ${id} do not exist.`);
      }

      return await this.prismaService.familyDetails.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to delete family details with ID ${id}.`);
    }
  }
}
