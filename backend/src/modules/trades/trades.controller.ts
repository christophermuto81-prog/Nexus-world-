import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { TradesService } from './trades.service';
import { SignalDirection } from '@prisma/client';

@ApiTags('trades')
@Controller('api/trades')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TradesController {
  constructor(private tradesService: TradesService) {}

  @Post('open')
  openTrade(
    @CurrentUser('id') userId: string,
    @Body()
    body: {
      signalId?: string;
      instrument: string;
      direction: SignalDirection;
      entryPrice: number;
      quantity: number;
      stopLoss?: number;
      takeProfit?: number;
    },
  ) {
    return this.tradesService.openTrade(userId, body);
  }

  @Post(':id/close')
  closeTrade(
    @CurrentUser('id') userId: string,
    @Param('id') tradeId: string,
    @Body() body: { exitPrice: number },
  ) {
    return this.tradesService.closeTrade(userId, tradeId, body.exitPrice);
  }

  @Get()
  getTrades(@CurrentUser('id') userId: string, @Query('status') status?: string) {
    return this.tradesService.getUserTrades(userId, status);
  }

  @Get('positions')
  getPositions(@CurrentUser('id') userId: string) {
    return this.tradesService.getOpenPositions(userId);
  }

  @Get('pnl')
  getPnl(@CurrentUser('id') userId: string) {
    return this.tradesService.getPnlSummary(userId);
  }
}
