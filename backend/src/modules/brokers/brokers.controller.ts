import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { BrokersService } from './brokers.service';

@ApiTags('brokers')
@Controller('api/brokers')
export class BrokersController {
  constructor(private brokersService: BrokersService) {}

  @Get()
  getBrokers(@Query('search') search?: string) {
    return this.brokersService.getBrokers(search);
  }

  @Post('connect')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  connect(
    @CurrentUser('id') userId: string,
    @Body() body: { brokerId: string; apiKey: string; apiSecret: string },
  ) {
    return this.brokersService.connectBroker(userId, body.brokerId, body.apiKey, body.apiSecret);
  }

  @Get('my-connections')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getConnections(@CurrentUser('id') userId: string) {
    return this.brokersService.getUserConnections(userId);
  }
}
