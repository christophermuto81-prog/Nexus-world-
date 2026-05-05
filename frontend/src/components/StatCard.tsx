interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export default function StatCard({ icon, label, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-nexus-card border border-nexus-border rounded-xl p-4 hover:border-nexus-cyan/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {change && (
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
            positive ? 'bg-nexus-green/10 text-nexus-green' : 'bg-nexus-red/10 text-nexus-red'
          }`}>
            {positive ? '+' : ''}{change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold font-display text-white">{value}</p>
      <p className="text-xs text-nexus-muted mt-1">{label}</p>
    </div>
  )
}
