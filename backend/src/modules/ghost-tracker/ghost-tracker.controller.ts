import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { GhostTrackerService } from './ghost-tracker.service';

@ApiTags('ghost-tracker')
@Controller('api/ghost-tracker')
export class GhostTrackerController {
  constructor(private service: GhostTrackerService) {}

  @Get('alerts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getAlerts() {
    return this.service.getAlerts();
  }

  @Get('threat-map')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getThreatMap() {
    return this.service.getThreatMap();
  }

  @Get('suspicious-reports')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getReports() {
    return this.service.getSuspiciousReports();
  }

  @Get('login-alerts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getLoginAlerts(@Request() req: any) {
    return this.service.getLoginAlerts(req.user.id);
  }

  @Post('alert')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  createAlert(@Body() body: { type: string; source: string; details: string; severity: string; threatScore: number }) {
    return this.service.createAlert(body.type, body.source, body.details, body.severity, body.threatScore);
  }

  @Post('report')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  report(@Request() req: any, @Body() body: { type: string; description: string }) {
    return this.service.reportSuspicious(req.user.id, body.type, body.description);
  }

  @Put('resolve/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  resolve(@Param('id') id: string) {
    return this.service.resolveAlert(id);
  }
}
