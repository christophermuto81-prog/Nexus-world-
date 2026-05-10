'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTradingStore } from '@/store/trading-store';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { Bot, TrendingUp, TrendingDown, Clock, Target, ShieldAlert } from 'lucide-react';

export default function SignalsPage() {
  const { signals, fetchSignals, openTrade } = useTradingStore();
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetchSignals(filter || undefined);
  }, [fetchSignals, filter]);

  const handleExecute = async (signal: any) => {
    try {
      await openTrade({
        signalId: signal.id,
        instrument: signal.instrument?.symbol || 'UNKNOWN',
        direction: signal.direction,
        entryPrice: signal.entryPrice,
        quantity: 1,
        stopLoss: signal.stopLoss,
        takeProfit: signal.takeProfit,
      });
      alert('Trade opened successfully!');
    } catch (err: any) {
      alert(`Failed: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-latrux-gold" />
            AI Signal Feed
          </h1>
          <p className="text-muted-foreground text-sm">
            Real-time signals powered by 5-indicator confluence
          </p>
        </div>
        <div className="flex items-center gap-2">
          {['', 'BINARY', 'SCALPING', 'SWING'].map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
            >
              {type || 'All'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {signals.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Signals</h3>
              <p className="text-sm text-muted-foreground">
                Latrux AI is analyzing markets. Signals will appear here in real-time.
              </p>
            </CardContent>
          </Card>
        ) : (
          signals.map((signal) => (
            <Card key={signal.id} className="signal-card hover:border-latrux-gold/30">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        signal.direction === 'BUY'
                          ? 'bg-latrux-green/10 text-latrux-green'
                          : 'bg-latrux-red/10 text-latrux-red'
                      }`}
                    >
                      {signal.direction === 'BUY' ? (
                        <TrendingUp className="h-6 w-6" />
                      ) : (
                        <TrendingDown className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          {signal.instrument?.symbol || 'Unknown'}
                        </span>
                        <Badge variant={signal.direction === 'BUY' ? 'success' : 'danger'}>
                          {signal.direction}
                        </Badge>
                        <Badge variant="secondary">{signal.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {signal.timeframe}
                        </span>
                        <span>{timeAgo(signal.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-4 text-sm">
                        <span>
                          Entry: <span className="font-mono font-medium">{signal.entryPrice}</span>
                        </span>
                        <span className="text-latrux-red flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3" />
                          SL: {signal.stopLoss}
                        </span>
                        <span className="text-latrux-green flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          TP: {signal.takeProfit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-latrux-gold rounded-full"
                            style={{ width: `${signal.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono">{signal.confidence}%</span>
                      </div>
                    </div>

                    <Button
                      variant={signal.direction === 'BUY' ? 'success' : 'danger'}
                      size="sm"
                      onClick={() => handleExecute(signal)}
                    >
                      Execute
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
