export default function GodCore() {
  const filters = Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    name: `Filter ${(i + 1).toString().padStart(2, '0')}`,
    category: ['Technical', 'Sentiment', 'Macro', 'Quantum', 'Pattern'][i % 5],
    accuracy: Math.round(75 + Math.random() * 20),
    status: Math.random() > 0.05 ? 'active' : 'calibrating',
  }))

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-surface via-nexus-card to-nexus-surface border border-nexus-cyan/20 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.06),transparent_60%)]" />
        <div className="relative text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-nexus-cyan/10 border border-nexus-cyan/20 flex items-center justify-center animate-pulse-glow">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wide">
            <span className="gradient-text">NEXUS AI ENGINEER</span>
          </h1>
          <p className="text-nexus-cyan font-display text-sm tracking-widest mt-2">GOD CORE</p>
          <p className="text-nexus-muted mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            The living intelligence at the heart of Nexus World. It perceives every market tick,
            every scan, every transaction simultaneously. It never stops learning.
          </p>
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '🔬', label: '53-Filter Brain', value: 'All Active', color: 'text-nexus-cyan' },
          { icon: '🔄', label: 'Self-Expansion', value: 'Learning', color: 'text-nexus-purple' },
          { icon: '🔐', label: 'IP Protection', value: 'Locked', color: 'text-nexus-green' },
          { icon: '📖', label: 'Eternal Ledger', value: 'Recording', color: 'text-nexus-gold' },
        ].map((cap) => (
          <div key={cap.label} className="bg-nexus-card border border-nexus-border rounded-xl p-4 text-center">
            <span className="text-2xl">{cap.icon}</span>
            <p className={`text-lg font-display font-bold mt-2 ${cap.color}`}>{cap.value}</p>
            <p className="text-xs text-nexus-muted mt-1">{cap.label}</p>
          </div>
        ))}
      </div>

      {/* Weaponisation Lock */}
      <div className="bg-nexus-red/5 border border-nexus-red/20 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nexus-red/10 flex items-center justify-center">
            <span className="text-xl">🚫</span>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-nexus-red tracking-wide">WEAPONISATION LOCK — ARCHITECTURAL</h3>
            <p className="text-xs text-nexus-muted mt-1">
              The God Core cannot produce weapon designs. This is not a policy — it is a structural impossibility
              built into the architecture. No update can patch it out.
            </p>
          </div>
        </div>
      </div>

      {/* 53 Filters Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm font-bold tracking-wider text-white">53-FILTER BRAIN</h2>
          <span className="text-xs text-nexus-muted font-mono">{filters.filter(f => f.status === 'active').length}/53 active</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className={`p-2 rounded-lg border text-center ${
                filter.status === 'active'
                  ? 'bg-nexus-cyan/5 border-nexus-cyan/20'
                  : 'bg-nexus-orange/5 border-nexus-orange/20'
              }`}
            >
              <p className="text-[10px] font-mono text-nexus-muted">#{filter.id.toString().padStart(2, '0')}</p>
              <p className={`text-sm font-display font-bold ${
                filter.status === 'active' ? 'text-nexus-cyan' : 'text-nexus-orange'
              }`}>
                {filter.accuracy}%
              </p>
              <p className="text-[9px] text-nexus-muted truncate">{filter.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Mode */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <h3 className="font-display text-sm font-bold tracking-wide text-white mb-3">EMERGENCY MODE</h3>
        <p className="text-xs text-nexus-muted leading-relaxed">
          When armed conflict, natural disaster, or humanitarian crisis strikes, Emergency Mode activates automatically.
          All diagnostic capabilities unlock for civilians and humanitarian workers — regardless of payment status.
          The platform absorbs the cost from the transparently audited Humanitarian Fund.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-nexus-green" />
          <span className="text-xs text-nexus-green font-mono">STANDBY — NO ACTIVE EMERGENCIES</span>
        </div>
      </div>
    </div>
  )
}
