'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { DollarSign, TrendingUp, PieChart, Calendar, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface SalaryRecord {
  id: string;
  month: string;
  grossSalary: number;
  personalDraw: number;
  reinvested: number;
  platformRevenue: number;
  status: string;
  paidAt: string | null;
}

interface SalarySummary {
  monthsActive: number;
  totalGross: number;
  totalDraw: number;
  totalReinvested: number;
  totalRevenue: number;
  drawPercentage: number;
  reinvestPercentage: number;
}

export default function DirectorSalaryPage() {
  const { token } = useAuthStore();
  const [current, setCurrent] = useState<SalaryRecord | null>(null);
  const [history, setHistory] = useState<SalaryRecord[]>([]);
  const [summary, setSummary] = useState<SalarySummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/director-salary/current`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/director-salary/history`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/director-salary/summary`, { headers }).then((r) => r.json()),
    ]).then(([cur, hist, sum]) => {
      setCurrent(cur);
      setHistory(hist);
      setSummary(sum);
      setLoading(false);
    });
  }, [token]);

  async function handleApprove(month: string) {
    if (!token) return;
    await fetch(`${API}/api/director-salary/${month}/approve`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const hist = await fetch(`${API}/api/director-salary/history`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json());
    setHistory(hist);
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
      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-latrux-gold" />
            Director&apos;s Salary System
          </h1>
          <p className="text-muted-foreground mt-1">
            $10,000/month — 25% personal draw, 75% reinvested into platform growth
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Monthly Salary</p>
            <p className="text-2xl font-bold text-latrux-gold">$10,000</p>
          </div>
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Personal Draw (25%)</p>
            <p className="text-2xl font-bold text-green-400">$2,500</p>
          </div>
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Reinvested (75%)</p>
            <p className="text-2xl font-bold text-blue-400">$7,500</p>
          </div>
          <div className="bg-latrux-dark border border-border/40 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Platform Revenue</p>
            <p className="text-2xl font-bold">${summary.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Allocation Visual */}
      <div className="bg-latrux-dark border border-border/40 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Allocation</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-8 rounded-full overflow-hidden flex">
              <div className="bg-green-500 h-full" style={{ width: '25%' }} />
              <div className="bg-blue-500 h-full" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-green-400">25% Personal ($2,500)</span>
              <span className="text-blue-400">75% Reinvested ($7,500)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Month */}
      {current && (
        <div className="bg-latrux-dark border border-latrux-gold/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Current Month: {current.month}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                current.status === 'PAID'
                  ? 'bg-green-400/10 text-green-400'
                  : current.status === 'APPROVED'
                    ? 'bg-blue-400/10 text-blue-400'
                    : 'bg-yellow-400/10 text-yellow-400'
              }`}
            >
              {current.status}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Gross</p>
              <p className="text-lg font-bold">${current.grossSalary.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Draw</p>
              <p className="text-lg font-bold text-green-400">${current.personalDraw.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reinvested</p>
              <p className="text-lg font-bold text-blue-400">${current.reinvested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-lg font-bold">${current.platformRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      <div className="bg-latrux-dark border border-border/40 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Salary History</h2>
        {history.length === 0 ? (
          <p className="text-muted-foreground">No salary records yet.</p>
        ) : (
          <div className="space-y-2">
            {history.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{record.month}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span>${record.grossSalary.toLocaleString()}</span>
                  <span className="text-green-400">${record.personalDraw.toLocaleString()}</span>
                  <span className="text-blue-400">${record.reinvested.toLocaleString()}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      record.status === 'PAID'
                        ? 'bg-green-400/10 text-green-400'
                        : 'bg-yellow-400/10 text-yellow-400'
                    }`}
                  >
                    {record.status}
                  </span>
                  {record.status === 'PENDING' && (
                    <button
                      onClick={() => handleApprove(record.month)}
                      className="px-3 py-1 bg-latrux-gold text-black rounded text-xs font-medium"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {summary && summary.monthsActive > 0 && (
        <div className="bg-latrux-dark border border-border/40 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Cumulative Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Months Active</p>
              <p className="text-2xl font-bold">{summary.monthsActive}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Gross</p>
              <p className="text-2xl font-bold">${summary.totalGross.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Drawn</p>
              <p className="text-2xl font-bold text-green-400">${summary.totalDraw.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reinvested</p>
              <p className="text-2xl font-bold text-blue-400">${summary.totalReinvested.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
