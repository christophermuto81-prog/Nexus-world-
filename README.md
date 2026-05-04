# Nexus World — The Planet of Wealth

A complete digital ecosystem where you can trade, play, learn, build, and connect — powered by the God Core AI and the NEX token on Solana.

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    MAIN DASHBOARD                                │
│  Wallet │ Language │ Brain Gauge │ Live Traffic │ Live Feed      │
├──────────────────────────────────────────────────────────────────┤
│              NEXUS AI ENGINEER (GOD CORE)                        │
│  53-Filter Brain • Self-Expansion • IP Protection • Eternal Ledger│
├──────────────────────────────────────────────────────────────────┤
│              GLOBAL AI SUPPORT (DISPUTE DESK)                    │
├──────────────────────────────────────────────────────────────────┤
│  ENGINES:                                                        │
│  1. ARES-1 (Universal Interpreter)                               │
│  2. Game Arcade (26 3D Games)                                    │
│  3. Trading Signals Hub                                          │
│  4. 3D Trade Floor                                               │
│  5. Prediction Arena                                             │
│  6. Online Mall                                                  │
│  7. Business Room                                                │
│  8. Tender & Invest                                              │
│  9. Nexus Academy                                                │
│  10. Verification Hall                                           │
│  11. Crypto P2P                                                  │
│  12. Signal Filters (53-Filter Brain)                            │
│  13. Talent Box                                                  │
│  14. AI Engineer Studio                                          │
│  15. Nexus Forge                                                 │
├──────────────────────────────────────────────────────────────────┤
│  CROSS-CUTTING: NEX Token (SOL) │ Wallet │ Event Bus (Redis)    │
│  Signal Protect │ Sentinel │ Hidden Activity                     │
└──────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer     | Technology                              |
|-----------|----------------------------------------|
| Frontend  | React 19, TypeScript, Tailwind CSS 4, Vite |
| Backend   | Node.js, Express, TypeScript            |
| Database  | PostgreSQL                              |
| Cache     | Redis                                   |
| Blockchain| Solana (NEX Token)                      |
| Deploy FE | Netlify                                 |
| Deploy BE | Railway                                 |

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev      # Development server on port 3000
npm run build    # Production build
```

### Backend

```bash
cd backend
npm install
npm run dev      # Development server on port 4000
npm run build    # Compile TypeScript
npm start        # Production server
```

## The Nexus Covenant

Six unbreakable principles hardcoded into the God Core:

1. **Nexus Is for the People** — Every capability exists to make human life better
2. **The God Core's Integrity Is Absolute** — Weaponisation lock is architectural
3. **Compete, Never Destroy** — Win on merit, not on lock-in
4. **Safe Haven in Times of War** — Emergency Mode activates automatically
5. **The Steward, Not the Master** — Guardian of the intelligence
6. **Answerable to the Creator** — Every decision is logged

## Environment Variables

```env
# Backend
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/nexus_world
REDIS_URL=redis://localhost:6379
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEX_TOKEN_MINT=
```

## Project Structure

```
├── frontend/               # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── data/           # Engine & covenant data
│   │   ├── layouts/        # Main layout with sidebar
│   │   ├── pages/          # Dashboard, GodCore, Engines, etc.
│   │   └── hooks/          # Custom React hooks
│   └── public/             # Static assets
├── backend/                # Express + TypeScript API
│   └── src/
│       ├── config/         # Environment configuration
│       ├── routes/         # API endpoints
│       ├── models/         # Database models (PostgreSQL)
│       ├── services/       # Business logic
│       └── middleware/     # Auth, validation, etc.
└── README.md
```

## License

Proprietary — Nexus World Platform
