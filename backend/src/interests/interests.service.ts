import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Interests } from '@prisma/client';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Injectable()
export class InterestsService {
  constructor(private readonly prismaService: PrismaService) {}


  async createMany(createInterestDto: CreateInterestDto) {
    const { userId, interests } = createInterestDto;

    if (!interests || interests.length === 0) {
      throw new BadRequestException('No interests provided for creation');
    }


    const data = interests.map((interest) => ({
      interest: interest as Interests,
      userId,
    }));

    // Log the data for debugging
    console.log('Data to be inserted:', data);

    // Use createMany to insert all records at once
    return this.prismaService.interest.createMany({
      data,
      skipDuplicates: true, 
    });
  }

  
  findAll() {
    return this.prismaService.interest.findMany();
  }

  
  async findOne(id: number) {
    const interest = await this.prismaService.interest.findUnique({
      where: { id },
    });

    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return interest;
  }

 
  async update(id: number, updateInterestDto: UpdateInterestDto) {
    const existingInterest = await this.prismaService.interest.findUnique({
      where: { id },
    });

    if (!existingInterest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return this.prismaService.interest.update({
      where: { id },
      data: { interest: updateInterestDto.interest as Interests }, // Ensure the interest is of type Interests
    });
  }


  async remove(id: number) {
    const existingInterest = await this.prismaService.interest.findUnique({
      where: { id },
    });

    if (!existingInterest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return this.prismaService.interest.delete({
      where: { id },
    });
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateInterestDto } from './dto/create-interest.dto';
// import { UpdateInterestDto } from './dto/update-interest.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class InterestsService {
//   constructor(private readonly prismaService: PrismaService) {}
//   async createMany(interests:string[]) {
//     return this.prismaService.interest.createMany({
//       data: interests.map((interest)=>{interest})
//     });
//   }

//   findAll() {
//     return this.prismaService.interest.findMany();
//   }

//   async findOne(id: number) {
//     const interest= await this.prismaService.interest.findUnique({
//       where: {
//         id
//       },
//     });
//     if (!interest) {
//       throw new NotFoundException(`Interest with id ${id} not found`);
//     }
//     return interest;
//   }

//   async update(id: number, updateInterestDto: UpdateInterestDto) {
//    const interest= await this.prismaService.interest.findUnique({
//     where:{id},
//    });
//    if(!interest){
//     throw new NotFoundException(`Interest with id ${id} not found`);
//    }
//    return this.prismaService.interest.update({
//     where:{id},
//     data:{
//       interest: updateInterestDto.interest,
//     },
//    });
//   }

//   async remove(id: number) {
//     const interest= await this.prismaService.interest.findUnique({
//       where:{id},
//     });
//     if(!interest){
//       throw new NotFoundException(`Interest with id ${id} not found`)
//     }
//     return this.prismaService.interest.delete({
//       where: {id},
//     });
//   }
// }
