import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AcademyService {
  constructor(private prisma: PrismaService) {}

  async getMainCourse() {
    return this.prisma.academyCourse.findFirst({ where: { isMainCourse: true }, include: { lessons: { orderBy: { sortOrder: 'asc' } } } });
  }

  async getAllCourses() {
    return this.prisma.academyCourse.findMany({ include: { _count: { select: { enrollments: true } } } });
  }

  async getProfessionalCourses() {
    return this.prisma.professionalCourse.findMany({ include: { _count: { select: { enrollments: true } } } });
  }

  async enroll(userId: string, courseId: string) {
    return this.prisma.academyEnrollment.create({ data: { userId, courseId } });
  }

  async enrollProfessional(userId: string, courseId: string) {
    return this.prisma.courseEnrollment.create({ data: { userId, courseId } });
  }

  async getEnrollment(userId: string, courseId: string) {
    return this.prisma.academyEnrollment.findUnique({ where: { userId_courseId: { userId, courseId } } });
  }

  async updateProgress(userId: string, courseId: string, progress: number, quizScore?: number) {
    const course = await this.prisma.academyCourse.findUnique({ where: { id: courseId } });
    const passScore = course?.passScore ?? 80;
    const graduated = progress >= 100 && (quizScore ?? 0) >= passScore;
    return this.prisma.academyEnrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress, quizScore, graduated, graduatedAt: graduated ? new Date() : undefined, walletGrant: graduated ? 10 : 0 },
    });
  }

  async getLeaderboard() {
    return this.prisma.academyEnrollment.findMany({
      where: { graduated: true },
      include: { user: { select: { name: true, email: true } }, course: { select: { title: true } } },
      orderBy: { graduatedAt: 'asc' },
      take: 50,
    });
  }
}
