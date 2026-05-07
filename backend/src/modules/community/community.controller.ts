import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CommunityService } from './community.service';

@ApiTags('community')
@Controller('api/community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Get('events')
  getEvents(@Query('limit') limit?: string) {
    return this.communityService.getRecentEvents(limit ? parseInt(limit) : 50);
  }

  @Post('seed-ghost')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  seedGhost(@Body() body: { count: number }) {
    return this.communityService.seedGhostEvents(body.count);
  }
}
