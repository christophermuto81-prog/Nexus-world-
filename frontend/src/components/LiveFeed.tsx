import { useState, useEffect } from 'react'

interface FeedItem {
  id: number;
  type: 'trade' | 'game' | 'signal' | 'wallet' | 'academy';
  message: string;
  time: string;
}

const feedTemplates: Omit<FeedItem, 'id' | 'time'>[] = [
  { type: 'trade', message: 'EUR/USD long signal fired — 53-filter confluence at 87%' },
  { type: 'game', message: 'Semi-Truck Championship: 342 active players' },
  { type: 'signal', message: 'BTC breakout detected on 15m chart — ARES scanning' },
  { type: 'wallet', message: 'NEX/SOL price: 0.0847 SOL (+2.4%)' },
  { type: 'academy', message: 'New course: Advanced Options Strategy — Faculty of Finance' },
  { type: 'trade', message: 'GBP/JPY swing signal — take profit hit at +142 pips' },
  { type: 'game', message: 'Rescue Helicopter tournament starting in 5 minutes' },
  { type: 'signal', message: 'Gold approaching key resistance — 4H filter aligned' },
  { type: 'wallet', message: '12,847 NEX tokens burned this hour' },
  { type: 'academy', message: 'Talent Box: 23 new verified developer profiles today' },
  { type: 'trade', message: 'Signal Protect activated — broker pattern masking engaged' },
  { type: 'game', message: 'Bull Riding: new record — 9.2 seconds by rider_nexus_42' },
]

const typeColors: Record<string, string> = {
  trade: 'text-nexus-green',
  game: 'text-nexus-purple',
  signal: 'text-nexus-cyan',
  wallet: 'text-nexus-gold',
  academy: 'text-nexus-blue',
}

const typeIcons: Record<string, string> = {
  trade: '📊',
  game: '🎮',
  signal: '🧠',
  wallet: '💰',
  academy: '🎓',
}

export default function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>([])

  useEffect(() => {
    const initial = feedTemplates.slice(0, 5).map((t, i) => ({
      ...t,
      id: i,
      time: 'just now',
    }))
    setItems(initial)

    let counter = 5
    const interval = setInterval(() => {
      const template = feedTemplates[counter % feedTemplates.length]
      setItems(prev => [{
        ...template,
        id: counter,
        time: 'just now',
      }, ...prev.slice(0, 7)])
      counter++
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-nexus-card border border-nexus-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-bold tracking-wide text-white">Live Feed</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-nexus-green animate-pulse" />
          <span className="text-xs text-nexus-green font-mono">STREAMING</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 p-2 rounded-lg bg-nexus-surface/50 border border-nexus-border/50 animate-[fadeIn_0.3s_ease]"
          >
            <span className="text-sm mt-0.5">{typeIcons[item.type]}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-xs leading-relaxed ${typeColors[item.type]}`}>
                {item.message}
              </p>
              <p className="text-[10px] text-nexus-muted mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
