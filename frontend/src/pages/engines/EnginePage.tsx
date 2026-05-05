import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { engines } from '../../data/engines'

export default function EnginePage() {
  const { slug } = useParams<{ slug: string }>()
  const engine = engines.find(e => e.slug === slug)
  const activeUsers = useMemo(() => Math.floor(Math.random() * 5000) + 500, [slug])

  if (!engine) {
    return (
      <div className="p-6 text-center">
        <h2 className="font-display text-xl text-white">Engine Not Found</h2>
        <Link to="/" className="text-nexus-cyan text-sm mt-2 inline-block">Return to Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-surface via-nexus-card to-nexus-surface border border-nexus-border p-6 md:p-8">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 30% 50%, ${engine.color}10, transparent 60%)` }}
        />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-nexus-muted hover:text-nexus-cyan transition-colors mb-4">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ backgroundColor: `${engine.color}15`, border: `1px solid ${engine.color}30` }}
            >
              {engine.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-nexus-muted bg-nexus-surface px-2 py-0.5 rounded-md">
                  Engine #{engine.id.toString().padStart(2, '0')}
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white">
                {engine.name}
              </h1>
              <p className="text-sm mt-1" style={{ color: engine.color }}>{engine.subtitle}</p>
            </div>
          </div>
          <p className="text-sm text-nexus-muted mt-4 max-w-2xl leading-relaxed">
            {engine.description}
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <h2 className="font-display text-sm font-bold tracking-wider text-white mb-4">CAPABILITIES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {engine.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-nexus-surface/50 border border-nexus-border/50">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0"
                style={{ backgroundColor: `${engine.color}15`, color: engine.color }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-nexus-text">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Tiers */}
      {engine.pricingTiers && engine.pricingTiers.length > 0 && (
        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-white mb-4">SUBSCRIPTION TIERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {engine.pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-nexus-card border rounded-xl p-5 transition-all ${
                  tier.highlighted
                    ? 'border-nexus-cyan/40 shadow-[0_0_30px_rgba(0,240,255,0.1)]'
                    : 'border-nexus-border hover:border-nexus-cyan/20'
                }`}
              >
                {tier.highlighted && (
                  <span className="text-[10px] font-display tracking-widest text-nexus-cyan bg-nexus-cyan/10 px-2 py-0.5 rounded-full border border-nexus-cyan/20">
                    POPULAR
                  </span>
                )}
                <h3 className="font-display text-sm font-bold text-white mt-2">{tier.name}</h3>
                <p className="text-2xl font-display font-bold mt-1" style={{ color: engine.color }}>
                  {tier.price}
                </p>
                <ul className="mt-3 space-y-2">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-nexus-muted">
                      <span style={{ color: engine.color }}>+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full mt-4 px-4 py-2 rounded-lg text-xs font-display font-bold tracking-wide transition-all"
                  style={{
                    backgroundColor: tier.highlighted ? engine.color : 'transparent',
                    color: tier.highlighted ? '#060a14' : engine.color,
                    border: `1px solid ${engine.color}${tier.highlighted ? '' : '40'}`,
                  }}
                >
                  {tier.price === '$0' ? 'GET STARTED' : 'SUBSCRIBE'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engine Status */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <h2 className="font-display text-sm font-bold tracking-wider text-white mb-3">ENGINE STATUS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50 text-center">
            <p className="text-xs text-nexus-muted mb-1">Status</p>
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-nexus-green" />
              <p className="text-sm font-display font-bold text-nexus-green">Online</p>
            </div>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50 text-center">
            <p className="text-xs text-nexus-muted mb-1">Uptime</p>
            <p className="text-sm font-display font-bold text-nexus-cyan">99.97%</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50 text-center">
            <p className="text-xs text-nexus-muted mb-1">Active Users</p>
            <p className="text-sm font-display font-bold text-nexus-purple">{activeUsers.toLocaleString()}</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50 text-center">
            <p className="text-xs text-nexus-muted mb-1">God Core Link</p>
            <p className="text-sm font-display font-bold text-nexus-gold">Connected</p>
          </div>
        </div>
      </div>
    </div>
  )
}
