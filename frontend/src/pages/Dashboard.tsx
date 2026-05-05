import StatCard from '../components/StatCard'
import EngineCard from '../components/EngineCard'
import LiveFeed from '../components/LiveFeed'
import { engines } from '../data/engines'
import { covenant } from '../data/covenant'

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-surface via-nexus-card to-nexus-surface border border-nexus-border p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.08),transparent_60%)]" />
        <div className="relative">
          <h1 className="font-display text-2xl md:text-4xl font-bold tracking-wide">
            <span className="gradient-text">NEXUS WORLD</span>
          </h1>
          <p className="text-nexus-muted mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            The Planet of Wealth. A complete digital ecosystem where you can trade, play, learn,
            build, and connect — powered by the God Core AI and the NEX token on Solana.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-3 py-1.5 rounded-full bg-nexus-cyan/10 border border-nexus-cyan/20 text-nexus-cyan text-xs font-medium">
              15 Engines Active
            </span>
            <span className="px-3 py-1.5 rounded-full bg-nexus-purple/10 border border-nexus-purple/20 text-nexus-purple text-xs font-medium">
              53-Filter AI Brain
            </span>
            <span className="px-3 py-1.5 rounded-full bg-nexus-green/10 border border-nexus-green/20 text-nexus-green text-xs font-medium">
              NEX on Solana
            </span>
            <span className="px-3 py-1.5 rounded-full bg-nexus-gold/10 border border-nexus-gold/20 text-nexus-gold text-xs font-medium">
              Eternal Ledger
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="👥" label="Active Users" value="14,892" change="12.3%" positive />
        <StatCard icon="📊" label="Signals Today" value="1,247" change="8.7%" positive />
        <StatCard icon="💎" label="NEX Price" value="$0.0847" change="2.4%" positive />
        <StatCard icon="🎮" label="Live Games" value="342" change="5.1%" positive />
      </div>

      {/* God Core Status */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-nexus-cyan/10 border border-nexus-cyan/20 flex items-center justify-center animate-pulse-glow">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <h2 className="font-display text-sm font-bold tracking-wide text-white">
              NEXUS AI ENGINEER — GOD CORE
            </h2>
            <p className="text-xs text-nexus-muted">53-Filter Brain &bull; Self-Expansion &bull; IP Protection &bull; Eternal Ledger</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-nexus-green/10 border border-nexus-green/20">
            <div className="w-2 h-2 rounded-full bg-nexus-green animate-pulse" />
            <span className="text-xs text-nexus-green font-mono font-medium">OPERATIONAL</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Active Filters</p>
            <p className="text-lg font-display font-bold text-nexus-cyan">53 / 53</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Confluence Score</p>
            <p className="text-lg font-display font-bold text-nexus-green">87.4%</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Self-Expansion</p>
            <p className="text-lg font-display font-bold text-nexus-purple">Active</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Sentinel Shield</p>
            <p className="text-lg font-display font-bold text-nexus-gold">Engaged</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Engines + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engines Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold tracking-wider text-white">ENGINES</h2>
            <span className="text-xs text-nexus-muted font-mono">15 modules</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {engines.map((engine) => (
              <EngineCard key={engine.id} engine={engine} />
            ))}
          </div>
        </div>

        {/* Right Column: Live Feed + Cross-Cutting */}
        <div className="space-y-4">
          <LiveFeed />

          {/* Cross-Cutting Layers */}
          <div className="bg-nexus-card border border-nexus-border rounded-xl p-4">
            <h3 className="font-display text-sm font-bold tracking-wide text-white mb-3">
              Cross-Cutting Layers
            </h3>
            <div className="space-y-2">
              {[
                { icon: '💎', name: 'NEX Token (SOL)', status: 'Active', color: 'text-nexus-gold' },
                { icon: '💰', name: 'Internal Wallet', status: 'Connected', color: 'text-nexus-green' },
                { icon: '📡', name: 'Event Bus (Redis)', status: 'Streaming', color: 'text-nexus-cyan' },
                { icon: '🛡️', name: 'Signal Protect', status: 'Engaged', color: 'text-nexus-purple' },
                { icon: '👁️', name: 'Sentinel Stealth', status: 'Masking', color: 'text-nexus-orange' },
                { icon: '🔒', name: 'Hidden Activity', status: 'Secured', color: 'text-nexus-pink' },
              ].map((layer) => (
                <div key={layer.name} className="flex items-center justify-between p-2.5 rounded-lg bg-nexus-surface/50 border border-nexus-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{layer.icon}</span>
                    <span className="text-xs text-nexus-text">{layer.name}</span>
                  </div>
                  <span className={`text-xs font-mono ${layer.color}`}>{layer.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Covenant Summary */}
          <div className="bg-nexus-card border border-nexus-border rounded-xl p-4">
            <h3 className="font-display text-sm font-bold tracking-wide text-white mb-3">
              The Covenant
            </h3>
            <div className="space-y-2">
              {covenant.slice(0, 3).map((article) => (
                <div key={article.number} className="p-2.5 rounded-lg bg-nexus-surface/50 border border-nexus-border/50">
                  <p className="text-xs font-display text-nexus-cyan mb-0.5">
                    Article {article.number}: {article.title}
                  </p>
                  <p className="text-[10px] text-nexus-muted leading-relaxed">{article.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
