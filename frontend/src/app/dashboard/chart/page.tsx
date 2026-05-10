'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];
const INDICATORS = ['RSI', 'MACD', 'SMA', 'EMA', 'Bollinger', 'Stochastic', 'Volume', 'ATR', 'ADX', 'OBV'];

export default function ChartPage() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(['RSI', 'MACD', 'SMA']);
  const [symbol, setSymbol] = useState('BTCUSDT');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    let chart: any = null;

    const initChart = async () => {
      try {
        const { createChart, ColorType, CrosshairMode } = await import('lightweight-charts');

        if (!chartContainerRef.current) return;

        chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: '#0F172A' },
            textColor: '#94A3B8',
          },
          grid: {
            vertLines: { color: '#1E293B' },
            horzLines: { color: '#1E293B' },
          },
          crosshair: { mode: CrosshairMode.Normal },
          rightPriceScale: { borderColor: '#1E293B' },
          timeScale: { borderColor: '#1E293B', timeVisible: true },
          width: chartContainerRef.current.clientWidth,
          height: 500,
        });

        const candleSeries = chart.addCandlestickSeries({
          upColor: '#10B981',
          downColor: '#EF4444',
          borderDownColor: '#EF4444',
          borderUpColor: '#10B981',
          wickDownColor: '#EF4444',
          wickUpColor: '#10B981',
        });

        // Generate sample candlestick data
        const now = Math.floor(Date.now() / 1000);
        const data: { time: number; open: number; high: number; low: number; close: number }[] = [];
        let price = symbol === 'BTCUSDT' ? 42000 : 2500;

        for (let i = 200; i >= 0; i--) {
          const time = now - i * 3600;
          const open = price + (Math.random() - 0.5) * price * 0.02;
          const high = open + Math.random() * price * 0.015;
          const low = open - Math.random() * price * 0.015;
          const close = low + Math.random() * (high - low);
          price = close;

          data.push({ time, open, high, low, close });
        }

        candleSeries.setData(data);

        // Add SMA if selected
        if (selectedIndicators.includes('SMA')) {
          const smaSeries = chart.addLineSeries({
            color: '#3B82F6',
            lineWidth: 1,
            priceLineVisible: false,
          });
          const smaData = data.map((d, i) => {
            if (i < 20) return null;
            const sum = data.slice(i - 20, i).reduce((s, c) => s + c.close, 0);
            return { time: d.time, value: sum / 20 };
          }).filter(Boolean);
          smaSeries.setData(smaData as any);
        }

        // Add EMA if selected
        if (selectedIndicators.includes('EMA')) {
          const emaSeries = chart.addLineSeries({
            color: '#F59E0B',
            lineWidth: 1,
            priceLineVisible: false,
          });
          const k = 2 / (12 + 1);
          let ema = data[0].close;
          const emaData = data.map((d) => {
            ema = d.close * k + ema * (1 - k);
            return { time: d.time, value: ema };
          });
          emaSeries.setData(emaData);
        }

        chart.timeScale().fitContent();

        const handleResize = () => {
          if (chartContainerRef.current && chart) {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (chart) chart.remove();
        };
      } catch (err) {
        console.error('Chart init error:', err);
      }
    };

    initChart();

    return () => {
      if (chart) chart.remove();
    };
  }, [symbol, selectedTimeframe, selectedIndicators]);

  const toggleIndicator = (ind: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind],
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">LatruxTrade Charts</h1>
          <p className="text-muted-foreground text-sm">Advanced charting with 10+ indicators</p>
        </div>
        <div className="flex items-center gap-2">
          {['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'EURUSD', 'XAUUSD'].map((s) => (
            <Button
              key={s}
              variant={symbol === s ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setSymbol(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex items-center gap-2">
        {TIMEFRAMES.map((tf) => (
          <Button
            key={tf}
            variant={selectedTimeframe === tf ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTimeframe(tf)}
          >
            {tf}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-0">
          <div ref={chartContainerRef} className="chart-container" />
        </CardContent>
      </Card>

      {/* Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {INDICATORS.map((ind) => (
              <Badge
                key={ind}
                variant={selectedIndicators.includes(ind) ? 'gold' : 'secondary'}
                className="cursor-pointer"
                onClick={() => toggleIndicator(ind)}
              >
                {ind}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
