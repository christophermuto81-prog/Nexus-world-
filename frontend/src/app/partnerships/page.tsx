'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { HandMetal, DollarSign, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const TIERS = [
  { name: 'BRONZE', splitUser: 50, splitPlatform: 50, minProfit: 0, color: 'text-amber-600' },
  { name: 'SILVER', splitUser: 60, splitPlatform: 40, minProfit: 500, color: 'text-gray-300' },
  { name: 'GOLD', splitUser: 70, splitPlatform: 30, minProfit: 2000, color: 'text-yellow-400' },
  { name: 'PLATINUM', splitUser: 80, splitPlatform: 20, minProfit: 10000, color: 'text-blue-300' },
  { name: 'DIAMOND', splitUser: 90, splitPlatform: 10, minProfit: 50000, color: 'text-cyan-300' },
];

interface Partnership {
  id: string;
  currentTier: string;
  profitSplitUser: number;
  profitSplitPlatform: number;
  capitalDeposit: number;
  totalProfit: number;
  totalPayout: number;
  status: string;
  appliedAt: string;
}

export default function PartnershipsPage() {
  const { token } = useAuthStore();
  const [partnership, setPartnership] = useState<Partnership | null>(null);
  const [capitalDeposit, setCapitalDeposit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${API}/api/partnerships/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.text())
      .then((t) => t ? JSON.parse(t) : null)
      .then((data) => {
        setPartnership(data);
        setLoading(false);
      });
  }, [token]);

  async function handleApply() {
    if (!token) return;
    setApplying(true);
    try {
      const res = await fetch(`${API}/api/partnerships/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ capitalDeposit }),
      });
      const data = await res.json();
      if (res.ok) setPartnership(data);
    } finally {
      setApplying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-latrux-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <HandMetal className="h-8 w-8 text-latrux-gold" />
          LatruxTrade Partnership
        </h1>
        <p className="text-muted-foreground mt-1">
          Partner with Latrux AI — $1 entry, profit-split from 50/50 up to 90/10 in your favor
        </p>
      </div>

      {partnership ? (
        <div className="space-y-6">
          <div className="bg-latrux-dark border border-latrux-gold/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Partnership</h2>
              <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm font-medium">
                {partnership.status.replace('PARTNERSHIP_', '')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Tier</p>
                <p className={`text-2xl font-bold ${TIERS.find((t) => t.name === partnership.currentTier)?.color}`}>
                  {partnership.currentTier}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profit Split</p>
                <p className="text-2xl font-bold text-latrux-gold">
                  {partnership.profitSplitUser}/{partnership.profitSplitPlatform}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold">${partnership.totalProfit.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payout</p>
                <p className="text-2xl font-bold text-green-400">${partnership.totalPayout.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Tier Progression */}
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-6">
            <h3 className="font-bold mb-4">Tier Progression</h3>
            <div className="flex items-center gap-2">
              {TIERS.map((tier, i) => (
                <div key={tier.name} className="flex items-center gap-2 flex-1">
                  <div
                    className={`flex-1 rounded-lg p-3 text-center ${
                      partnership.currentTier === tier.name
                        ? 'bg-latrux-gold/10 border border-latrux-gold'
                        : 'bg-secondary/50 border border-transparent'
                    }`}
                  >
                    <p className={`text-xs font-bold ${tier.color}`}>{tier.name}</p>
                    <p className="text-xs text-muted-foreground">{tier.splitUser}/{tier.splitPlatform}</p>
                    <p className="text-xs text-muted-foreground">${tier.minProfit.toLocaleString()}+</p>
                  </div>
                  {i < TIERS.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Application Form */}
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-6 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Apply for Partnership</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="text-sm">Entry Fee</span>
                <span className="font-bold text-latrux-gold">$1.00</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Capital Deposit (min $10)</label>
                <input
                  type="number"
                  min={10}
                  value={capitalDeposit}
                  onChange={(e) => setCapitalDeposit(Number(e.target.value))}
                  className="w-full bg-secondary/50 border border-border/40 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="text-sm">Starting Split</span>
                <span className="font-bold">50/50 (Bronze)</span>
              </div>

              <button
                onClick={handleApply}
                disabled={applying || capitalDeposit < 10}
                className="w-full py-3 bg-latrux-gold text-black rounded-lg font-bold hover:bg-latrux-gold/90 disabled:opacity-50"
              >
                {applying ? 'Processing...' : 'Apply Now — $1 Entry'}
              </button>
            </div>
          </div>

          {/* Tier Info */}
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-6">
            <h3 className="font-bold mb-4">Profit Split Tiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {TIERS.map((tier) => (
                <div key={tier.name} className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className={`text-lg font-bold ${tier.color}`}>{tier.name}</p>
                  <p className="text-2xl font-bold mt-1">{tier.splitUser}%</p>
                  <p className="text-xs text-muted-foreground">Your share</p>
                  <p className="text-xs text-muted-foreground mt-2">${tier.minProfit.toLocaleString()}+ profit</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
