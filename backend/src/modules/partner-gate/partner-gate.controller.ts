import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { PartnerGateService } from './partner-gate.service';

@ApiTags('partner-gate')
@Controller('api/partner-gate')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class PartnerGateController {
  constructor(private service: PartnerGateService) {}

  @Get('evaluate')
  evaluate() {
    return this.service.evaluateGate();
  }

  @Get('lockdown')
  getLockdown() {
    return this.service.getLockdownStatus();
  }

  @Put('lockdown')
  setLockdown(@Body() body: { lockdown: boolean }) {
    return this.service.setLockdown(body.lockdown);
  }
}
