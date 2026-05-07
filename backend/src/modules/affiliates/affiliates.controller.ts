import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { AffiliatesService } from './affiliates.service';

@ApiTags('affiliates')
@Controller('api/affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AffiliatesController {
  constructor(private affiliatesService: AffiliatesService) {}

  @Post('register')
  register(@CurrentUser('id') userId: string) {
    return this.affiliatesService.registerAffiliate(userId);
  }

  @Get('me')
  getInfo(@CurrentUser('id') userId: string) {
    return this.affiliatesService.getAffiliateInfo(userId);
  }

  @Post('apply-code')
  applyCode(
    @CurrentUser('id') userId: string,
    @Body() body: { code: string },
  ) {
    return this.affiliatesService.applyReferralCode(userId, body.code);
  }
}
