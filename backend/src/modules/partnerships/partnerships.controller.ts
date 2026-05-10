import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { PartnershipsService } from './partnerships.service';

@ApiTags('partnerships')
@Controller('api/partnerships')
export class PartnershipsController {
  constructor(private partnershipsService: PartnershipsService) {}

  @Get('tiers')
  getTiers() {
    return this.partnershipsService.getTiers();
  }

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  apply(
    @CurrentUser() user: { id: string },
    @Body() body: { capitalDeposit: number },
  ) {
    return this.partnershipsService.apply(user.id, body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMyPartnership(@CurrentUser() user: { id: string }) {
    return this.partnershipsService.getPartnership(user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getAllPartnerships() {
    return this.partnershipsService.getAllPartnerships();
  }

  @Post('profit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  recordProfit(
    @CurrentUser() user: { id: string },
    @Body() body: { profit: number },
  ) {
    return this.partnershipsService.recordProfit(user.id, body.profit);
  }
}
