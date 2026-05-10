import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrokerIntegrityService {
  constructor(private prisma: PrismaService) {}

  async getBrokerScores() {
    return this.prisma.broker.findMany({
      select: { id: true, name: true, integrityScore: true, status: true, _count: { select: { integrityLogs: true } } },
      orderBy: { integrityScore: 'desc' },
    });
  }

  async getIntegrityLogs(brokerId: string) {
    return this.prisma.brokerIntegrityLog.findMany({
      where: { brokerId },
      orderBy: { detectedAt: 'desc' },
      take: 100,
    });
  }

  async logIntegrityEvent(brokerId: string, metric: string, value: number, severity: string, action?: string) {
    const log = await this.prisma.brokerIntegrityLog.create({
      data: { brokerId, metric, value, severity, action },
    });

    const avg = await this.prisma.brokerIntegrityLog.aggregate({
      where: { brokerId },
      _avg: { value: true },
    });

    const newScore = Math.max(0, Math.min(100, 100 - (avg._avg.value ?? 0)));
    await this.prisma.broker.update({ where: { id: brokerId }, data: { integrityScore: newScore } });

    return log;
  }

  async getMonitoredMetrics() {
    return [
      'Price-Feed Deviation', 'Fill-Rate Asymmetry', 'Expiry-Time Price Clustering',
      'Spread-Widening Spikes', 'Selective Requote Patterns', 'Latency Manipulation',
    ];
  }

  async updateThreshold(brokerId: string, threshold: number) {
    const broker = await this.prisma.broker.findUnique({ where: { id: brokerId } });
    if (broker && broker.integrityScore < threshold) {
      await this.prisma.broker.update({ where: { id: brokerId }, data: { status: 'SUSPENDED' } });
    }
    return { brokerId, threshold, status: 'updated' };
  }
}
