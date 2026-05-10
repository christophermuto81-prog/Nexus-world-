import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InstrumentsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getTiers() {
    return this.prisma.instrumentsTier.findMany({
      orderBy: { price: 'asc' },
    });
  }

  async subscribe(userId: string, tierId: string) {
    const tier = await this.prisma.instrumentsTier.findUnique({
      where: { id: tierId },
    });
    if (!tier) throw new NotFoundException('Tier not found');

    const existing = await this.prisma.userInstrumentsSub.findFirst({
      where: { userId, active: true },
    });

    if (existing) {
      await this.prisma.userInstrumentsSub.update({
        where: { id: existing.id },
        data: { active: false, endDate: new Date() },
      });
    }

    return this.prisma.userInstrumentsSub.create({
      data: {
        userId,
        tierId,
        active: true,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async getUserSubscription(userId: string) {
    return this.prisma.userInstrumentsSub.findFirst({
      where: { userId, active: true },
      include: { tier: true },
    });
  }

  async fetchQuote(symbol: string) {
    const apiKey = this.config.get<string>('FCS_API_KEY');
    if (!apiKey) {
      return {
        symbol,
        price: this.generateMockPrice(symbol),
        change: (Math.random() * 4 - 2).toFixed(2),
        changePercent: (Math.random() * 2 - 1).toFixed(2),
        source: 'mock',
      };
    }

    try {
      const res = await fetch(
        `https://fcsapi.com/api-v3/forex/latest?symbol=${symbol}&access_key=${apiKey}`,
      );
      const data = await res.json();
      if (data.response && data.response.length > 0) {
        const quote = data.response[0];
        return {
          symbol: quote.s,
          price: parseFloat(quote.c),
          change: quote.ch,
          changePercent: quote.cp,
          source: 'fcs',
        };
      }
    } catch {
      // fallback to mock
    }

    return {
      symbol,
      price: this.generateMockPrice(symbol),
      change: '0.00',
      changePercent: '0.00',
      source: 'mock',
    };
  }

  private generateMockPrice(symbol: string): number {
    const prices: Record<string, number> = {
      'EUR/USD': 1.0872,
      'GBP/USD': 1.2654,
      'USD/JPY': 149.82,
      'BTC/USD': 42150,
      'ETH/USD': 2280,
      'AAPL': 185.5,
      'GOOGL': 141.2,
      'TSLA': 248.6,
      'XAU/USD': 2045,
      'US30': 37450,
    };
    const base = prices[symbol] || 100;
    return +(base * (1 + (Math.random() * 0.02 - 0.01))).toFixed(4);
  }
}
