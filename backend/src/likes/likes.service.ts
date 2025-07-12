import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class LikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async likeUser(userId: number, likedId: number) {
    const like = await this.prisma.like.create({
      data: { userId, likedId },
    });

    // Send a real-time notification to the liked user
    await this.notificationsService.sendNotification({
      userId: likedId,
      message: `User ${userId} liked you!`,
    });

    return like;
  }

  async getAllLikes() {
    return this.prisma.like.findMany({
      include: {
        user: true,
      },
    });
  }
  async getLikedHistoryByUserId(userId: number) {
    return this.prisma.like.findMany({
      where: {
        userId: userId,
      },
      include: {
        liked: true, // Include the details of the liked users
      },
    });
  }

  // New method to get likes by userId
  async getLikesByUserId(likedId: number) {
    return this.prisma.like.findMany({
      where: {
        likedId: likedId,
      },
      include: {
        user: true,
      },
    });
  }
}
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { NotificationsService } from '../notifications/notifications.service';

// @Injectable()
// export class LikesService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly notificationsService: NotificationsService,
//   ) {}

//   async likeUser(userId: number, likedId: number) {
//     const like = await this.prisma.like.create({
//       data: { userId, likedId },
//     });

//     // Send a real-time notification to the liked user
//     await this.notificationsService.sendNotification({
//       userId: likedId,
//       message: `User ${userId} liked you!`,
//     });

//     return like;
//   }
//   async getAllLikes() {
//     return this.prisma.like.findMany({
//       include: {
//         user: true,
//       },
//     });
//   }
// }
