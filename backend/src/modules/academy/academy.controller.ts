import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AcademyService } from './academy.service';

@ApiTags('academy')
@Controller('api/academy')
export class AcademyController {
  constructor(private academyService: AcademyService) {}

  @Get('courses')
  getCourses() {
    return this.academyService.getAllCourses();
  }

  @Get('courses/main')
  getMainCourse() {
    return this.academyService.getMainCourse();
  }

  @Get('professional')
  getProfessionalCourses() {
    return this.academyService.getProfessionalCourses();
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.academyService.getLeaderboard();
  }

  @Post('enroll/:courseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  enroll(@Request() req: any, @Param('courseId') courseId: string) {
    return this.academyService.enroll(req.user.id, courseId);
  }

  @Post('enroll-professional/:courseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  enrollProfessional(@Request() req: any, @Param('courseId') courseId: string) {
    return this.academyService.enrollProfessional(req.user.id, courseId);
  }

  @Post('progress/:courseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateProgress(@Request() req: any, @Param('courseId') courseId: string, @Body() body: { progress: number; quizScore?: number }) {
    return this.academyService.updateProgress(req.user.id, courseId, body.progress, body.quizScore);
  }
}
