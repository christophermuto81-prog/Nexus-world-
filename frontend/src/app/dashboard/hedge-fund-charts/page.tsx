'use client';

import { useEffect, useState } from 'react';

interface PerformanceData {
  date: string;
  cumulativeReturn: number;
  benchmark: number;
  drawdown: number;
}

const COLORS = {
  navy: '#0a0f1a',
  gold: '#d4a853',
  emerald: '#2ecc71',
  white: '#ffffff',
  muted: '#94A3B8',
  cardBg: '#111827',
  red: '#ef4444',
};

function generateMockData(): PerformanceData[] {
  const data: PerformanceData[] = [];
  let cumReturn = 0;
  let benchmark = 0;
  let peak = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() + i);
    cumReturn += (Math.random() - 0.42) * 0.8;
    benchmark += (Math.random() - 0.45) * 0.6;
    peak = Math.max(peak, cumReturn);
    const drawdown = peak > 0 ? ((cumReturn - peak) / peak) * 100 : 0;

    data.push({
      date: date.toISOString().split('T')[0],
      cumulativeReturn: Math.round(cumReturn * 100) / 100,
      benchmark: Math.round(benchmark * 100) / 100,
      drawdown: Math.round(drawdown * 100) / 100,
    });
  }
  return data;
}

const ALLOCATION = [
  { name: 'Forex Majors', pct: 35, color: COLORS.gold },
  { name: 'Crypto', pct: 25, color: COLORS.emerald },
  { name: 'Indices', pct: 15, color: '#3B82F6' },
  { name: 'Commodities', pct: 12, color: '#8B5CF6' },
  { name: 'Binary Options', pct: 8, color: '#EC4899' },
  { name: 'Cash Reserve', pct: 5, color: COLORS.muted },
];

const RISK_RETURN = [
  { name: 'Latrux AI', risk: 8.2, ret: 42.5 },
  { name: 'S&P 500', risk: 15.1, ret: 12.3 },
  { name: 'BTC', risk: 55.0, ret: 28.0 },
  { name: 'Gold', risk: 12.0, ret: 8.5 },
  { name: 'Hedge Fund Avg', risk: 10.5, ret: 15.2 },
];

export default function HedgeFundChartsPage() {
  const [data, setData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    setData(generateMockData());
  }, []);

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4a853] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const maxReturn = Math.max(...data.map((d) => Math.max(d.cumulativeReturn, d.benchmark)));
  const minReturn = Math.min(...data.map((d) => Math.min(d.cumulativeReturn, d.benchmark)));
  const maxDD = Math.min(...data.map((d) => d.drawdown));
  const range = maxReturn - minReturn || 1;
  const ddRange = Math.abs(maxDD) || 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Professional Hedge Fund Charts</h1>
        <p className="text-sm text-[#94A3B8]">Five C&apos;s Design &mdash; Clarity, Consistency, Context, Completeness, Correctness</p>
      </div>

      {/* Cumulative Return vs Benchmark */}
      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-6">
        <h2 className="text-lg font-semibold text-[#d4a853] mb-4">Cumulative Return vs. Benchmark</h2>
        <div className="relative h-64 w-full">
          <svg viewBox={`0 0 ${data.length} 200`} className="w-full h-full" preserveAspectRatio="none">
            {/* Latrux AI line */}
            <polyline
              fill="none"
              stroke={COLORS.gold}
              strokeWidth="1.5"
              points={data.map((d, i) => `${i},${200 - ((d.cumulativeReturn - minReturn) / range) * 180 - 10}`).join(' ')}
            />
            {/* Benchmark line */}
            <polyline
              fill="none"
              stroke={COLORS.muted}
              strokeWidth="1"
              strokeDasharray="4,2"
              points={data.map((d, i) => `${i},${200 - ((d.benchmark - minReturn) / range) * 180 - 10}`).join(' ')}
            />
          </svg>
          <div className="absolute bottom-0 left-0 flex gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-[#d4a853] inline-block" /> Latrux AI
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-[#94A3B8] inline-block border-dashed" /> Benchmark
            </span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
          <span>{data[0]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </div>

      {/* Drawdown Profile */}
      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-6">
        <h2 className="text-lg font-semibold text-[#d4a853] mb-4">Drawdown Profile</h2>
        <div className="relative h-48 w-full">
          <svg viewBox={`0 0 ${data.length} 200`} className="w-full h-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={COLORS.red}
              strokeWidth="1.5"
              points={data.map((d, i) => `${i},${(Math.abs(d.drawdown) / ddRange) * 180 + 10}`).join(' ')}
            />
            {/* 5% max drawdown line */}
            <line
              x1="0"
              y1={(5 / ddRange) * 180 + 10}
              x2={data.length}
              y2={(5 / ddRange) * 180 + 10}
              stroke={COLORS.gold}
              strokeWidth="1"
              strokeDasharray="6,3"
            />
          </svg>
          <div className="absolute top-2 right-2 text-xs text-[#d4a853]">5% Max Drawdown Hard Lock</div>
        </div>
      </div>

      {/* Risk-Return Scatter + Portfolio Allocation side by side */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Risk-Return Scatter Plot */}
        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-6">
          <h2 className="text-lg font-semibold text-[#d4a853] mb-4">Risk-Return Scatter Plot</h2>
          <div className="relative h-64 w-full">
            <svg viewBox="0 0 300 250" className="w-full h-full">
              {/* Axes */}
              <line x1="40" y1="210" x2="290" y2="210" stroke={COLORS.muted} strokeWidth="0.5" />
              <line x1="40" y1="10" x2="40" y2="210" stroke={COLORS.muted} strokeWidth="0.5" />
              <text x="160" y="240" textAnchor="middle" fill={COLORS.muted} fontSize="10">Risk (Volatility %)</text>
              <text x="15" y="110" textAnchor="middle" fill={COLORS.muted} fontSize="10" transform="rotate(-90,15,110)">Return %</text>
              {RISK_RETURN.map((item, idx) => {
                const x = 40 + (item.risk / 60) * 240;
                const y = 210 - (item.ret / 50) * 190;
                const isLatrux = item.name === 'Latrux AI';
                return (
                  <g key={idx}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isLatrux ? 8 : 5}
                      fill={isLatrux ? COLORS.gold : COLORS.muted}
                      opacity={isLatrux ? 1 : 0.6}
                    />
                    <text x={x + 10} y={y + 4} fill={isLatrux ? COLORS.gold : COLORS.muted} fontSize="9">{item.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Portfolio Allocation Treemap */}
        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-6">
          <h2 className="text-lg font-semibold text-[#d4a853] mb-4">Portfolio Allocation</h2>
          <div className="space-y-2">
            {ALLOCATION.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">{item.name}</span>
                  <span style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="h-6 bg-[#1e293b] rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sharpe Ratio', value: '2.84', color: COLORS.emerald },
          { label: 'Max Drawdown', value: '-3.2%', color: COLORS.red },
          { label: 'Win Rate', value: '73.8%', color: COLORS.gold },
          { label: 'Sortino Ratio', value: '4.12', color: COLORS.emerald },
        ].map((metric) => (
          <div key={metric.label} className="rounded-xl border border-[#1e293b] bg-[#111827] p-4 text-center">
            <p className="text-xs text-[#94A3B8]">{metric.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: metric.color }}>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
