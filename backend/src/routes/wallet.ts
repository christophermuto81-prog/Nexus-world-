import { Router } from 'express';

const router = Router();

router.get('/balance', (_req, res) => {
  res.json({
    nex: { balance: 0, usdValue: 0 },
    sol: { balance: 0, usdValue: 0 },
    totalUsd: 0,
  });
});

router.get('/nex-info', (_req, res) => {
  res.json({
    symbol: 'NEX',
    network: 'Solana',
    price: 0.0847,
    change24h: 2.4,
    circulatingSupply: 100_000_000,
    marketCap: 8_470_000,
  });
});

router.get('/transactions', (_req, res) => {
  res.json({ transactions: [], total: 0 });
});

export default router;
