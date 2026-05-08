import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { AiCoreService } from './ai-core.service';

@ApiTags('ai-core')
@Controller('api/ai-core')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AiCoreController {
  constructor(private aiCoreService: AiCoreService) {}

  @Get('state')
  getState() {
    return this.aiCoreService.getState();
  }

  @Get('filters')
  getFilters() {
    return this.aiCoreService.getFilterHierarchy();
  }

  @Get('confluence')
  getConfluence() {
    return this.aiCoreService.getConfluenceGauge();
  }

  @Get('aggression')
  getAggression() {
    return this.aiCoreService.getAggressionLevels();
  }

  @Get('regime')
  getRegime() {
    return this.aiCoreService.getRegimeDetector();
  }

  @Get('sharpe')
  getSharpe() {
    return this.aiCoreService.getRollingSharpPanel();
  }

  @Put('state')
  updateState(@Body() data: any) {
    return this.aiCoreService.updateState(data);
  }
}
