import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('subscriptions')
@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('tiers')
  getTiers() {
    return this.subscriptionsService.getTiers();
  }

  @Get('signal-passes')
  getSignalPasses() {
    return this.subscriptionsService.getSignalPasses();
  }

  @Get('my-subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMySubscription(@CurrentUser('id') userId: string) {
    return this.subscriptionsService.getUserSubscription(userId);
  }

  @Get('my-passes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMyPasses(@CurrentUser('id') userId: string) {
    return this.subscriptionsService.getUserSignalPasses(userId);
  }

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  subscribe(
    @CurrentUser('id') userId: string,
    @Body() body: { tierId: string; paymentId?: string },
  ) {
    return this.subscriptionsService.subscribe(userId, body.tierId, body.paymentId);
  }

  @Post('purchase-pass')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  purchasePass(
    @CurrentUser('id') userId: string,
    @Body() body: { passId: string; paymentId?: string },
  ) {
    return this.subscriptionsService.purchaseSignalPass(userId, body.passId, body.paymentId);
  }
}
