import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { AffiliateSettlementService } from './affiliate-settlement.service';

@ApiTags('affiliate-settlement')
@Controller('api/affiliate-settlements')
export class AffiliateSettlementController {
  constructor(private settlementService: AffiliateSettlementService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMySettlements(@CurrentUser() user: { id: string }) {
    return this.settlementService.getSettlements(user.id);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getStats(@CurrentUser() user: { id: string }) {
    return this.settlementService.getSettlementStats(user.id);
  }

  @Post('request')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  requestSettlement(@CurrentUser() user: { id: string }) {
    return this.settlementService.createSettlement(user.id);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getPendingSettlements() {
    return this.settlementService.getPendingSettlements();
  }

  @Post(':id/process')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  processSettlement(@Param('id') id: string) {
    return this.settlementService.processSettlement(id);
  }
}
