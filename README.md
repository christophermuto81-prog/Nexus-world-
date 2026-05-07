# LatruxTrade — Autonomous Trading Intelligence Platform

> **Director:** Tatenda Christopher Muto  
> **AI Engine:** Latrux AI (God-Tier Autonomous Brain)  
> **Token:** Latrux Token (LX) — Solana SPL, 1B supply, 6 decimals

LatruxTrade is a self-evolving trading ecosystem powered by Latrux AI. It delivers AI-generated signals, automated trade execution, and institutional-grade analytics across crypto, forex, stocks, commodities, and indices.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Zustand |
| Backend | NestJS (Node.js), Prisma ORM |
| Database | PostgreSQL + Redis |
| Real-time | Socket.io (WebSocket) |
| Charts | lightweight-charts (TradingView) |
| AI | REST endpoint ready for Latrux AI (Mistral-7B) |
| Blockchain | Solana Web3.js (devnet) |
| Payments | Coinbase Commerce + Flutterwave |
| Auth | NextAuth.js + JWT |
| Hosting | Render (render.yaml included) |

---

## Project Structure

```
├── frontend/              # Next.js 14 app
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── auth/      # Sign in / Sign up
│   │   │   ├── dashboard/ # Trading dashboard
│   │   │   ├── admin/     # Admin Godview
│   │   │   ├── community/ # Community Pulse (3D globe)
│   │   │   ├── affiliate/ # Affiliate program
│   │   │   ├── brokers/   # Broker directory
│   │   │   └── subscriptions/ # Pricing & plans
│   │   ├── components/    # UI components (shadcn-style)
│   │   ├── lib/           # Utilities & API client
│   │   ├── store/         # Zustand state management
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── backend/               # NestJS API
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/      # JWT authentication
│   │   │   ├── users/     # User management + Solana wallets
│   │   │   ├── subscriptions/ # Tiers & signal passes
│   │   │   ├── signals/   # Signal engine (5-indicator confluence)
│   │   │   ├── trades/    # Paper trading (Trade Box)
│   │   │   ├── admin/     # Admin Godview API
│   │   │   ├── community/ # Community Pulse events
│   │   │   ├── affiliates/# Affiliate system
│   │   │   ├── brokers/   # Broker directory & connections
│   │   │   ├── payments/  # Coinbase & Flutterwave
│   │   │   └── websocket/ # Socket.io gateway
│   │   ├── guards/        # JWT & Roles guards
│   │   ├── decorators/    # Custom decorators
│   │   └── seeds/         # Database seed data
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
│
├── render.yaml            # One-click Render deploy
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (optional for dev)

### 1. Clone & Install

```bash
git clone https://github.com/christophermuto81-prog/Nexus-world-.git
cd Nexus-world-

# Install backend
cd backend
npm install
cp .env.example .env  # Edit DATABASE_URL

# Install frontend
cd ../frontend
npm install
cp .env.example .env
```

### 2. Database Setup

```bash
cd backend

# Create database
createdb latrux_trade

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Seed data (tiers, passes, brokers, instruments, admin user)
npx ts-node src/seeds/seed.ts
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run start:dev    # → http://localhost:4000
                     # → Swagger: http://localhost:4000/api/docs

# Terminal 2 — Frontend
cd frontend
npm run dev          # → http://localhost:3000
```

### 4. Default Admin Login

- **Email:** christophermuto81@gmail.com
- **Password:** LatruxAdmin2024!

---

## Deploy to Render

Click the button or push to your connected repo:

1. Connect your GitHub repo to [Render](https://render.com)
2. Select "Blueprint" → use the `render.yaml`
3. Render will provision: Frontend, Backend, PostgreSQL, Redis, Worker
4. Set environment variables (API keys for Coinbase, Flutterwave, Solana)
5. Run `npx prisma migrate deploy && npx ts-node src/seeds/seed.ts` on the backend

---

## Features (Phase 1 MVP)

### Trading
- **AI Signal Feed** — Real-time signals with 5-indicator confluence (RSI, MACD, MA crossover, Bollinger, Stochastic)
- **Advanced Charts** — TradingView lightweight-charts with 10 indicators
- **Trade Box** — Paper trading with position tracking and P&L
- **Watchlist** — Add/remove instruments with live price display
- **Forecast Calculator** — Manual price/time predictions based on HH/LL structure

### Subscriptions
- **7 Tiers:** Light ($0) → Vision ($9) → AI Trader ($49) → Elite ($149) → Hedge Fund ($679) → Ultra ($500+) → Institutional ($999+)
- **Signal Passes:** Binary, Scalping, Swing — hourly/daily/weekly/monthly

### Payments
- **Coinbase Commerce** — BTC, SOL, USDT
- **Flutterwave** — Mobile money (Africa-focused)
- Webhook auto-activation of subscriptions

### Community & Social
- **Community Pulse** — 3D globe with real-time join ticker
- **Affiliate System** — 50% first referral, 10% lifetime, $50 Elite+ bonus
- **Ghost Seeding** — Admin can seed community events

### Admin
- **Godview Dashboard** — Users, Revenue, Signal Stats, AI Config
- **Director-only access** (christophermuto81@gmail.com)

### Blockchain
- **Solana Devnet Wallets** — Auto-created on signup
- **LX Token Account** — SPL token ready
- **Affiliate payouts in LX** — Coming Phase 2

---

## API Documentation

Swagger UI available at: `http://localhost:4000/api/docs`

### Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/users/me` | Get profile |
| GET | `/api/subscriptions/tiers` | List subscription tiers |
| GET | `/api/signals` | Get active signals |
| POST | `/api/trades/open` | Open paper trade |
| POST | `/api/trades/:id/close` | Close trade |
| GET | `/api/trades/pnl` | P&L summary |
| GET | `/api/brokers` | List brokers |
| GET | `/api/community/events` | Community events |
| POST | `/api/affiliates/register` | Register as affiliate |
| GET | `/api/admin/dashboard` | Admin stats (ADMIN only) |

---

## Phase 2 Roadmap

- [ ] Iron Dome — Fraud detection & security layer
- [ ] Ghost Tracker — Market maker tracking
- [ ] Latrux AI Integration — Mistral-7B signal generation
- [ ] Proprietary Charts — Canvas/WebGL engine with 200+ indicators
- [ ] Maker Engine — Visual drag-and-drop API connector
- [ ] Copy Trading — Follow top performers
- [ ] LX Token Staking & Governance
- [ ] White-Label Broker Rental
- [ ] Mobile Apps (React Native)

---

## License

Proprietary — All rights reserved by Tatenda Christopher Muto.
