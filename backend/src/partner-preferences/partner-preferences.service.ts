import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerPreferenceDto } from './dto/create-partner-preference.dto';
import { UpdatePartnerPreferenceDto } from './dto/update-partner-preference.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnerPreferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerPreferenceDto: CreatePartnerPreferenceDto) {
    const {
      userId,
      maritalStatus,
      ageRange,
      dietPreference,
      religion,
      familyValues,
      ethnicity,
      familyClass,
      residentialStatus,
      employmentStatus,
      educationLevel,
    } = createPartnerPreferenceDto;

    const partnerPreference = await this.prisma.partnerPreference.create({
      data: {
        user:{
          connect: {id: userId}
        },
        maritalStatus,
        ageRange,
        dietPreference,
        religion,
        familyValues,
        ethnicity,
        familyClass,
        residentialStatus,
        employmentStatus,
        educationLevel,
      },
      include: {
        user: true, // Include the related user details
      },
    });

    return partnerPreference;
  }

  async findAll() {
    return await this.prisma.partnerPreference.findMany({
      include: {
        user: true, // Include the related user details
      },
    });
  }

  async findOne(id: number) {
    const partnerPreference = await this.prisma.partnerPreference.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!partnerPreference) {
      throw new NotFoundException(`PartnerPreference with ID ${id} not found`);
    }

    return partnerPreference;
  }

  async update(id: number, updatePartnerPreferenceDto: UpdatePartnerPreferenceDto) {
    const {
      maritalStatus,
      ageRange,
      dietPreference,
      religion,
      familyValues,
      ethnicity,
      familyClass,
      residentialStatus,
      employmentStatus,
      educationLevel,
    } = updatePartnerPreferenceDto;

    const existingPreference = await this.prisma.partnerPreference.findUnique({ where: { id } });

    if (!existingPreference) {
      throw new NotFoundException(`PartnerPreference with ID ${id} not found`);
    }

    return await this.prisma.partnerPreference.update({
      where: { id },
      data: {
        maritalStatus,
        ageRange,
        dietPreference,
        religion,
        familyValues,
        ethnicity,
        familyClass,
        residentialStatus,
        employmentStatus,
        educationLevel,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    const existingPreference = await this.prisma.partnerPreference.findUnique({ where: { id } });

    if (!existingPreference) {
      throw new NotFoundException(`PartnerPreference with ID ${id} not found`);
    }

    return await this.prisma.partnerPreference.delete({ where: { id } });
  }
}
