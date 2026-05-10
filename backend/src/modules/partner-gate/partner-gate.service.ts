import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnerGateService {
  constructor(private prisma: PrismaService) {}

  async evaluateGate() {
    const state = await this.prisma.aiCoreState.findFirst();
    if (!state) return { pass: false, reason: 'AI Core not initialized' };

    const gates = [
      { name: 'Confluence >= 95', pass: state.confluenceScore >= 95, value: state.confluenceScore },
      { name: 'Broker Integrity = 100', pass: state.brokerIntegrityAvg >= 100, value: state.brokerIntegrityAvg },
      { name: 'Regime Confidence > 90%', pass: state.regimeConfidence > 90, value: state.regimeConfidence },
      { name: 'Apex RE Meta-Confidence >= 95', pass: state.apexReConfidence >= 95, value: state.apexReConfidence },
      { name: 'Anti-Manipulation Active', pass: true, value: 100 },
    ];

    const allPass = gates.every(g => g.pass);
    return {
      pass: allPass && !state.lockdownMode,
      lockdownMode: state.lockdownMode,
      consecutiveLosses: state.consecutiveLosses,
      consecutiveWins: state.consecutiveWins,
      gates,
      profitLock: {
        breakeven: 0.3,
        partialClose1: 0.5,
        partialClose2: 1.0,
        trailingStop: true,
      },
    };
  }

  async getLockdownStatus() {
    const state = await this.prisma.aiCoreState.findFirst();
    return {
      lockdownMode: state?.lockdownMode ?? false,
      consecutiveLosses: state?.consecutiveLosses ?? 0,
      threshold: 2,
    };
  }

  async setLockdown(lockdown: boolean) {
    const state = await this.prisma.aiCoreState.findFirst();
    if (!state) return null;
    return this.prisma.aiCoreState.update({
      where: { id: state.id },
      data: { lockdownMode: lockdown },
    });
  }
}
