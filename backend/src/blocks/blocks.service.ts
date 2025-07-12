import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlockService {
  constructor(private prismaService: PrismaService) {}

  async blockUser(blockedId: number) {
    return await this.prismaService.block.create({
      data: {
        blockedId: blockedId,
      },
    });
  }

  async getBlockedUsers(userId: number) {
    return await this.prismaService.block.findMany({
      where: { blockedId: userId }, // Add this filter
      include: { blocked: true },
    });
  }

  async getAllBlockedUsers() {
    return this.prismaService.block.findMany({
      include: { blocked: true },
    });
  }

  async unblockUser(id: number) {
    return await this.prismaService.block.delete({
      where: { id },
    });
  }
}
