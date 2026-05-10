'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, ArrowLeft } from 'lucide-react';

const TIERS = [
  {
    name: 'Light',
    price: 0,
    period: 'forever',
    signals: '3/day',
    indicators: 3,
    features: ['3 signals/day', '3 basic indicators', 'Community access', 'Manual trading only'],
  },
  {
    name: 'Vision',
    price: 9,
    period: '/month',
    signals: '10/day',
    indicators: 5,
    features: ['10 signals/day', '5 indicators', 'Basic chart tools', 'Email alerts'],
  },
  {
    name: 'AI Trader',
    price: 49,
    period: '/month',
    signals: '50/day',
    indicators: 10,
    popular: true,
    features: ['50 signals/day', '10 indicators', 'Auto-execution', 'AI Strategy Builder', 'Priority support'],
  },
  {
    name: 'Elite',
    price: 149,
    period: '/month',
    signals: '200/day',
    indicators: 50,
    features: ['200 signals/day', '50 indicators', 'Copy trading', 'Priority signals', 'API access'],
  },
  {
    name: 'Hedge Fund',
    price: 679,
    period: '/month',
    signals: '1,000/day',
    indicators: 100,
    features: ['1,000 signals/day', '100 indicators', 'Multi-broker', 'White-label', 'Dedicated manager'],
  },
  {
    name: 'Ultra',
    price: 500,
    period: '/month',
    signals: '5,000/day',
    indicators: '200+',
    features: ['5,000 signals/day', '200+ indicators', 'Custom strategies', 'White-label broker rental', 'SLA support'],
  },
  {
    name: 'Institutional',
    price: 999,
    period: '/month',
    signals: 'Unlimited',
    indicators: 'All',
    features: ['Unlimited signals', 'All indicators', 'Custom integrations', 'Dedicated infrastructure', 'Enterprise SLA'],
  },
];

const SIGNAL_PASSES = [
  { type: 'Binary', duration: 'Hourly', price: 2 },
  { type: 'Binary', duration: 'Daily', price: 10 },
  { type: 'Binary', duration: 'Weekly', price: 45 },
  { type: 'Binary', duration: 'Monthly', price: 120 },
  { type: 'Scalping', duration: 'Hourly', price: 5 },
  { type: 'Scalping', duration: 'Daily', price: 25 },
  { type: 'Scalping', duration: 'Weekly', price: 100 },
  { type: 'Scalping', duration: 'Monthly', price: 300 },
  { type: 'Swing', duration: 'Daily', price: 15 },
  { type: 'Swing', duration: 'Weekly', price: 60 },
  { type: 'Swing', duration: 'Monthly', price: 180 },
];

export default function SubscriptionsPage() {
  const [tab, setTab] = useState<'tiers' | 'passes'>('tiers');

  return (
    <div className="min-h-screen bg-gradient-to-b from-latrux-darker to-latrux-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Pricing & Plans</h1>
            <p className="text-muted-foreground">Choose the plan that fits your trading style</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button
            variant={tab === 'tiers' ? 'gold' : 'outline'}
            onClick={() => setTab('tiers')}
          >
            Subscription Tiers
          </Button>
          <Button
            variant={tab === 'passes' ? 'gold' : 'outline'}
            onClick={() => setTab('passes')}
          >
            Signal Passes
          </Button>
        </div>

        {tab === 'tiers' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${tier.popular ? 'border-latrux-gold glow-gold' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-latrux-gold text-black text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">
                      ${tier.price}
                    </span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-latrux-gold" />
                      {tier.signals} signals
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-latrux-gold" />
                      {tier.indicators} indicators
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-latrux-green flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={tier.popular ? 'gold' : 'outline'}
                    className="w-full"
                  >
                    {tier.price === 0 ? 'Get Started Free' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIGNAL_PASSES.map((pass, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <Badge variant="gold">{pass.type}</Badge>
                      <Badge variant="secondary" className="ml-2">{pass.duration}</Badge>
                    </div>
                    <span className="text-2xl font-bold">${pass.price}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Buy Pass
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
