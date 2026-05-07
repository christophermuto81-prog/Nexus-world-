import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('api/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('revenue')
  getRevenue() {
    return this.adminService.getRevenueBreakdown();
  }

  @Get('signals')
  getSignalPerformance() {
    return this.adminService.getSignalPerformance();
  }
}
