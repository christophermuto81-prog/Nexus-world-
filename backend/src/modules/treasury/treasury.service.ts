import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TreasuryService {
  constructor(private prisma: PrismaService) {}

  async recordDaily(dailyIncome: number) {
    const date = new Date().toISOString().split('T')[0];
    const tradingPool = dailyIncome * 0.70;
    const opsRetained = dailyIncome * 0.30;
    const donationAlloc = dailyIncome * 0.0025;

    return this.prisma.treasuryRecord.upsert({
      where: { date },
      create: { date, dailyIncome, tradingPool, opsRetained, donationAlloc },
      update: { dailyIncome, tradingPool, opsRetained, donationAlloc },
    });
  }

  async getRecords(limit = 30) {
    return this.prisma.treasuryRecord.findMany({ orderBy: { date: 'desc' }, take: limit });
  }

  async getLatest() {
    return this.prisma.treasuryRecord.findFirst({ orderBy: { date: 'desc' } });
  }

  async getSummary() {
    const agg = await this.prisma.treasuryRecord.aggregate({
      _sum: { dailyIncome: true, tradingPool: true, opsRetained: true, tradingProfit: true, donationAlloc: true },
    });
    const latest = await this.getLatest();
    return {
      totalIncome: agg._sum.dailyIncome || 0,
      totalTradingPool: agg._sum.tradingPool || 0,
      totalOps: agg._sum.opsRetained || 0,
      totalTradingProfit: agg._sum.tradingProfit || 0,
      totalDonations: agg._sum.donationAlloc || 0,
      currentPoolBalance: latest?.poolBalance || 0,
      currentDrawdown: latest?.drawdownPct || 0,
      currentSharpe: latest?.sharpeRatio || null,
      maxDrawdownHardLock: 5.0,
    };
  }

  async calculateDirectorSalary() {
    const month = new Date().toISOString().slice(0, 7);
    const records = await this.prisma.treasuryRecord.findMany({
      where: { date: { startsWith: month } },
    });
    const totalRevenue = records.reduce((s, r) => s + r.dailyIncome, 0);
    const salaryAmount = totalRevenue * 0.25;

    return this.prisma.directorSalary.upsert({
      where: { month },
      create: { month, grossRevenue: totalRevenue, salaryAmount, personalDraw: salaryAmount, reinvested: totalRevenue - salaryAmount, platformRevenue: totalRevenue },
      update: { grossRevenue: totalRevenue, salaryAmount, personalDraw: salaryAmount, reinvested: totalRevenue - salaryAmount, platformRevenue: totalRevenue },
    });
  }

  async getDirectorSalaryHistory() {
    return this.prisma.directorSalary.findMany({ orderBy: { month: 'desc' }, take: 12 });
  }
}
