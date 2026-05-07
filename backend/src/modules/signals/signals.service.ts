import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignalType } from '@prisma/client';

@Injectable()
export class SignalsService {
  constructor(private prisma: PrismaService) {}

  async getSignals(type?: SignalType, limit = 50) {
    return this.prisma.signal.findMany({
      where: {
        ...(type ? { type } : {}),
        status: 'ACTIVE',
      },
      include: { instrument: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getSignalById(id: string) {
    return this.prisma.signal.findUnique({
      where: { id },
      include: { instrument: true },
    });
  }

  async getRecentSignals(minutes = 60) {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    return this.prisma.signal.findMany({
      where: { createdAt: { gte: since } },
      include: { instrument: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSignalStats() {
    const total = await this.prisma.signal.count();
    const active = await this.prisma.signal.count({ where: { status: 'ACTIVE' } });
    const hitTp = await this.prisma.signal.count({ where: { status: 'HIT_TP' } });
    const hitSl = await this.prisma.signal.count({ where: { status: 'HIT_SL' } });
    return { total, active, hitTp, hitSl, winRate: total > 0 ? (hitTp / (hitTp + hitSl)) * 100 : 0 };
  }
}
