import { Router } from 'express';

const router = Router();

const engines = [
  { id: 1, slug: 'ares-1', name: 'ARES-1', subtitle: 'Universal Interpreter', status: 'online' },
  { id: 2, slug: 'game-arcade', name: 'Game Arcade', subtitle: '26 Immersive 3D Games', status: 'online' },
  { id: 3, slug: 'trading-signals', name: 'Trading Signals', subtitle: 'AI-Powered Market Intelligence', status: 'online' },
  { id: 4, slug: '3d-trade-floor', name: '3D Trade Floor', subtitle: 'Institutional Trading Environment', status: 'online' },
  { id: 5, slug: 'betting-room', name: 'Prediction Arena', subtitle: 'License-Free Prediction Games', status: 'online' },
  { id: 6, slug: 'online-mall', name: 'Online Mall', subtitle: 'Global Marketplace & Dropshipping', status: 'online' },
  { id: 7, slug: 'business-room', name: 'Business Room', subtitle: 'Enterprise Collaboration Hub', status: 'online' },
  { id: 8, slug: 'tender-invest', name: 'Tender & Invest', subtitle: 'Funding & Investment Platform', status: 'online' },
  { id: 9, slug: 'nexus-academy', name: 'Nexus Academy', subtitle: 'Full University & K-12 School', status: 'online' },
  { id: 10, slug: 'verification-hall', name: 'Verification Hall', subtitle: 'Professional Identity Verification', status: 'online' },
  { id: 11, slug: 'crypto-p2p', name: 'Crypto P2P', subtitle: 'Peer-to-Peer Exchange', status: 'online' },
  { id: 12, slug: 'signal-filters', name: 'Signal Filters', subtitle: '53-Filter AI Brain', status: 'online' },
  { id: 13, slug: 'talent-box', name: 'Talent Box', subtitle: 'Global Talent Marketplace', status: 'online' },
  { id: 14, slug: 'ai-engineer', name: 'AI Engineer Studio', subtitle: 'Build with the God Core', status: 'online' },
  { id: 15, slug: 'nexus-forge', name: 'Nexus Forge', subtitle: 'App Studio & Developer Platform', status: 'online' },
];

router.get('/', (_req, res) => {
  res.json({ engines, total: engines.length });
});

router.get('/:slug', (req, res) => {
  const engine = engines.find(e => e.slug === req.params.slug);
  if (!engine) {
    res.status(404).json({ error: 'Engine not found' });
    return;
  }
  res.json(engine);
});

export default router;
