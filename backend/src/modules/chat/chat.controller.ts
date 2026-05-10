import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('api/chat')
export class ChatController {
  constructor(private service: ChatService) {}

  @Get('messages')
  getMessages(@Query('limit') limit?: string) {
    return this.service.getMessages(limit ? parseInt(limit) : 50);
  }

  @Get('online')
  getOnline() {
    return this.service.getOnlineCount();
  }

  @Post('send')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  send(@Request() req: any, @Body() body: { content: string }) {
    return this.service.sendMessage(req.user.id, body.content);
  }

  @Put('flag/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  flag(@Param('id') id: string) {
    return this.service.flagMessage(id);
  }
}
