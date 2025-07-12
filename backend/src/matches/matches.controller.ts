import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchDto } from './dto/create-match.dto';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createMatch(@Body() matchDto: MatchDto) {
    return this.matchesService.createMatch(matchDto.user1Id, matchDto.user2Id);
  }

  @Get()
  async getAllMatches() {
    return this.matchesService.getAllMatches();
  }

  // @Get(':id')
  // async getMatchById(@Param('id') id: number) {
  //   return this.matchesService.getMatchById(id);
  // }
  @Get(':userId')
  @UseGuards(AuthGuard)
  async getMatch(@Param('userId') userId: number) {
    return this.matchesService.getMatchForUser(userId);
  }
}
