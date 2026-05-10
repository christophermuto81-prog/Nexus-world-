import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const LX_TOKEN_RATE = 0.05; // 1 LX = $0.05

@Injectable()
export class AffiliateSettlementService {
  constructor(private prisma: PrismaService) {}

  async getSettlements(userId: string) {
    return this.prisma.affiliateSettlement.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPendingSettlements() {
    return this.prisma.affiliateSettlement.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { id: true, name: true, email: true, solanaAddress: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSettlement(userId: string) {
    const affiliateCode = await this.prisma.affiliateCode.findUnique({
      where: { userId },
      include: {
        referrals: { where: { commission: { gt: 0 } } },
      },
    });

    if (!affiliateCode) throw new NotFoundException('No affiliate code found');

    const unsettledAmount = affiliateCode.referrals.reduce(
      (sum, r) => sum + r.commission + r.lifetimeEarnings,
      0,
    );

    if (unsettledAmount <= 0) throw new BadRequestException('No earnings to settle');

    const lxAmount = unsettledAmount / LX_TOKEN_RATE;

    return this.prisma.affiliateSettlement.create({
      data: {
        userId,
        affiliateCodeId: affiliateCode.id,
        amount: unsettledAmount,
        lxTokenAmount: lxAmount,
        status: 'PENDING',
      },
    });
  }

  async processSettlement(settlementId: string) {
    const settlement = await this.prisma.affiliateSettlement.findUnique({
      where: { id: settlementId },
      include: { user: true },
    });

    if (!settlement) throw new NotFoundException('Settlement not found');
    if (settlement.status !== 'PENDING') throw new BadRequestException('Settlement not pending');

    // In production, this would:
    // 1. Mint/transfer LX tokens on Solana
    // 2. Record the transaction signature
    const mockTxSig = `LX_SETTLE_${Date.now()}_${settlement.id.slice(0, 8)}`;

    return this.prisma.affiliateSettlement.update({
      where: { id: settlementId },
      data: {
        status: 'SETTLED',
        txSignature: mockTxSig,
        settledAt: new Date(),
      },
    });
  }

  async getSettlementStats(userId: string) {
    const settlements = await this.prisma.affiliateSettlement.findMany({
      where: { userId },
    });

    const totalSettled = settlements
      .filter((s) => s.status === 'SETTLED')
      .reduce((sum, s) => sum + s.amount, 0);

    const totalLxTokens = settlements
      .filter((s) => s.status === 'SETTLED')
      .reduce((sum, s) => sum + s.lxTokenAmount, 0);

    const pending = settlements
      .filter((s) => s.status === 'PENDING')
      .reduce((sum, s) => sum + s.amount, 0);

    return {
      totalSettled,
      totalLxTokens,
      pendingAmount: pending,
      lxTokenRate: LX_TOKEN_RATE,
      settlementsCount: settlements.length,
    };
  }
}
