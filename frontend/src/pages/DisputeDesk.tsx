import { useState } from 'react'

interface Ticket {
  id: string;
  subject: string;
  engine: string;
  status: 'open' | 'in_review' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created: string;
}

const sampleTickets: Ticket[] = [
  { id: 'DSP-001', subject: 'Trade signal did not execute at specified price', engine: 'Trading Signals', status: 'in_review', priority: 'high', created: '2 hours ago' },
  { id: 'DSP-002', subject: 'Game disconnected mid-tournament — entry fee refund', engine: 'Game Arcade', status: 'open', priority: 'medium', created: '5 hours ago' },
  { id: 'DSP-003', subject: 'P2P trade escrow not released after confirmation', engine: 'Crypto P2P', status: 'in_review', priority: 'high', created: '1 day ago' },
  { id: 'DSP-004', subject: 'Course certificate not issued after completion', engine: 'Nexus Academy', status: 'resolved', priority: 'low', created: '3 days ago' },
  { id: 'DSP-005', subject: 'Product listing removed without explanation', engine: 'Online Mall', status: 'resolved', priority: 'medium', created: '5 days ago' },
]

const statusColors: Record<string, string> = {
  open: 'bg-nexus-orange/10 text-nexus-orange border-nexus-orange/20',
  in_review: 'bg-nexus-cyan/10 text-nexus-cyan border-nexus-cyan/20',
  resolved: 'bg-nexus-green/10 text-nexus-green border-nexus-green/20',
}

const priorityColors: Record<string, string> = {
  low: 'text-nexus-muted',
  medium: 'text-nexus-orange',
  high: 'text-nexus-red',
}

export default function DisputeDesk() {
  const [filter, setFilter] = useState<'all' | 'open' | 'in_review' | 'resolved'>('all')

  const filtered = filter === 'all' ? sampleTickets : sampleTickets.filter(t => t.status === filter)

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-surface via-nexus-card to-nexus-surface border border-nexus-border p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.06),transparent_60%)]" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-nexus-purple/10 border border-nexus-purple/20 flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold tracking-wide text-white">
                GLOBAL AI SUPPORT
              </h1>
              <p className="text-xs text-nexus-muted tracking-widest font-display">DISPUTE DESK</p>
            </div>
          </div>
          <p className="text-sm text-nexus-muted max-w-2xl leading-relaxed">
            AI-powered dispute resolution across all engines. Every transaction is protected by smart contracts.
            The God Core analyses disputes impartially, reviewing transaction logs, chat history, and smart contract state.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Open Tickets', value: '2', color: 'text-nexus-orange' },
          { label: 'In Review', value: '2', color: 'text-nexus-cyan' },
          { label: 'Resolved Today', value: '2', color: 'text-nexus-green' },
          { label: 'Avg Resolution', value: '4.2h', color: 'text-nexus-purple' },
        ].map((stat) => (
          <div key={stat.label} className="bg-nexus-card border border-nexus-border rounded-xl p-4 text-center">
            <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-nexus-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(['all', 'open', 'in_review', 'resolved'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20'
                : 'bg-nexus-card text-nexus-muted border border-nexus-border hover:text-nexus-text'
            }`}
          >
            {f === 'in_review' ? 'In Review' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tickets */}
      <div className="space-y-2">
        {filtered.map((ticket) => (
          <div key={ticket.id} className="bg-nexus-card border border-nexus-border rounded-xl p-4 hover:border-nexus-cyan/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-nexus-muted">{ticket.id}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[ticket.status]}`}>
                    {ticket.status === 'in_review' ? 'In Review' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                  <span className={`text-xs ${priorityColors[ticket.priority]}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-white">{ticket.subject}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-nexus-muted">Engine: {ticket.engine}</span>
                  <span className="text-xs text-nexus-muted">{ticket.created}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit New */}
      <div className="bg-nexus-card border border-nexus-border rounded-xl p-5">
        <h3 className="font-display text-sm font-bold tracking-wide text-white mb-3">Submit New Dispute</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Subject..."
            className="w-full px-4 py-2.5 rounded-lg bg-nexus-surface border border-nexus-border text-sm text-nexus-text placeholder-nexus-muted focus:outline-none focus:border-nexus-cyan/50"
          />
          <textarea
            placeholder="Describe your issue in detail..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-nexus-surface border border-nexus-border text-sm text-nexus-text placeholder-nexus-muted focus:outline-none focus:border-nexus-cyan/50 resize-none"
          />
          <button className="px-6 py-2.5 rounded-lg bg-nexus-cyan text-nexus-bg font-display text-sm font-bold tracking-wide hover:bg-nexus-cyan/90 transition-colors">
            SUBMIT DISPUTE
          </button>
        </div>
      </div>
    </div>
  )
}
