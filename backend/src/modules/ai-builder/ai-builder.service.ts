import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiBuilderService {
  constructor(private prisma: PrismaService) {}

  async getStrategies(userId: string) {
    return this.prisma.aiBuilderStrategy.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async createStrategy(userId: string, name: string, filters: any, tier: string) {
    return this.prisma.aiBuilderStrategy.create({
      data: { userId, name, filters, tier: tier as any },
    });
  }

  async updateStrategy(id: string, userId: string, data: { filters?: any; backtestResult?: any; paperTradeResult?: any }) {
    const strategy = await this.prisma.aiBuilderStrategy.findFirst({ where: { id, userId } });
    if (!strategy) throw new NotFoundException('Strategy not found');
    return this.prisma.aiBuilderStrategy.update({ where: { id }, data });
  }

  async publishStrategy(id: string, userId: string) {
    const strategy = await this.prisma.aiBuilderStrategy.findFirst({ where: { id, userId } });
    if (!strategy) throw new NotFoundException('Strategy not found');
    return this.prisma.aiBuilderStrategy.update({ where: { id }, data: { published: true } });
  }

  async getMarketplace() {
    return this.prisma.aiBuilderStrategy.findMany({
      where: { published: true, validated: true },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTiers() {
    return [
      { id: 'BUILDER_STARTER', name: 'Starter', price: 19, filters: 5, gpuCredits: 100 },
      { id: 'BUILDER_PRO', name: 'Pro', price: 49, filters: 10, gpuCredits: 500 },
      { id: 'BUILDER_ENTERPRISE', name: 'Enterprise', price: 99, filters: 14, gpuCredits: 2000 },
    ];
  }

  async getLevel1Filters() {
    return ['RSI', 'MACD', 'Bollinger Bands', 'EMA Cross', 'Fibonacci', 'Ichimoku', 'Volume Profile', 'ATR', 'Stochastic', 'ADX', 'Parabolic SAR', 'VWAP', 'Supertrend', 'Pivot Points'];
  }
}
