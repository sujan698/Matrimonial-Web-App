import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
  // assuming you are using PrismaService

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async getProvinces() {
    return this.prisma.province.findMany({
      include: {
        districts: true,  // Include districts to fetch all related districts
      },
    });
  }

  async getDistrictsByProvince(provinceId: string) {
    // Convert provinceId to integer
    const provinceIdInt = parseInt(provinceId, 10);
  
    if (isNaN(provinceIdInt)) {
      throw new Error("Invalid provinceId");
    }
  
    return this.prisma.district.findMany({
      where: {
        provinceId: provinceIdInt, // Use the integer value
      },
    });
  }
}



// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class ProvincesService {
//   constructor(private readonly prismaService: PrismaService) {}

//   async getAllProvinces() {
//     return this.prismaService.province.findMany({
//       include: {
//         districts: true,
//         demographicDetails: true,
//       },
//     });
//   }
//   async findOne(id: number) {
//     const province = await this.prismaService.province.findUnique({
//       where: { id },
//       include: {
//         demographicDetails: true,
//       },
//     });

//     if (!province) {
//       throw new NotFoundException(`Province with ID ${id} not found`);
//     }

//     return province;
//   }
// }
