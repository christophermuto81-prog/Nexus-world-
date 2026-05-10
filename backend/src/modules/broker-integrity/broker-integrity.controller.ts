import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { BrokerIntegrityService } from './broker-integrity.service';

@ApiTags('broker-integrity')
@Controller('api/broker-integrity')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class BrokerIntegrityController {
  constructor(private service: BrokerIntegrityService) {}

  @Get('scores')
  getScores() {
    return this.service.getBrokerScores();
  }

  @Get('logs/:brokerId')
  getLogs(@Param('brokerId') brokerId: string) {
    return this.service.getIntegrityLogs(brokerId);
  }

  @Get('metrics')
  getMetrics() {
    return this.service.getMonitoredMetrics();
  }

  @Post('log')
  logEvent(@Body() body: { brokerId: string; metric: string; value: number; severity: string; action?: string }) {
    return this.service.logIntegrityEvent(body.brokerId, body.metric, body.value, body.severity, body.action);
  }

  @Put('threshold/:brokerId')
  updateThreshold(@Param('brokerId') brokerId: string, @Body() body: { threshold: number }) {
    return this.service.updateThreshold(brokerId, body.threshold);
  }
}
