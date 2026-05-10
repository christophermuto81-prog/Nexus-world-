import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DirectorSalaryService {
  constructor(private prisma: PrismaService) {}

  async getCurrentMonth() {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    let record = await this.prisma.directorSalary.findUnique({
      where: { month },
    });

    if (!record) {
      const revenue = await this.calculatePlatformRevenue();
      record = await this.prisma.directorSalary.create({
        data: {
          month,
          grossRevenue: revenue,
          salaryAmount: revenue * 0.25,
          personalDraw: revenue * 0.25,
          reinvested: revenue * 0.75,
          platformRevenue: revenue,
        },
      });
    }

    return record;
  }

  async getHistory() {
    return this.prisma.directorSalary.findMany({
      orderBy: { month: 'desc' },
    });
  }

  async approveSalary(month: string) {
    const record = await this.prisma.directorSalary.findUnique({
      where: { month },
    });
    if (!record) throw new BadRequestException('Salary record not found');
    if (record.status === 'PAID') throw new BadRequestException('Already paid');

    return this.prisma.directorSalary.update({
      where: { month },
      data: { status: 'APPROVED' },
    });
  }

  async markPaid(month: string) {
    return this.prisma.directorSalary.update({
      where: { month },
      data: { status: 'PAID', paidAt: new Date() },
    });
  }

  async getSummary() {
    const records = await this.prisma.directorSalary.findMany();
    const totalGross = records.reduce((sum, r) => sum + r.grossRevenue, 0);
    const totalDraw = records.reduce((sum, r) => sum + r.personalDraw, 0);
    const totalReinvested = records.reduce((sum, r) => sum + r.reinvested, 0);
    const totalRevenue = records.reduce((sum, r) => sum + r.platformRevenue, 0);

    return {
      monthsActive: records.length,
      totalGross,
      totalDraw,
      totalReinvested,
      totalRevenue,
      drawPercentage: 25,
      reinvestPercentage: 75,
    };
  }

  private async calculatePlatformRevenue(): Promise<number> {
    const payments = await this.prisma.payment.findMany({
      where: { status: 'COMPLETED' },
    });
    return payments.reduce((sum, p) => sum + p.amount, 0);
  }
}
