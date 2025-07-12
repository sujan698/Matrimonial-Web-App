import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BlockService } from './blocks.service';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async blockUser(@Body('blockedId') blockedId: number) {
    return this.blockService.blockUser(Number(blockedId));
  }

  @Get(':userId')
  async getBlockedUsers(@Param('userId') userId: number) {
    return this.blockService.getBlockedUsers(Number(userId));
  }

  @Get()
  async getAllBlockedUsers() {
    return this.blockService.getAllBlockedUsers();
  }

  @Delete(':id')
  async unblockUser(@Param('id') id: number) {
    return this.blockService.unblockUser(Number(id));
  }
}