'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';
import { formatCurrency } from '@/lib/utils';
import {
  Users, BarChart3, TrendingUp, DollarSign, Settings, Shield, ArrowLeft,
} from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    api.getAdminDashboard().then(setStats).catch(console.error);
    api.getAdminUsers().then(setUsers as any).catch(console.error);
  }, []);

  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-latrux-darker">
        <Card className="max-w-md text-center p-8">
          <Shield className="h-16 w-16 text-latrux-red mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            Admin Godview is restricted to the Director only.
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const tabs = ['overview', 'users', 'revenue', 'signals', 'settings'];

  return (
    <div className="min-h-screen bg-latrux-darker">
      <div className="border-b border-border/40 bg-latrux-dark">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Settings className="h-5 w-5 text-latrux-gold" />
                Admin Godview
              </h1>
              <p className="text-xs text-muted-foreground">Director Control Panel</p>
            </div>
          </div>
          <Badge variant="gold">DIRECTOR</Badge>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize border-b-2 transition ${
                tab === t
                  ? 'border-latrux-gold text-latrux-gold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {tab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: stats.users, icon: Users, color: 'text-latrux-blue' },
                { label: 'Total Signals', value: stats.signals, icon: BarChart3, color: 'text-latrux-green' },
                { label: 'Total Trades', value: stats.trades, icon: TrendingUp, color: 'text-latrux-purple' },
                { label: 'Revenue', value: formatCurrency(stats.revenue), icon: DollarSign, color: 'text-latrux-gold' },
              ].map((s, i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                      <p className="text-2xl font-bold mt-1">{s.value}</p>
                    </div>
                    <s.icon className={`h-8 w-8 ${s.color}`} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle>All Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3">Email</th>
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Role</th>
                      <th className="text-left py-2 px-3">KYC</th>
                      <th className="text-left py-2 px-3">Wallet</th>
                      <th className="text-left py-2 px-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u: any) => (
                      <tr key={u.id} className="border-b border-border/50">
                        <td className="py-2 px-3">{u.email}</td>
                        <td className="py-2 px-3">{u.name || '-'}</td>
                        <td className="py-2 px-3">
                          <Badge variant={u.role === 'ADMIN' ? 'gold' : 'secondary'}>{u.role}</Badge>
                        </td>
                        <td className="py-2 px-3">
                          <Badge variant={u.kycStatus === 'APPROVED' ? 'success' : 'secondary'}>
                            {u.kycStatus}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 font-mono text-xs">
                          {u.solanaAddress ? `${u.solanaAddress.slice(0, 8)}...` : '-'}
                        </td>
                        <td className="py-2 px-3 text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {tab === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle>Latrux AI Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm font-medium mb-2">AI Endpoint</p>
                <p className="text-xs text-muted-foreground font-mono">
                  POST /api/ai/generate-signal (Mistral-7B ready)
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm font-medium mb-2">Signal Engine Status</p>
                <Badge variant="success">Active — Rule-Based (Phase 1)</Badge>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm font-medium mb-2">Competition Toggles</p>
                <p className="text-xs text-muted-foreground">Coming in Phase 2</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
