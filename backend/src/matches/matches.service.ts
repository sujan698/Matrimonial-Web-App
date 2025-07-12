import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MatchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async createMatch(user1Id: number, user2Id: number) {
    const match = await this.prisma.match.create({
      data: { user1Id, user2Id },
    });

    // Send real-time notifications to both users
    await this.notificationsService.sendNotification({
      userId: user1Id,
      message: `You matched with User ${user2Id}!`,
    });

    await this.notificationsService.sendNotification({
      userId: user2Id,
      message: `You matched with User ${user1Id}!`,
    });

    return match;
  }
  async getAllMatches() {
    return this.prisma.match.findMany();
  }
  async getMatchForUser(userId: number) {
    const matches = await this.prisma.match.findMany({
      where: {
        OR: [{ user1Id: Number(userId) }, { user2Id: Number(userId) }],
      },
      include: {
        user1: {
          include:{
            UploadPhoto: true,
          }
        },
        user2: true,
      },
    });

    if (matches.length === 0) {
      throw new NotFoundException(`Matches for user ID ${userId} not found`);
    }

    return matches;
  }
}
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { NotificationsService } from '../notifications/notifications.service';

// @Injectable()
// export class MatchesService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly notificationsService: NotificationsService,
//   ) {}

//   async createMatch(user1Id: number, user2Id: number) {
//     const match = await this.prisma.match.create({
//       data: { user1Id, user2Id },
//     });

//     // Send real-time notifications to both users
//     await this.notificationsService.sendNotification({
//       userId: user1Id,
//       message: `You matched with User ${user2Id}!`,
//     });

//     await this.notificationsService.sendNotification({
//       userId: user2Id,
//       message: `You matched with User ${user1Id}!`,
//     });

//     return match;
//   }
//   async getAllMatches() {
//     return this.prisma.match.findMany();
//   }
//   async getMatchById(id: number) {
//     const match = await this.prisma.match.findUnique({
//       where: {
//         id: Number(id),
//       },
//       include: {
//         user1: {
//           include: {
//             UploadPhoto: true,
//           },
//         }, // Include full user1 object
//         user2: {
//           include: {
//             UploadPhoto: true,
//           },
//         },
//       },
//     });

//     if (!match) {
//       throw new NotFoundException(`Match with ID ${id} not found`);
//     }

//     return match;
//   }
// }
