import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports:[NotificationsModule],
  controllers: [MatchesController],
  providers: [MatchesService, PrismaService, NotificationsGateway],
})
export class MatchesModule {}

