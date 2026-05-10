'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X, TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const MOCK_PRICES: WatchlistItem[] = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', price: 42150.30, change: 850.20, changePercent: 2.06 },
  { symbol: 'ETHUSDT', name: 'Ethereum', price: 2280.45, change: -32.10, changePercent: -1.39 },
  { symbol: 'SOLUSDT', name: 'Solana', price: 98.72, change: 5.43, changePercent: 5.82 },
  { symbol: 'BNBUSDT', name: 'BNB', price: 312.80, change: 8.90, changePercent: 2.93 },
  { symbol: 'XRPUSDT', name: 'XRP', price: 0.6234, change: -0.0120, changePercent: -1.89 },
  { symbol: 'EURUSD', name: 'EUR/USD', price: 1.0892, change: 0.0023, changePercent: 0.21 },
  { symbol: 'XAUUSD', name: 'Gold', price: 2035.60, change: 12.40, changePercent: 0.61 },
];

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>(MOCK_PRICES);
  const [newSymbol, setNewSymbol] = useState('');

  const removeItem = (symbol: string) => {
    setItems(items.filter((i) => i.symbol !== symbol));
  };

  const addItem = () => {
    if (!newSymbol.trim()) return;
    const existing = items.find((i) => i.symbol === newSymbol.toUpperCase());
    if (existing) return;
    setItems([
      ...items,
      {
        symbol: newSymbol.toUpperCase(),
        name: newSymbol.toUpperCase(),
        price: Math.random() * 1000,
        change: (Math.random() - 0.5) * 50,
        changePercent: (Math.random() - 0.5) * 10,
      },
    ]);
    setNewSymbol('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Watchlist</h1>
          <p className="text-muted-foreground text-sm">Track your favorite instruments</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add symbol..."
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            className="w-40"
          />
          <Button variant="gold" size="icon" onClick={addItem}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <Card key={item.symbol} className="hover:border-latrux-gold/20 transition">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    item.change >= 0 ? 'bg-latrux-green/10' : 'bg-latrux-red/10'
                  }`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-latrux-green" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-latrux-red" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold">{item.symbol}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-mono font-medium text-lg">
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className={`text-sm font-mono ${
                      item.change >= 0 ? 'text-latrux-green' : 'text-latrux-red'
                    }`}>
                      {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.symbol)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
