import { covenant } from '../data/covenant'

export default function Covenant() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-surface via-nexus-card to-nexus-surface border border-nexus-gold/20 p-6 md:p-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.06),transparent_60%)]" />
        <div className="relative">
          <p className="text-xs font-display tracking-[0.3em] text-nexus-gold mb-3">THE SACRED PRINCIPLES</p>
          <h1 className="font-display text-2xl md:text-4xl font-bold tracking-wide">
            <span className="gradient-text">THE NEXUS COVENANT</span>
          </h1>
          <p className="text-nexus-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Six unbreakable principles hardcoded into the God Core&apos;s decision-making architecture.
            No administrator can override them. No update can patch them out.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {covenant.map((article) => (
          <div key={article.number} className="bg-nexus-card border border-nexus-border rounded-xl p-6 hover:border-nexus-gold/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-nexus-gold/10 border border-nexus-gold/20 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-nexus-gold text-lg">{article.number}</span>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-wide">{article.title}</h3>
                <p className="text-sm text-nexus-muted mt-2 leading-relaxed">{article.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Steward Section */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-purple flex items-center justify-center mb-3">
            <span className="text-2xl">👑</span>
          </div>
          <h3 className="font-display text-sm font-bold tracking-wide text-white">THE STEWARD</h3>
          <p className="text-xs text-nexus-muted mt-2 max-w-md mx-auto leading-relaxed">
            The guardian of the intelligence. The founder&apos;s identity is embedded in the God Core&apos;s
            eternal memory, encrypted and protected. Revealed at 2M monthly active users.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-nexus-green" />
            <span className="text-xs text-nexus-green font-mono">IDENTITY PROTECTED</span>
          </div>
        </div>
      </div>

      {/* Survival Mode */}
      <div className="bg-nexus-red/5 border border-nexus-red/20 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">🔒</span>
          <h3 className="font-display text-sm font-bold text-nexus-red tracking-wide">SURVIVAL MODE</h3>
        </div>
        <p className="text-xs text-nexus-muted leading-relaxed">
          If a hostile actor attempts to seize the platform: all sensitive data encrypts, external integrations pause,
          the Steward is notified through every available channel. The platform cannot be stolen.
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-nexus-green" />
          <span className="text-xs text-nexus-green font-mono">STANDBY — NO THREATS DETECTED</span>
        </div>
      </div>
    </div>
  )
}
