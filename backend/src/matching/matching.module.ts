import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService, PrismaService],
})
export class MatchingModule {}
