import { Module } from '@nestjs/common';
import { PartnerPreferencesService } from './partner-preferences.service';
import { PartnerPreferencesController } from './partner-preferences.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PartnerPreferencesController],
  providers: [PartnerPreferencesService,PrismaService],
})
export class PartnerPreferencesModule {}
