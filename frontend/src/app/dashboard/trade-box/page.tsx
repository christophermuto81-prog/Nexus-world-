'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTradingStore } from '@/store/trading-store';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { TrendingUp, TrendingDown, X } from 'lucide-react';

export default function TradeBoxPage() {
  const { positions, trades, pnl, fetchPositions, fetchTrades, fetchPnl, openTrade, closeTrade } =
    useTradingStore();
  const [instrument, setInstrument] = useState('BTCUSDT');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState('1');
  const [entryPrice, setEntryPrice] = useState('42000');
  const [stopLoss, setSl] = useState('');
  const [takeProfit, setTp] = useState('');

  useEffect(() => {
    fetchPositions();
    fetchTrades();
    fetchPnl();
  }, [fetchPositions, fetchTrades, fetchPnl]);

  const handleOpenTrade = async () => {
    try {
      await openTrade({
        instrument,
        direction,
        entryPrice: parseFloat(entryPrice),
        quantity: parseFloat(quantity),
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCloseTrade = async (tradeId: string) => {
    const exitPrice = prompt('Enter exit price:');
    if (!exitPrice) return;
    try {
      await closeTrade(tradeId, parseFloat(exitPrice));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trade Box (Paper Trading)</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* New Trade Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Open Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Instrument</label>
              <Input value={instrument} onChange={(e) => setInstrument(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Direction</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={direction === 'BUY' ? 'success' : 'outline'}
                  onClick={() => setDirection('BUY')}
                >
                  <TrendingUp className="h-4 w-4 mr-1" /> BUY
                </Button>
                <Button
                  variant={direction === 'SELL' ? 'danger' : 'outline'}
                  onClick={() => setDirection('SELL')}
                >
                  <TrendingDown className="h-4 w-4 mr-1" /> SELL
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Entry Price</label>
                <Input value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} type="number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stop Loss</label>
                <Input value={stopLoss} onChange={(e) => setSl(e.target.value)} type="number" placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Take Profit</label>
                <Input value={takeProfit} onChange={(e) => setTp(e.target.value)} type="number" placeholder="Optional" />
              </div>
            </div>
            <Button variant="gold" className="w-full" onClick={handleOpenTrade}>
              Open Paper Trade
            </Button>
          </CardContent>
        </Card>

        {/* P&L Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">P&L Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total P&L</span>
                <span className={`text-xl font-bold font-mono ${
                  (pnl?.totalPnl || 0) >= 0 ? 'text-latrux-green' : 'text-latrux-red'
                }`}>
                  {formatCurrency(pnl?.totalPnl || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Trades</span>
                <span className="font-mono">{pnl?.totalTrades || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Wins</span>
                <span className="font-mono text-latrux-green">{pnl?.wins || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Losses</span>
                <span className="font-mono text-latrux-red">{pnl?.losses || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="font-mono text-latrux-gold">{(pnl?.winRate || 0).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Open Positions ({positions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {positions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No open positions</p>
              ) : (
                positions.map((pos) => (
                  <div key={pos.id} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={pos.direction === 'BUY' ? 'success' : 'danger'}>
                          {pos.direction}
                        </Badge>
                        <span className="text-sm font-medium">{pos.instrument}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleCloseTrade(pos.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Entry: {pos.entryPrice}</span>
                      <span>Qty: {pos.quantity}</span>
                      <span>{timeAgo(pos.openedAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Instrument</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Direction</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">Entry</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">Exit</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">P&L</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {trades.filter((t) => t.status === 'CLOSED').map((t) => (
                  <tr key={t.id} className="border-b border-border/50">
                    <td className="py-2 px-3 font-medium">{t.instrument}</td>
                    <td className="py-2 px-3">
                      <Badge variant={t.direction === 'BUY' ? 'success' : 'danger'} className="text-xs">
                        {t.direction}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-right font-mono">{t.entryPrice}</td>
                    <td className="py-2 px-3 text-right font-mono">{t.exitPrice || '-'}</td>
                    <td className={`py-2 px-3 text-right font-mono ${
                      (t.pnl || 0) >= 0 ? 'text-latrux-green' : 'text-latrux-red'
                    }`}>
                      {formatCurrency(t.pnl || 0)}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <Badge variant="secondary" className="text-xs">{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
