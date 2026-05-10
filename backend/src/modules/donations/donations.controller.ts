import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { DonationsService } from './donations.service';

@ApiTags('donations')
@Controller('api/donations')
export class DonationsController {
  constructor(private service: DonationsService) {}

  @Get()
  getFunds() {
    return this.service.getDonationFunds();
  }

  @Get('total')
  getTotal() {
    return this.service.getTotalDonated();
  }

  @Post('allocate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  allocate(@Body() body: { platformEarnings: number }) {
    return this.service.allocateDaily(body.platformEarnings);
  }

  @Put('recipient/:date')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  setRecipient(@Param('date') date: string, @Body() body: { recipientCause: string }) {
    return this.service.setRecipient(date, body.recipientCause);
  }
}
