'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3, Bot, Home, LineChart, Wallet, Users, Globe,
  Share2, Building2, Settings, LogOut, Zap, TrendingUp,
  Trophy, HandMetal, DollarSign, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

const sidebarLinks = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/chart', label: 'Charts', icon: LineChart },
  { href: '/dashboard/signals', label: 'Signals', icon: Bot },
  { href: '/dashboard/trade-box', label: 'Trade Box', icon: TrendingUp },
  { href: '/dashboard/watchlist', label: 'Watchlist', icon: BarChart3 },
  { href: '/dashboard/forecast', label: 'Forecast', icon: Zap },
  { href: '/subscriptions', label: 'Subscriptions', icon: Wallet },
  { href: '/brokers', label: 'Brokers', icon: Building2 },
  { href: '/affiliate', label: 'Affiliate', icon: Share2 },
  { href: '/community', label: 'Community', icon: Globe },
  { href: '/instruments', label: 'Instruments', icon: Layers },
  { href: '/competitions', label: 'Competitions', icon: Trophy },
  { href: '/partnerships', label: 'Partnership', icon: HandMetal },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loadUser, logout } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="min-h-screen flex bg-latrux-darker">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-latrux-dark flex flex-col">
        <div className="p-4 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-7 w-7 text-latrux-gold" />
            <span className="text-lg font-bold bg-gradient-to-r from-latrux-gold to-yellow-300 bg-clip-text text-transparent">
              LatruxTrade
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-latrux-gold/10 text-latrux-gold font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}

          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === '/admin'
                  ? 'bg-latrux-gold/10 text-latrux-gold font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
              )}
            >
              <Settings className="h-4 w-4" />
              Admin Godview
            </Link>
          )}
        </nav>

        <div className="p-3 border-t border-border/40">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-latrux-gold/20 flex items-center justify-center text-latrux-gold text-sm font-bold">
              {user?.name?.[0] || user?.email?.[0] || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || user?.email || 'Guest'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <button onClick={logout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
