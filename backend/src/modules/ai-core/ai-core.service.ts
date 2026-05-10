import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiCoreService {
  constructor(private prisma: PrismaService) {}

  async getState() {
    let state = await this.prisma.aiCoreState.findFirst();
    if (!state) {
      state = await this.prisma.aiCoreState.create({ data: {} });
    }
    return state;
  }

  async updateState(data: {
    confluenceScore?: number;
    regimeId?: number;
    regimeConfidence?: number;
    aggressionLevel?: number;
    activeFilters?: number;
    brokerIntegrityAvg?: number;
    apexReConfidence?: number;
    lockdownMode?: boolean;
    consecutiveLosses?: number;
    consecutiveWins?: number;
    selfEvolutionCycle?: number;
    rollingSharpRatio?: number;
    maxDrawdownPct?: number;
  }) {
    const state = await this.getState();
    return this.prisma.aiCoreState.update({ where: { id: state.id }, data });
  }

  async getFilterHierarchy() {
    return {
      level4MetaSeers: ['Apex RE Filter', 'Failure Theory Engine', 'Preemptive Partner Signal Gate'],
      level3Seers: ['Bible Decoding Engine', 'Ephemeris Engine', 'Gann Engine', 'Tesla 3-6-9 Vibrational Key', 'Lucas Number Sequencer', 'Pythagorean Harmonics'],
      level2Sensors: ['Order Book Imbalance', 'Sentiment Aggregator', 'Fundamental Scanner', 'Broker Integrity Filter', 'News Impact', 'Social Pulse', 'Whale Tracker', 'Dark Pool Scanner', 'Options Flow', 'COT Report', 'Economic Calendar'],
      level1Executors: ['RSI', 'MACD', 'Bollinger Bands', 'EMA Cross', 'Fibonacci', 'Ichimoku', 'Volume Profile', 'ATR', 'Stochastic', 'ADX', 'Parabolic SAR', 'VWAP', 'Supertrend', 'Pivot Points'],
      totalActive: 54,
    };
  }

  async getConfluenceGauge() {
    const state = await this.getState();
    return {
      score: state.confluenceScore,
      level: state.confluenceScore >= 95 ? 'INSANE' : state.confluenceScore >= 80 ? 'EXTREME' : state.confluenceScore >= 60 ? 'HIGH' : state.confluenceScore >= 40 ? 'MODERATE' : 'LOW',
      filtersActive: state.activeFilters,
      regimeId: state.regimeId,
      regimeConfidence: state.regimeConfidence,
    };
  }

  async getAggressionLevels() {
    const state = await this.getState();
    return {
      current: state.aggressionLevel,
      levels: [
        { id: 1, name: 'Aggressive-Conservative', riskPct: 0.5, description: 'Minimum risk, maximum precision' },
        { id: 2, name: 'Aggressive-Moderate', riskPct: 2.0, description: 'Balanced aggression' },
        { id: 3, name: 'Aggressive-High', riskPct: 5.0, description: 'High conviction trades' },
        { id: 4, name: 'Aggressive-Maximum', riskPct: 10.0, description: 'Maximum aggression, hard cap' },
      ],
    };
  }

  async getRegimeDetector() {
    const state = await this.getState();
    return {
      currentRegime: state.regimeId,
      confidence: state.regimeConfidence,
      totalRegimes: 64,
      model: 'Hierarchical HMM',
    };
  }

  async getRollingSharpPanel() {
    const state = await this.getState();
    return { sharpeRatio: state.rollingSharpRatio, maxDrawdown: state.maxDrawdownPct, hardLock: 5.0 };
  }
}
