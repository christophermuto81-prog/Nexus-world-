import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getTiers() {
    return this.prisma.subscriptionTier.findMany({
      orderBy: { price: 'asc' },
    });
  }

  async getSignalPasses() {
    return this.prisma.signalPass.findMany({
      where: { active: true },
      orderBy: { price: 'asc' },
    });
  }

  async subscribe(userId: string, tierId: string, paymentId?: string) {
    const tier = await this.prisma.subscriptionTier.findUnique({ where: { id: tierId } });
    if (!tier) throw new NotFoundException('Tier not found');

    // Deactivate previous subscriptions
    await this.prisma.userSubscription.updateMany({
      where: { userId, active: true },
      data: { active: false, endDate: new Date() },
    });

    return this.prisma.userSubscription.create({
      data: {
        userId,
        tierId,
        paymentId,
        active: true,
      },
      include: { tier: true },
    });
  }

  async purchaseSignalPass(userId: string, passId: string, paymentId?: string) {
    const pass = await this.prisma.signalPass.findUnique({ where: { id: passId } });
    if (!pass) throw new NotFoundException('Signal pass not found');

    const durationMs = {
      HOURLY: 60 * 60 * 1000,
      DAILY: 24 * 60 * 60 * 1000,
      WEEKLY: 7 * 24 * 60 * 60 * 1000,
      MONTHLY: 30 * 24 * 60 * 60 * 1000,
    };

    const endDate = new Date(Date.now() + durationMs[pass.duration]);

    return this.prisma.userSignalPass.create({
      data: {
        userId,
        passId,
        paymentId,
        endDate,
        active: true,
      },
      include: { pass: true },
    });
  }

  async getUserSubscription(userId: string) {
    return this.prisma.userSubscription.findFirst({
      where: { userId, active: true },
      include: { tier: true },
    });
  }

  async getUserSignalPasses(userId: string) {
    return this.prisma.userSignalPass.findMany({
      where: { userId, active: true, endDate: { gt: new Date() } },
      include: { pass: true },
    });
  }
}
