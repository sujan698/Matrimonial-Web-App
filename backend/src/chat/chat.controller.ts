import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('matches')
  async getMatches(@Req() req) {
    return this.chatService.getMatches(req.user.sub);
  }

  @Get('messages/:matchId')
  async getMessages(@Req() req, @Param('matchId') matchId: string) {
    return this.chatService.getMessageHistory(req.user.sub, parseInt(matchId));
  }
}
