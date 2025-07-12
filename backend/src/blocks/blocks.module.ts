import { Module } from '@nestjs/common';
import { BlockService } from './blocks.service';
import { BlockController } from './blocks.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BlockController],
  providers: [BlockService,PrismaService],
})
export class BlocksModule {}
