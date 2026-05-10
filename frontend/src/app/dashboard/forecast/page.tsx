'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface ForecastResult {
  predictedPrice: number;
  predictedTime: string;
  direction: 'UP' | 'DOWN';
  confidence: number;
  targets: { price: number; probability: number }[];
}

export default function ForecastPage() {
  const [instrument, setInstrument] = useState('BTCUSDT');
  const [timeframe, setTimeframe] = useState('4h');
  const [baseType, setBaseType] = useState<'HH' | 'LL'>('HH');
  const [basePrice, setBasePrice] = useState('42000');
  const [result, setResult] = useState<ForecastResult | null>(null);

  const calculateForecast = () => {
    const base = parseFloat(basePrice);
    if (isNaN(base)) return;

    const volatility = 0.02 + Math.random() * 0.03;
    const direction = baseType === 'HH' ? 'UP' : 'DOWN';
    const multiplier = direction === 'UP' ? 1 + volatility : 1 - volatility;
    const predicted = base * multiplier;

    const timeMultipliers: Record<string, number> = { '1h': 1, '4h': 4, '1D': 24, '1W': 168 };
    const hours = timeMultipliers[timeframe] || 4;
    const predictedTime = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

    setResult({
      predictedPrice: predicted,
      predictedTime,
      direction,
      confidence: 60 + Math.random() * 30,
      targets: [
        { price: base * (direction === 'UP' ? 1.01 : 0.99), probability: 85 },
        { price: base * (direction === 'UP' ? 1.02 : 0.98), probability: 65 },
        { price: base * (direction === 'UP' ? 1.05 : 0.95), probability: 35 },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-latrux-gold" />
          Manual Forecast Calculator
        </h1>
        <p className="text-muted-foreground text-sm">
          Price and time prediction based on higher highs / lower lows
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
            <CardDescription>Configure your forecast analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Instrument</label>
              <Input value={instrument} onChange={(e) => setInstrument(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <div className="flex gap-2">
                {['1h', '4h', '1D', '1W'].map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? 'gold' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Structure</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={baseType === 'HH' ? 'success' : 'outline'}
                  onClick={() => setBaseType('HH')}
                >
                  <TrendingUp className="h-4 w-4 mr-1" /> Higher High (HH)
                </Button>
                <Button
                  variant={baseType === 'LL' ? 'danger' : 'outline'}
                  onClick={() => setBaseType('LL')}
                >
                  <TrendingDown className="h-4 w-4 mr-1" /> Lower Low (LL)
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Price</label>
              <Input
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                type="number"
              />
            </div>
            <Button variant="gold" className="w-full" onClick={calculateForecast}>
              Calculate Forecast
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-latrux-gold/30 glow-gold">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-latrux-gold" />
                Forecast Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Predicted Price</p>
                <p className={`text-4xl font-bold font-mono ${
                  result.direction === 'UP' ? 'text-latrux-green' : 'text-latrux-red'
                }`}>
                  {result.predictedPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <Badge
                  variant={result.direction === 'UP' ? 'success' : 'danger'}
                  className="mt-2"
                >
                  {result.direction === 'UP' ? '↑' : '↓'} {result.direction}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Predicted Time
                  </span>
                  <span className="font-mono">
                    {new Date(result.predictedTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-mono text-latrux-gold">
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Price Targets</p>
                {result.targets.map((target, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-mono">
                      {target.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-latrux-gold rounded-full"
                          style={{ width: `${target.probability}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">
                        {target.probability}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
