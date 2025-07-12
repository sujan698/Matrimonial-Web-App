import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ProvinceService } from './provinces.service';
import { ProvinceController } from './provinces.controller';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService,PrismaService],
})
export class ProvincesModule {}
