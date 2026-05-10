import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { InstrumentsService } from './instruments.service';

@ApiTags('instruments')
@Controller('api/instruments')
export class InstrumentsController {
  constructor(private instrumentsService: InstrumentsService) {}

  @Get('tiers')
  getTiers() {
    return this.instrumentsService.getTiers();
  }

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  subscribe(
    @CurrentUser() user: { id: string },
    @Body() body: { tierId: string },
  ) {
    return this.instrumentsService.subscribe(user.id, body.tierId);
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserSubscription(@CurrentUser() user: { id: string }) {
    return this.instrumentsService.getUserSubscription(user.id);
  }

  @Get('quote')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getQuote(@Query('symbol') symbol: string) {
    return this.instrumentsService.fetchQuote(symbol || 'EUR/USD');
  }
}
