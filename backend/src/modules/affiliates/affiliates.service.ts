import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AffiliatesService {
  constructor(private prisma: PrismaService) {}

  async registerAffiliate(userId: string) {
    const existing = await this.prisma.affiliateCode.findUnique({ where: { userId } });
    if (existing) throw new ConflictException('Already registered as affiliate');

    const code = `LX-${uuidv4().slice(0, 8).toUpperCase()}`;
    return this.prisma.affiliateCode.create({
      data: { userId, code },
    });
  }

  async getAffiliateInfo(userId: string) {
    const affiliate = await this.prisma.affiliateCode.findUnique({
      where: { userId },
      include: {
        referrals: {
          include: {
            referredUser: {
              select: { id: true, email: true, name: true, createdAt: true },
            },
          },
        },
      },
    });
    if (!affiliate) throw new NotFoundException('Not registered as affiliate');

    const totalEarnings = affiliate.referrals.reduce((sum, r) => sum + r.lifetimeEarnings, 0);
    return { ...affiliate, totalEarnings };
  }

  async applyReferralCode(userId: string, code: string) {
    const affiliateCode = await this.prisma.affiliateCode.findUnique({ where: { code } });
    if (!affiliateCode) throw new NotFoundException('Invalid referral code');
    if (affiliateCode.userId === userId) throw new ConflictException('Cannot refer yourself');

    const existing = await this.prisma.affiliateReferral.findUnique({
      where: { referredUserId: userId },
    });
    if (existing) throw new ConflictException('Already referred');

    return this.prisma.affiliateReferral.create({
      data: {
        referrerId: affiliateCode.userId,
        referredUserId: userId,
        affiliateCodeId: affiliateCode.id,
      },
    });
  }

  async processCommission(referredUserId: string, subscriptionAmount: number) {
    const referral = await this.prisma.affiliateReferral.findUnique({
      where: { referredUserId },
    });
    if (!referral) return null;

    const isFirst = referral.commission === 0;
    const rate = isFirst ? 0.5 : 0.1; // 50% first, 10% lifetime
    const commission = subscriptionAmount * rate;
    const bonus = subscriptionAmount >= 149 && !referral.bonusPaid ? 50 : 0;

    return this.prisma.affiliateReferral.update({
      where: { id: referral.id },
      data: {
        commission: { increment: commission + bonus },
        lifetimeEarnings: { increment: commission + bonus },
        bonusPaid: bonus > 0 ? true : referral.bonusPaid,
      },
    });
  }
}
