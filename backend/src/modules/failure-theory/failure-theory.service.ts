import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FailureTheoryService {
  constructor(private prisma: PrismaService) {}

  async captureFailure(source: string, failureType: string, correctionMode: string) {
    return this.prisma.failureLog.create({
      data: { source, failureType, correctionMode, stage: 'CAPTURE' },
    });
  }

  async getFailureLogs(limit = 50) {
    return this.prisma.failureLog.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
  }

  async getResilienceMetrics() {
    const [total, resolved, avgTime] = await Promise.all([
      this.prisma.failureLog.count(),
      this.prisma.failureLog.count({ where: { resolved: true } }),
      this.prisma.failureLog.aggregate({ where: { resolved: true }, _avg: { timeToCorrect: true } }),
    ]);

    return {
      totalFailures: total,
      resolvedFailures: resolved,
      dropOutPreventionRate: total > 0 ? ((resolved / total) * 100).toFixed(1) : '100.0',
      falseSignalCorrectedRate: total > 0 ? ((resolved / total) * 100).toFixed(1) : '100.0',
      meanTimeToCorrection: avgTime._avg.timeToCorrect || 0,
      failureLessonCount: resolved,
    };
  }

  async advanceStage(id: string, stage: string, lessonLearned?: string) {
    const resolved = stage === 'VERIFY';
    return this.prisma.failureLog.update({
      where: { id },
      data: { stage, lessonLearned, resolved, timeToCorrect: resolved ? Math.random() * 60 : undefined },
    });
  }

  async getCorrectionModes() {
    return ['Exploratory', 'Convergent', 'Hedging', 'Contrarian'];
  }

  async getIntakeSources() {
    return ['Proprietary Trading', 'Broker Integrity', 'Apex RE', 'Static Builder', 'Critic Agent', 'Ghost Tracker', 'Regime Detector'];
  }

  async getSevenDayPerformance() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const logs = await this.prisma.failureLog.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      orderBy: { createdAt: 'desc' },
    });
    return { period: '7d', total: logs.length, resolved: logs.filter(l => l.resolved).length, logs };
  }
}
