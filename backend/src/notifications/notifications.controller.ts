import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getNotifications(@Param('userId') userId: number) {
    return this.notificationsService.getNotificationsForUser(userId);
  }
  @Get('')
  @UseGuards(AuthGuard)
  async getAllNotifications(@Param('userId') userId: number) {
    return this.notificationsService.getAllNotificationsForUser();
  }
}
