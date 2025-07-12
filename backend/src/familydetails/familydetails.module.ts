import { Module } from '@nestjs/common';
import { FamilyDetailsService } from './familydetails.service';
import { FamilydetailsController } from './familydetails.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FamilydetailsController],
  providers: [FamilyDetailsService,PrismaService],
})
export class FamilydetailsModule {}
