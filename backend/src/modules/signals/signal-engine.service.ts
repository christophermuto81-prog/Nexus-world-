import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface IndicatorData {
  rsi: number;
  macd: { value: number; signals: number; histogram: number };
  sma: number;
  ema: number;
  bollingerBands: { upper: number; middle: number; lower: number };
  stochastic: { k: number; d: number };
  currentPrice: number;
}

@Injectable()
export class SignalsEngine {
  private readonly logger = new Logger(SignalsEngine.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Rule-based signals generation using 5-indicator confluence.
   * >70 score → BUY, <30 → SELL
   */
  async generateSignals(instrumentId: string, data: IndicatorData) {
    let score = 50; // neutral

    // RSI
    if (data.rsi < 30) score += 15; // oversold → bullish
    else if (data.rsi > 70) score -= 15; // overbought → bearish

    // MACD
    if (data.macd.histogram > 0 && data.macd.value > data.macd.signals) score += 15;
    else if (data.macd.histogram < 0 && data.macd.value < data.macd.signals) score -= 15;

    // MA Crossover (EMA above SMA → bullish)
    if (data.ema > data.sma) score += 10;
    else if (data.ema < data.sma) score -= 10;

    // Bollinger Bands
    if (data.currentPrice <= data.bollingerBands.lower) score += 10;
    else if (data.currentPrice >= data.bollingerBands.upper) score -= 10;

    // Stochastic
    if (data.stochastic.k < 20 && data.stochastic.d < 20) score += 10;
    else if (data.stochastic.k > 80 && data.stochastic.d > 80) score -= 10;

    if (score <= 30 || score >= 70) {
      const direction = score >= 70 ? 'BUY' : 'SELL';
      const slMultiplier = direction === 'BUY' ? 0.98 : 1.02;
      const tpMultiplier = direction === 'BUY' ? 1.03 : 0.97;

      const signals = await this.prisma.signals.create({
        data: {
          instrumentId,
          type: 'SCALPING',
          direction,
          entryPrice: data.currentPrice,
          stopLoss: data.currentPrice * slMultiplier,
          takeProfit: data.currentPrice * tpMultiplier,
          confidence: Math.abs(score - 50) * 2,
          timeframe: '5m',
          expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
        },
      });

      this.logger.log(`Signals generated: ${direction} at ${data.currentPrice} (score: ${score})`);
      return signals;
    }

    return null;
  }
}
