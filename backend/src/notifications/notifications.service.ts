import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationDto } from './dto/notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  // Send and save notification
  async sendNotification(notificationDto: NotificationDto) {
    const { userId, message } = notificationDto;

    // Save notification in the database
    const notification = await this.prisma.notification.create({
      data: { userId, message },
    });

    // Emit notification via WebSockets
    // this.notificationsGateway.sendNotification(userId, message);

    return notification;
  }

  // Get past notifications for a user
  async getNotificationsForUser(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId: Number(userId) },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' }, // Fetch latest notifications first
    });
  }
  async getAllNotificationsForUser() {
    return this.prisma.notification.findMany({
      // orderBy: { createdAt: 'desc' }, // Optional: Order by latest notifications
    });
  }

  // Mark a notification as read
  async markAsRead(notificationId: number) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }
}
