import { Link } from 'react-router-dom'
import type { Engine } from '../data/engines'

interface EngineCardProps {
  engine: Engine;
}

export default function EngineCard({ engine }: EngineCardProps) {
  return (
    <Link
      to={`/engine/${engine.slug}`}
      className="group bg-nexus-card border border-nexus-border rounded-xl p-5 hover:border-nexus-cyan/40 transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${engine.color}15`, border: `1px solid ${engine.color}30` }}
        >
          {engine.icon}
        </div>
        <span className="text-xs font-mono text-nexus-muted bg-nexus-surface px-2 py-1 rounded-md">
          #{engine.id.toString().padStart(2, '0')}
        </span>
      </div>
      <h3 className="font-display font-bold text-white text-sm tracking-wide mb-1 group-hover:text-nexus-cyan transition-colors">
        {engine.name}
      </h3>
      <p className="text-xs text-nexus-muted mb-3">{engine.subtitle}</p>
      <p className="text-xs text-nexus-muted/80 line-clamp-2 leading-relaxed">
        {engine.description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-xs text-nexus-cyan opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Enter Engine</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
