import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { SignalsService } from './signals.service';
import { SignalType } from '@prisma/client';

@ApiTags('signals')
@Controller('api/signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'type', required: false, enum: ['BINARY', 'SCALPING', 'SWING'] })
  getSignals(@Query('type') type?: SignalType) {
    return this.signalsService.getSignals(type);
  }

  @Get('recent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getRecent(@Query('minutes') minutes?: string) {
    return this.signalsService.getRecentSignals(minutes ? parseInt(minutes) : 60);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getStats() {
    return this.signalsService.getSignalStats();
  }
}
