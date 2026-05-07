'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Trophy, Clock, Users, DollarSign, Swords, BarChart3 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Competition {
  id: string;
  name: string;
  frequency: string;
  mode: string;
  entryFee: number;
  prizePool: number;
  prizeSplit: number;
  manualOnly: boolean;
  status: string;
  startsAt: string;
  endsAt: string;
  entries: { id: string; userId: string; pnl: number; rank: number | null }[];
}

const freqLabels: Record<string, string> = {
  COMP_HOURLY: 'Hourly',
  COMP_DAILY: 'Daily',
  COMP_WEEKLY: 'Weekly',
  COMP_MONTHLY: 'Monthly',
};

const freqColors: Record<string, string> = {
  COMP_HOURLY: 'text-blue-400 bg-blue-400/10',
  COMP_DAILY: 'text-green-400 bg-green-400/10',
  COMP_WEEKLY: 'text-purple-400 bg-purple-400/10',
  COMP_MONTHLY: 'text-yellow-400 bg-yellow-400/10',
};

export default function CompetitionsPage() {
  const { token } = useAuthStore();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [mode, setMode] = useState<'ARENA' | 'BROKER'>('ARENA');
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/competitions?mode=${mode}`)
      .then((r) => r.json())
      .then((data) => {
        setCompetitions(Array.isArray(data) ? data : []);
      })
      .catch(() => setCompetitions([]))
      .finally(() => setLoading(false));
  }, [mode]);

  async function handleJoin(competitionId: string) {
    if (!token) return;
    setJoining(competitionId);
    try {
      await fetch(`${API}/api/competitions/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ competitionId }),
      });
      const updated = await fetch(`${API}/api/competitions?mode=${mode}`).then((r) => r.json());
      setCompetitions(updated);
    } finally {
      setJoining(null);
    }
  }

  function timeRemaining(endsAt: string) {
    const diff = new Date(endsAt).getTime() - Date.now();
    if (diff <= 0) return 'Ended';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (h > 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
    return `${h}h ${m}m`;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Trophy className="h-8 w-8 text-latrux-gold" />
          Competition Arena
        </h1>
        <p className="text-muted-foreground mt-1">
          Compete against traders worldwide — 70% prize to winners, 30% to platform
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('ARENA')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'ARENA'
              ? 'bg-latrux-gold text-black'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          <Swords className="h-4 w-4" />
          Arena Mode
        </button>
        <button
          onClick={() => setMode('BROKER')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'BROKER'
              ? 'bg-latrux-gold text-black'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Broker Mode
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Active Contests</p>
          <p className="text-2xl font-bold">{competitions.filter((c) => c.status === 'OPEN').length}</p>
        </div>
        <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Prize Pool</p>
          <p className="text-2xl font-bold text-latrux-gold">
            ${competitions.reduce((s, c) => s + c.prizePool, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Entries</p>
          <p className="text-2xl font-bold">{competitions.reduce((s, c) => s + c.entries.length, 0)}</p>
        </div>
        <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Prize Split</p>
          <p className="text-2xl font-bold">70/30</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-latrux-gold" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="bg-latrux-dark border border-border/40 rounded-xl p-6 hover:border-latrux-gold/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{comp.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${freqColors[comp.frequency]}`}>
                      {freqLabels[comp.frequency]}
                    </span>
                    {comp.manualOnly && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-400/10 text-red-400">
                        Manual Only
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {comp.mode}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    comp.status === 'OPEN'
                      ? 'bg-green-400/10 text-green-400'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {comp.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Prize Pool</p>
                  <p className="text-lg font-bold text-latrux-gold">${comp.prizePool.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Entry Fee</p>
                  <p className="text-lg font-bold">${comp.entryFee}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time Left</p>
                  <p className="text-lg font-bold flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {timeRemaining(comp.endsAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {comp.entries.length} participants
                </span>
                <button
                  onClick={() => handleJoin(comp.id)}
                  disabled={comp.status !== 'OPEN' || joining === comp.id}
                  className="px-4 py-2 bg-latrux-gold text-black rounded-lg text-sm font-medium hover:bg-latrux-gold/90 disabled:opacity-50"
                >
                  {joining === comp.id ? 'Joining...' : 'Join Contest'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
