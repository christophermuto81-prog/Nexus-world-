import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { DirectorSalaryService } from './director-salary.service';

@ApiTags('director-salary')
@Controller('api/director-salary')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class DirectorSalaryController {
  constructor(private salaryService: DirectorSalaryService) {}

  @Get('current')
  getCurrentMonth() {
    return this.salaryService.getCurrentMonth();
  }

  @Get('history')
  getHistory() {
    return this.salaryService.getHistory();
  }

  @Get('summary')
  getSummary() {
    return this.salaryService.getSummary();
  }

  @Post(':month/approve')
  approveSalary(@Param('month') month: string) {
    return this.salaryService.approveSalary(month);
  }

  @Post(':month/paid')
  markPaid(@Param('month') month: string) {
    return this.salaryService.markPaid(month);
  }
}
