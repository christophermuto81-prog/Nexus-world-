'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth-store';
import { useTradingStore } from '@/store/trading-store';
import { formatCurrency, formatPercent, timeAgo } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { signals, positions, pnl, fetchSignals, fetchPositions, fetchPnl } = useTradingStore();

  useEffect(() => {
    fetchSignals();
    fetchPositions();
    fetchPnl();
  }, [fetchSignals, fetchPositions, fetchPnl]);

  const stats = [
    {
      title: 'Open Positions',
      value: positions.length.toString(),
      icon: <Activity className="h-5 w-5 text-latrux-blue" />,
      change: null,
    },
    {
      title: 'Total P&L',
      value: formatCurrency(pnl?.totalPnl || 0),
      icon: <TrendingUp className="h-5 w-5 text-latrux-green" />,
      change: pnl?.totalPnl ? formatPercent((pnl.totalPnl / 10000) * 100) : null,
    },
    {
      title: 'Win Rate',
      value: `${(pnl?.winRate || 0).toFixed(1)}%`,
      icon: <BarChart3 className="h-5 w-5 text-latrux-gold" />,
      change: null,
    },
    {
      title: 'Active Signals',
      value: signals.filter((s) => s.status === 'ACTIVE').length.toString(),
      icon: <Wallet className="h-5 w-5 text-latrux-purple" />,
      change: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name || 'Trader'}
        </h1>
        <p className="text-muted-foreground">Here&apos;s your trading overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className={`text-xs mt-1 ${
                      stat.change.startsWith('+') ? 'text-latrux-green' : 'text-latrux-red'
                    }`}>
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Signals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {signals.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No active signals. They will appear here in real-time.
                </p>
              ) : (
                signals.slice(0, 5).map((signal) => (
                  <div
                    key={signal.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 signal-card"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={signal.direction === 'BUY' ? 'success' : 'danger'}>
                        {signal.direction}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">
                          {signal.instrument?.symbol || 'Unknown'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {signal.timeframe} | {signal.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono">{signal.entryPrice}</p>
                      <p className="text-xs text-muted-foreground">
                        {signal.confidence}% conf
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {positions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No open positions. Execute a signal to start paper trading.
                </p>
              ) : (
                positions.slice(0, 5).map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      {trade.direction === 'BUY' ? (
                        <TrendingUp className="h-4 w-4 text-latrux-green" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-latrux-red" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{trade.instrument}</p>
                        <p className="text-xs text-muted-foreground">
                          {trade.direction} @ {trade.entryPrice}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono">
                        Qty: {trade.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {timeAgo(trade.openedAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
