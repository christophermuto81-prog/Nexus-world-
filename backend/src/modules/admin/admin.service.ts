import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [userCount, signalCount, tradeCount, revenue] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.signal.count(),
      this.prisma.trade.count(),
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
    ]);

    return {
      users: userCount,
      signals: signalCount,
      trades: tradeCount,
      revenue: revenue._sum.amount || 0,
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        solanaAddress: true,
        createdAt: true,
        _count: { select: { trades: true, subscriptions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRevenueBreakdown() {
    const payments = await this.prisma.payment.findMany({
      where: { status: 'COMPLETED' },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return payments;
  }

  async getSignalPerformance() {
    const signals = await this.prisma.signal.groupBy({
      by: ['status'],
      _count: true,
    });
    return signals;
  }
}
