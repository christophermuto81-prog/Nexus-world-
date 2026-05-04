import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { engines } from '../data/engines'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🌐' },
    { path: '/god-core', label: 'God Core', icon: '🧠' },
    { path: '/dispute-desk', label: 'AI Support', icon: '⚖️' },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-nexus-surface border-r border-nexus-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 p-4 border-b border-nexus-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-nexus-cyan to-nexus-purple flex items-center justify-center animate-pulse-glow">
            <span className="font-display font-bold text-white text-lg">N</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-nexus-cyan text-sm tracking-wider">NEXUS WORLD</h1>
            <p className="text-[10px] text-nexus-muted tracking-widest">PLANET OF WEALTH</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-semibold text-nexus-muted tracking-widest uppercase px-3 mb-2">Core</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 ${
                  location.pathname === item.path
                    ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20'
                    : 'text-nexus-muted hover:text-nexus-text hover:bg-nexus-card'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="px-3 mt-4">
            <p className="text-[10px] font-semibold text-nexus-muted tracking-widest uppercase px-3 mb-2">Engines</p>
            {engines.map((engine) => (
              <Link
                key={engine.slug}
                to={`/engine/${engine.slug}`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all mb-0.5 ${
                  location.pathname === `/engine/${engine.slug}`
                    ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20'
                    : 'text-nexus-muted hover:text-nexus-text hover:bg-nexus-card'
                }`}
              >
                <span className="text-base">{engine.icon}</span>
                <span className="truncate">{engine.id}. {engine.name}</span>
              </Link>
            ))}
          </div>

          <div className="px-3 mt-4">
            <p className="text-[10px] font-semibold text-nexus-muted tracking-widest uppercase px-3 mb-2">Platform</p>
            <Link
              to="/covenant"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all mb-0.5 ${
                location.pathname === '/covenant'
                  ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20'
                  : 'text-nexus-muted hover:text-nexus-text hover:bg-nexus-card'
              }`}
            >
              <span>📜</span>
              <span>The Covenant</span>
            </Link>
            <Link
              to="/wallet"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all mb-0.5 ${
                location.pathname === '/wallet'
                  ? 'bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20'
                  : 'text-nexus-muted hover:text-nexus-text hover:bg-nexus-card'
              }`}
            >
              <span>💰</span>
              <span>NEX Wallet</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-purple flex items-center justify-center">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Explorer</p>
              <p className="text-xs text-nexus-muted">Free Tier</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-nexus-green" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-nexus-surface border-b border-nexus-border flex items-center justify-between px-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-nexus-muted hover:text-nexus-text"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexus-card border border-nexus-border text-sm text-nexus-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Nexus World...</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Brain Gauge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-card border border-nexus-border">
              <span className="text-xs">🧠</span>
              <div className="w-16 h-1.5 rounded-full bg-nexus-border overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-nexus-cyan to-nexus-purple" />
              </div>
              <span className="text-xs text-nexus-muted font-mono">75%</span>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-nexus-green/10 border border-nexus-green/20">
              <div className="w-1.5 h-1.5 rounded-full bg-nexus-green animate-pulse" />
              <span className="text-xs text-nexus-green font-medium">LIVE</span>
            </div>

            {/* Wallet */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-nexus-card border border-nexus-border">
              <span className="text-xs">💎</span>
              <span className="text-sm font-mono text-nexus-gold">0.00 NEX</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
