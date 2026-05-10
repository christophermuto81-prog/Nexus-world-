import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { KillSwitchService } from './kill-switch.service';

@ApiTags('kill-switch')
@Controller('api/kill-switch')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class KillSwitchController {
  constructor(private service: KillSwitchService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post('initialize')
  initialize() {
    return this.service.initializeDefaults();
  }

  @Put(':name')
  toggle(@Param('name') name: string, @Body() body: { enabled: boolean; reason?: string; toggledBy?: string }) {
    return this.service.toggle(name, body.enabled, body.reason, body.toggledBy);
  }
}
