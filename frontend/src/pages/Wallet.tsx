export default function Wallet() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-surface via-nexus-card to-nexus-surface border border-nexus-gold/20 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.06),transparent_60%)]" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-nexus-gold/10 border border-nexus-gold/20 flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold tracking-wide text-white">NEX WALLET</h1>
              <p className="text-xs text-nexus-muted tracking-widest font-display">SOLANA BLOCKCHAIN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-nexus-card border border-nexus-gold/20 rounded-xl p-5">
          <p className="text-xs text-nexus-muted mb-2">NEX Balance</p>
          <p className="text-3xl font-display font-bold text-nexus-gold">0.00</p>
          <p className="text-xs text-nexus-muted mt-1">≈ $0.00 USD</p>
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
          <p className="text-xs text-nexus-muted mb-2">SOL Balance</p>
          <p className="text-3xl font-display font-bold text-nexus-purple">0.00</p>
          <p className="text-xs text-nexus-muted mt-1">≈ $0.00 USD</p>
        </div>
        <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
          <p className="text-xs text-nexus-muted mb-2">Total Portfolio</p>
          <p className="text-3xl font-display font-bold text-nexus-cyan">$0.00</p>
          <p className="text-xs text-nexus-green mt-1">+0.00%</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '📥', label: 'Deposit', color: 'nexus-green' },
          { icon: '📤', label: 'Withdraw', color: 'nexus-orange' },
          { icon: '🔄', label: 'Swap', color: 'nexus-cyan' },
          { icon: '📊', label: 'Stake', color: 'nexus-purple' },
        ].map((action) => (
          <button
            key={action.label}
            className={`bg-nexus-card border border-nexus-border rounded-xl p-4 text-center hover:border-${action.color}/30 transition-all`}
          >
            <span className="text-2xl">{action.icon}</span>
            <p className="text-sm font-display font-bold text-white mt-2">{action.label}</p>
          </button>
        ))}
      </div>

      {/* NEX Token Info */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <h3 className="font-display text-sm font-bold tracking-wide text-white mb-4">NEX TOKEN</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Price</p>
            <p className="text-lg font-display font-bold text-nexus-gold">$0.0847</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Network</p>
            <p className="text-lg font-display font-bold text-nexus-purple">Solana</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Circulating</p>
            <p className="text-lg font-display font-bold text-nexus-cyan">100M</p>
          </div>
          <div className="bg-nexus-surface rounded-lg p-3 border border-nexus-border/50">
            <p className="text-xs text-nexus-muted mb-1">Market Cap</p>
            <p className="text-lg font-display font-bold text-nexus-green">$8.47M</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <h3 className="font-display text-sm font-bold tracking-wide text-white mb-4">TRANSACTION HISTORY</h3>
        <div className="text-center py-8">
          <span className="text-3xl">📋</span>
          <p className="text-sm text-nexus-muted mt-2">No transactions yet</p>
          <p className="text-xs text-nexus-muted mt-1">Your NEX token transactions will appear here</p>
        </div>
      </div>
    </div>
  )
}
