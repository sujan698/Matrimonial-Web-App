import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatGateway, PrismaService],
})
export class ChatModule {}
