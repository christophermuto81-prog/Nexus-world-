import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { FailureTheoryService } from './failure-theory.service';

@ApiTags('failure-theory')
@Controller('api/failure-theory')
export class FailureTheoryController {
  constructor(private service: FailureTheoryService) {}

  @Get('resilience')
  getResilience() {
    return this.service.getResilienceMetrics();
  }

  @Get('logs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getLogs(@Query('limit') limit?: string) {
    return this.service.getFailureLogs(limit ? parseInt(limit) : 50);
  }

  @Get('modes')
  getModes() {
    return this.service.getCorrectionModes();
  }

  @Get('sources')
  getSources() {
    return this.service.getIntakeSources();
  }

  @Get('seven-day')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  getSevenDay() {
    return this.service.getSevenDayPerformance();
  }

  @Post('capture')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  capture(@Body() body: { source: string; failureType: string; correctionMode: string }) {
    return this.service.captureFailure(body.source, body.failureType, body.correctionMode);
  }

  @Put('advance/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  advance(@Param('id') id: string, @Body() body: { stage: string; lessonLearned?: string }) {
    return this.service.advanceStage(id, body.stage, body.lessonLearned);
  }
}
