import { Module } from '@nestjs/common';
import { DemographicDetailsService } from './demographic-details.service';
import { DemographicDetailsController } from './demographic-details.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DemographicDetailsController],
  providers: [DemographicDetailsService,PrismaService],
})
export class DemographicDetailsModule {}
