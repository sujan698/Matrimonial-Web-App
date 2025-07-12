import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistrictsService {
  constructor(private readonly prismaService: PrismaService) {}

  // Get all districts
  async getAllDistricts() {
    return this.prismaService.district.findMany();
  }

  // Find a district by ID
  async findOne(id: number) {
    const district = await this.prismaService.district.findUnique({
      where: { id },
    });

    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }

    return district;
  }

  // Get districts by province ID
  async getDistrictsByProvince(provinceId: number) {
    return this.prismaService.district.findMany({
      where: { provinceId },  // Filter districts by provinceId
    });
  }
}



// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class DistrictsService {
//   constructor(private readonly prismaService: PrismaService) {}

//   async getAllDistricts() {
//     return this.prismaService.district.findMany({
//       include: {
//         province: true,
//         demographicDetails: true,
//       },
//     });
//   }
//   async findOne(id: number) {
//     const district = await this.prismaService.district.findUnique({
//       where: { id },
//       include: {
//         province: true,
//         demographicDetails: true,
//       },
//     });

//     if (!district) {
//       throw new NotFoundException(`District with ID ${id} not found`);
//     }

//     return district;
//   }
// }
