import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports:[NotificationsModule],
  controllers: [LikesController],
  providers: [LikesService, PrismaService, NotificationsGateway],
})
export class LikesModule {}
