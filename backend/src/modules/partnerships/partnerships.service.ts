import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const PROFIT_TIERS = [
  { name: 'BRONZE', splitUser: 50, splitPlatform: 50, minProfit: 0 },
  { name: 'SILVER', splitUser: 60, splitPlatform: 40, minProfit: 500 },
  { name: 'GOLD', splitUser: 70, splitPlatform: 30, minProfit: 2000 },
  { name: 'PLATINUM', splitUser: 80, splitPlatform: 20, minProfit: 10000 },
  { name: 'DIAMOND', splitUser: 90, splitPlatform: 10, minProfit: 50000 },
];

@Injectable()
export class PartnershipsService {
  constructor(private prisma: PrismaService) {}

  async apply(userId: string, data: { capitalDeposit: number }) {
    if (data.capitalDeposit < 10) {
      throw new BadRequestException('Minimum capital deposit is $10');
    }

    const existing = await this.prisma.partnership.findFirst({
      where: { userId, status: { in: ['PARTNERSHIP_PENDING', 'PARTNERSHIP_ACTIVE'] } },
    });
    if (existing) throw new BadRequestException('Active partnership already exists');

    return this.prisma.partnership.create({
      data: {
        userId,
        entryFee: 1,
        capitalDeposit: data.capitalDeposit,
        profitSplitUser: 50,
        profitSplitPlatform: 50,
        currentTier: 'BRONZE',
        status: 'PARTNERSHIP_ACTIVE',
        activatedAt: new Date(),
      },
    });
  }

  async getPartnership(userId: string) {
    return this.prisma.partnership.findFirst({
      where: { userId, status: { in: ['PARTNERSHIP_PENDING', 'PARTNERSHIP_ACTIVE'] } },
    });
  }

  async getAllPartnerships() {
    return this.prisma.partnership.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async recordProfit(userId: string, profit: number) {
    const partnership = await this.prisma.partnership.findFirst({
      where: { userId, status: 'PARTNERSHIP_ACTIVE' },
    });
    if (!partnership) throw new NotFoundException('No active partnership');

    const newTotal = partnership.totalProfit + profit;
    const tier = [...PROFIT_TIERS].reverse().find((t) => newTotal >= t.minProfit) || PROFIT_TIERS[0];

    const userPayout = profit * (tier.splitUser / 100);

    return this.prisma.partnership.update({
      where: { id: partnership.id },
      data: {
        totalProfit: newTotal,
        totalPayout: partnership.totalPayout + userPayout,
        currentTier: tier.name,
        profitSplitUser: tier.splitUser,
        profitSplitPlatform: tier.splitPlatform,
      },
    });
  }

  getTiers() {
    return PROFIT_TIERS;
  }
}
