import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignalDirection } from '@prisma/client';

@Injectable()
export class TradesService {
  constructor(private prisma: PrismaService) {}

  async openTrade(
    userId: string,
    data: {
      signalId?: string;
      instrument: string;
      direction: SignalDirection;
      entryPrice: number;
      quantity: number;
      stopLoss?: number;
      takeProfit?: number;
    },
  ) {
    return this.prisma.trade.create({
      data: {
        userId,
        signalId: data.signalId,
        instrument: data.instrument,
        direction: data.direction,
        entryPrice: data.entryPrice,
        quantity: data.quantity,
        stopLoss: data.stopLoss,
        takeProfit: data.takeProfit,
      },
    });
  }

  async closeTrade(userId: string, tradeId: string, exitPrice: number) {
    const trade = await this.prisma.trade.findFirst({
      where: { id: tradeId, userId, status: 'OPEN' },
    });

    if (!trade) throw new NotFoundException('Trade not found or already closed');

    const pnl =
      trade.direction === 'BUY'
        ? (exitPrice - trade.entryPrice) * trade.quantity
        : (trade.entryPrice - exitPrice) * trade.quantity;

    return this.prisma.trade.update({
      where: { id: tradeId },
      data: {
        exitPrice,
        pnl,
        status: 'CLOSED',
        closedAt: new Date(),
      },
    });
  }

  async getUserTrades(userId: string, status?: string) {
    return this.prisma.trade.findMany({
      where: {
        userId,
        ...(status ? { status: status as any } : {}),
      },
      orderBy: { openedAt: 'desc' },
    });
  }

  async getOpenPositions(userId: string) {
    return this.prisma.trade.findMany({
      where: { userId, status: 'OPEN' },
      orderBy: { openedAt: 'desc' },
    });
  }

  async getPnlSummary(userId: string) {
    const trades = await this.prisma.trade.findMany({
      where: { userId, status: 'CLOSED' },
    });

    const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const wins = trades.filter((t) => (t.pnl || 0) > 0).length;
    const losses = trades.filter((t) => (t.pnl || 0) < 0).length;

    return {
      totalTrades: trades.length,
      totalPnl,
      wins,
      losses,
      winRate: trades.length > 0 ? (wins / trades.length) * 100 : 0,
    };
  }
}
