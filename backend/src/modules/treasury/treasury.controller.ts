import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { TreasuryService } from './treasury.service';

@ApiTags('treasury')
@Controller('api/treasury')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class TreasuryController {
  constructor(private service: TreasuryService) {}

  @Get('summary')
  getSummary() {
    return this.service.getSummary();
  }

  @Get('records')
  getRecords() {
    return this.service.getRecords();
  }

  @Get('latest')
  getLatest() {
    return this.service.getLatest();
  }

  @Get('director-salary')
  getDirectorSalary() {
    return this.service.getDirectorSalaryHistory();
  }

  @Post('calculate-salary')
  calculateSalary() {
    return this.service.calculateDirectorSalary();
  }

  @Post('record')
  record(@Body() body: { dailyIncome: number }) {
    return this.service.recordDaily(body.dailyIncome);
  }
}
