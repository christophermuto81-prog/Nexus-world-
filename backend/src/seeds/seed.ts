import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ─── Subscription Tiers ──────────────────────────────────
  const tiers = [
    { name: 'LIGHT' as const, price: 0, signalsPerDay: 3, indicators: 3, autoExecution: false, description: 'Free tier — get started', features: ['3 signals/day', '3 indicators', 'Community access'] },
    { name: 'VISION' as const, price: 9, signalsPerDay: 10, indicators: 5, autoExecution: false, description: 'See the market clearly', features: ['10 signals/day', '5 indicators', 'Basic chart tools'] },
    { name: 'AI_TRADER' as const, price: 49, signalsPerDay: 50, indicators: 10, autoExecution: true, description: 'AI-powered trading', features: ['50 signals/day', '10 indicators', 'Auto-execution', 'AI Strategy Builder'] },
    { name: 'ELITE' as const, price: 149, signalsPerDay: 200, indicators: 50, autoExecution: true, description: 'Elite trading suite', features: ['200 signals/day', '50 indicators', 'Priority signals', 'Copy trading'] },
    { name: 'HEDGE_FUND' as const, price: 679, signalsPerDay: 1000, indicators: 100, autoExecution: true, description: 'Hedge fund grade', features: ['1000 signals/day', '100 indicators', 'Multi-broker', 'API access'] },
    { name: 'ULTRA' as const, price: 500, signalsPerDay: 5000, indicators: 200, autoExecution: true, description: 'Ultra premium', features: ['5000 signals/day', '200+ indicators', 'White-label', 'Dedicated support'] },
    { name: 'INSTITUTIONAL' as const, price: 999, signalsPerDay: 99999, indicators: 999, autoExecution: true, description: 'Institutional grade', features: ['Unlimited signals', 'All indicators', 'Custom integrations', 'SLA support'] },
  ];

  for (const tier of tiers) {
    await prisma.subscriptionTier.upsert({
      where: { name: tier.name },
      update: tier,
      create: tier,
    });
  }
  console.log('  ✓ Subscription tiers seeded');

  // ─── Signal Passes ───────────────────────────────────────
  const passes = [
    { type: 'BINARY' as const, duration: 'HOURLY' as const, price: 2 },
    { type: 'BINARY' as const, duration: 'DAILY' as const, price: 10 },
    { type: 'BINARY' as const, duration: 'WEEKLY' as const, price: 45 },
    { type: 'BINARY' as const, duration: 'MONTHLY' as const, price: 120 },
    { type: 'SCALPING' as const, duration: 'HOURLY' as const, price: 5 },
    { type: 'SCALPING' as const, duration: 'DAILY' as const, price: 25 },
    { type: 'SCALPING' as const, duration: 'WEEKLY' as const, price: 100 },
    { type: 'SCALPING' as const, duration: 'MONTHLY' as const, price: 300 },
    { type: 'SWING' as const, duration: 'DAILY' as const, price: 15 },
    { type: 'SWING' as const, duration: 'WEEKLY' as const, price: 60 },
    { type: 'SWING' as const, duration: 'MONTHLY' as const, price: 180 },
  ];

  for (const pass of passes) {
    const existing = await prisma.signalPass.findFirst({
      where: { type: pass.type, duration: pass.duration },
    });
    if (!existing) {
      await prisma.signalPass.create({ data: pass });
    }
  }
  console.log('  ✓ Signal passes seeded');

  // ─── Asset Classes & Instruments ─────────────────────────
  const assetClasses = [
    {
      name: 'Crypto',
      instruments: [
        { symbol: 'BTCUSDT', name: 'Bitcoin / USDT' },
        { symbol: 'ETHUSDT', name: 'Ethereum / USDT' },
        { symbol: 'SOLUSDT', name: 'Solana / USDT' },
        { symbol: 'BNBUSDT', name: 'BNB / USDT' },
        { symbol: 'XRPUSDT', name: 'XRP / USDT' },
      ],
    },
    {
      name: 'Forex',
      instruments: [
        { symbol: 'EURUSD', name: 'EUR / USD' },
        { symbol: 'GBPUSD', name: 'GBP / USD' },
        { symbol: 'USDJPY', name: 'USD / JPY' },
        { symbol: 'AUDUSD', name: 'AUD / USD' },
        { symbol: 'USDCAD', name: 'USD / CAD' },
      ],
    },
    {
      name: 'Stocks',
      instruments: [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.' },
        { symbol: 'MSFT', name: 'Microsoft Corp.' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      ],
    },
    {
      name: 'Commodities',
      instruments: [
        { symbol: 'XAUUSD', name: 'Gold / USD' },
        { symbol: 'XAGUSD', name: 'Silver / USD' },
        { symbol: 'WTIUSD', name: 'Crude Oil WTI' },
      ],
    },
    {
      name: 'Indices',
      instruments: [
        { symbol: 'SPX500', name: 'S&P 500' },
        { symbol: 'NAS100', name: 'NASDAQ 100' },
        { symbol: 'DJI30', name: 'Dow Jones 30' },
      ],
    },
  ];

  for (const ac of assetClasses) {
    const assetClass = await prisma.assetClass.upsert({
      where: { name: ac.name },
      update: {},
      create: { name: ac.name },
    });

    for (const inst of ac.instruments) {
      await prisma.instrument.upsert({
        where: { symbol: inst.symbol },
        update: {},
        create: { ...inst, assetClassId: assetClass.id },
      });
    }
  }
  console.log('  ✓ Asset classes & instruments seeded');

  // ─── Brokers ─────────────────────────────────────────────
  const brokers = [
    { name: 'Binance', website: 'https://binance.com', apiSupport: true, assetTypes: ['crypto'], rating: 4.5 },
    { name: 'Coinbase Pro', website: 'https://pro.coinbase.com', apiSupport: true, assetTypes: ['crypto'], rating: 4.3 },
    { name: 'Kraken', website: 'https://kraken.com', apiSupport: true, assetTypes: ['crypto'], rating: 4.4 },
    { name: 'Interactive Brokers', website: 'https://interactivebrokers.com', apiSupport: true, assetTypes: ['stocks', 'forex', 'commodities'], rating: 4.6 },
    { name: 'TD Ameritrade', website: 'https://tdameritrade.com', apiSupport: true, assetTypes: ['stocks'], rating: 4.2 },
    { name: 'OANDA', website: 'https://oanda.com', apiSupport: true, assetTypes: ['forex'], rating: 4.3 },
    { name: 'IG Markets', website: 'https://ig.com', apiSupport: true, assetTypes: ['forex', 'stocks', 'indices'], rating: 4.4 },
    { name: 'eToro', website: 'https://etoro.com', apiSupport: false, assetTypes: ['crypto', 'stocks', 'forex'], rating: 4.0 },
    { name: 'Robinhood', website: 'https://robinhood.com', apiSupport: false, assetTypes: ['stocks', 'crypto'], rating: 3.8 },
    { name: 'Alpaca', website: 'https://alpaca.markets', apiSupport: true, assetTypes: ['stocks'], rating: 4.1 },
    { name: 'FTX', website: 'https://ftx.com', apiSupport: true, assetTypes: ['crypto'], rating: 3.5 },
    { name: 'Bybit', website: 'https://bybit.com', apiSupport: true, assetTypes: ['crypto'], rating: 4.2 },
    { name: 'OKX', website: 'https://okx.com', apiSupport: true, assetTypes: ['crypto'], rating: 4.1 },
    { name: 'Deriv', website: 'https://deriv.com', apiSupport: true, assetTypes: ['forex', 'crypto', 'commodities'], rating: 4.0 },
    { name: 'XM', website: 'https://xm.com', apiSupport: true, assetTypes: ['forex'], rating: 4.2 },
    { name: 'Exness', website: 'https://exness.com', apiSupport: true, assetTypes: ['forex', 'crypto'], rating: 4.3 },
    { name: 'FXCM', website: 'https://fxcm.com', apiSupport: true, assetTypes: ['forex'], rating: 4.0 },
    { name: 'Saxo Bank', website: 'https://saxobank.com', apiSupport: true, assetTypes: ['stocks', 'forex', 'commodities'], rating: 4.5 },
    { name: 'CMC Markets', website: 'https://cmcmarkets.com', apiSupport: true, assetTypes: ['forex', 'indices'], rating: 4.1 },
    { name: 'Plus500', website: 'https://plus500.com', apiSupport: false, assetTypes: ['forex', 'crypto', 'stocks'], rating: 3.9 },
  ];

  for (const broker of brokers) {
    const existing = await prisma.broker.findFirst({ where: { name: broker.name } });
    if (!existing) {
      await prisma.broker.create({ data: broker });
    }
  }
  console.log('  ✓ 20 brokers seeded');

  // ─── Admin User ──────────────────────────────────────────
  const adminEmail = 'christophermuto81@gmail.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hash = await bcrypt.hash('LatruxAdmin2024!', 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hash,
        name: 'Tatenda Christopher Muto',
        role: 'ADMIN',
        kycStatus: 'APPROVED',
      },
    });
    console.log('  ✓ Admin user created');
  }

  // ─── Instruments Tiers (FCS API) ────────────────────────
  const instrumentsTiers = [
    { name: 'INSTRUMENTS_FREE' as const, displayName: 'Free', price: 0, symbolLimit: 50, realTime: false, level2Data: false, description: 'Delayed data for 50 symbols', features: ['50 symbols', 'Delayed data', 'Basic charts'] },
    { name: 'INSTRUMENTS_STARTER' as const, displayName: 'Starter', price: 0.99, symbolLimit: 5000, realTime: true, level2Data: false, description: 'Real-time data for 5K symbols', features: ['5,000 symbols', 'Real-time data', 'Advanced charts', 'Alerts'] },
    { name: 'INSTRUMENTS_STANDARD' as const, displayName: 'Standard', price: 4.99, symbolLimit: 50000, realTime: true, level2Data: false, description: 'Real-time data for 50K symbols', features: ['50,000 symbols', 'Real-time data', 'Technical indicators', 'Custom watchlists'] },
    { name: 'INSTRUMENTS_PRO' as const, displayName: 'Pro', price: 49, symbolLimit: 125000, realTime: true, level2Data: false, description: 'Real-time data for 125K+ symbols', features: ['125,000+ symbols', 'Real-time data', 'API access', 'Priority support'] },
    { name: 'INSTRUMENTS_ULTRA' as const, displayName: 'Ultra', price: 149, symbolLimit: 999999, realTime: true, level2Data: true, description: 'Unlimited + Level 2 data', features: ['Unlimited symbols', 'Level 2 data', 'Full API access', 'Dedicated support', 'Custom feeds'] },
  ];

  for (const tier of instrumentsTiers) {
    await prisma.instrumentsTier.upsert({
      where: { name: tier.name },
      update: tier,
      create: tier,
    });
  }
  console.log('  ✓ Instruments tiers seeded');

  // ─── Sample Competitions ──────────────────────────────────
  const now = new Date();
  const competitions = [
    { name: 'Daily Trading Challenge', frequency: 'COMP_DAILY' as const, mode: 'ARENA' as const, entryFee: 5, prizePool: 500, prizeSplit: 70, manualOnly: false, status: 'OPEN', startsAt: now, endsAt: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
    { name: 'Weekly Championship', frequency: 'COMP_WEEKLY' as const, mode: 'ARENA' as const, entryFee: 25, prizePool: 2500, prizeSplit: 70, manualOnly: true, status: 'OPEN', startsAt: now, endsAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
    { name: 'Monthly Grand Prix', frequency: 'COMP_MONTHLY' as const, mode: 'BROKER' as const, entryFee: 100, prizePool: 10000, prizeSplit: 70, manualOnly: false, status: 'OPEN', startsAt: now, endsAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) },
    { name: 'Hourly Sprint', frequency: 'COMP_HOURLY' as const, mode: 'ARENA' as const, entryFee: 1, prizePool: 100, prizeSplit: 70, manualOnly: false, status: 'OPEN', startsAt: now, endsAt: new Date(now.getTime() + 60 * 60 * 1000) },
  ];

  for (const comp of competitions) {
    const existing = await prisma.competition.findFirst({ where: { name: comp.name } });
    if (!existing) {
      await prisma.competition.create({ data: comp });
    }
  }
  console.log('  ✓ Sample competitions seeded');

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
