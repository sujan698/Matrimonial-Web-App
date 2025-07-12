import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async likeUser(@Body() likeDto: LikeDto) {
    return this.likesService.likeUser(likeDto.userId, likeDto.likedId);
  }

  @Get()
  async getAllLikes() {
    return this.likesService.getAllLikes();
  }

  // New endpoint to get likes by userId
  @Get(':userId')
  async getLikesByUserId(@Param('userId') userId: string) {
    // Convert userId to a number
    return this.likesService.getLikesByUserId(+userId);
  }
  @Get('history/:userId')
  async getLikedHistoryByUserId(@Param('userId') userId: string) {
    // Convert userId to a number
    return this.likesService.getLikedHistoryByUserId(+userId);
  }
}
