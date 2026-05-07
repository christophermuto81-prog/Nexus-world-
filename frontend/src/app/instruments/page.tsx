'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Layers, Check, Zap, Crown, Star, Sparkles, Eye } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface InstrumentsTier {
  id: string;
  name: string;
  displayName: string;
  price: number;
  symbolLimit: number;
  realTime: boolean;
  level2Data: boolean;
  description: string;
  features: string[];
}

const tierIcons: Record<string, React.ReactNode> = {
  INSTRUMENTS_FREE: <Eye className="h-6 w-6" />,
  INSTRUMENTS_STARTER: <Star className="h-6 w-6" />,
  INSTRUMENTS_STANDARD: <Zap className="h-6 w-6" />,
  INSTRUMENTS_PRO: <Crown className="h-6 w-6" />,
  INSTRUMENTS_ULTRA: <Sparkles className="h-6 w-6" />,
};

export default function InstrumentsPage() {
  const { token } = useAuthStore();
  const [tiers, setTiers] = useState<InstrumentsTier[]>([]);
  const [currentSub, setCurrentSub] = useState<{ tier: InstrumentsTier } | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/instruments/tiers`).then((r) => r.json()),
      token
        ? fetch(`${API}/api/instruments/subscription`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => r.json())
        : Promise.resolve(null),
    ]).then(([tiersData, subData]) => {
      setTiers(tiersData);
      setCurrentSub(subData);
      setLoading(false);
    });
  }, [token]);

  async function handleSubscribe(tierId: string) {
    if (!token) return;
    setSubscribing(tierId);
    try {
      await fetch(`${API}/api/instruments/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tierId }),
      });
      const sub = await fetch(`${API}/api/instruments/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());
      setCurrentSub(sub);
    } finally {
      setSubscribing(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-latrux-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Layers className="h-8 w-8 text-latrux-gold" />
          Global Instruments
        </h1>
        <p className="text-muted-foreground mt-1">
          Access global market data powered by FCS API — Forex, Crypto, Stocks, Commodities & more
        </p>
      </div>

      {currentSub && (
        <div className="bg-latrux-gold/10 border border-latrux-gold/30 rounded-xl p-4">
          <p className="text-sm text-latrux-gold font-medium">
            Current Plan: <span className="font-bold">{currentSub.tier.displayName}</span> —{' '}
            {currentSub.tier.symbolLimit.toLocaleString()} symbols
            {currentSub.tier.realTime ? ', Real-time' : ', Delayed'}
            {currentSub.tier.level2Data ? ', Level 2' : ''}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {tiers.map((tier) => {
          const isActive = currentSub?.tier.name === tier.name;
          return (
            <div
              key={tier.id}
              className={`relative rounded-xl border p-6 flex flex-col ${
                isActive
                  ? 'border-latrux-gold bg-latrux-gold/5'
                  : 'border-border/40 bg-latrux-dark hover:border-latrux-gold/50'
              } transition-colors`}
            >
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-latrux-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                  ACTIVE
                </div>
              )}

              <div className="text-latrux-gold mb-3">{tierIcons[tier.name]}</div>
              <h3 className="text-lg font-bold">{tier.displayName}</h3>
              <div className="mt-2">
                <span className="text-2xl font-bold">
                  ${tier.price === 0 ? 'Free' : tier.price}
                </span>
                {tier.price > 0 && <span className="text-muted-foreground text-sm">/mo</span>}
              </div>

              <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>

              <div className="mt-4 space-y-2 flex-1">
                <div className="text-sm font-medium">
                  {tier.symbolLimit >= 999999
                    ? 'Unlimited symbols'
                    : `${tier.symbolLimit.toLocaleString()} symbols`}
                </div>
                <div className="text-sm">
                  {tier.realTime ? (
                    <span className="text-green-400">● Real-time data</span>
                  ) : (
                    <span className="text-yellow-400">● Delayed data</span>
                  )}
                </div>
                {tier.level2Data && (
                  <div className="text-sm text-blue-400">● Level 2 market data</div>
                )}
                <ul className="space-y-1 mt-3">
                  {tier.features.map((f, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="h-3 w-3 text-latrux-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={isActive || subscribing === tier.id}
                className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-latrux-gold/20 text-latrux-gold cursor-not-allowed'
                    : 'bg-latrux-gold text-black hover:bg-latrux-gold/90'
                }`}
              >
                {isActive ? 'Current Plan' : subscribing === tier.id ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-latrux-dark rounded-xl border border-border/40 p-6">
        <h2 className="text-xl font-bold mb-4">Supported Markets</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Forex (200+ pairs)', 'Crypto (1000+ coins)', 'Stocks (50K+ tickers)', 'Commodities (100+ contracts)', 'Indices (50+ global)'].map(
            (market) => (
              <div key={market} className="bg-secondary/50 rounded-lg p-3 text-center text-sm">
                {market}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
