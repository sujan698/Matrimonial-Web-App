import { Controller, Get, Param } from '@nestjs/common';
import { MatchingService } from './matching.service';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get(':userId')
  async getMatches(@Param('userId') userId: string) {
    return this.matchingService.findMatches(parseInt(userId));
  }
}
