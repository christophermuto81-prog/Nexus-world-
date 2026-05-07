export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN' | 'PARTNER';
  solanaAddress?: string;
  kycStatus?: string;
  lxTokenAccount?: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  signalsPerDay: number;
  indicators: number;
  autoExecution: boolean;
  description: string;
  features: string[];
}

export interface Signal {
  id: string;
  instrumentId: string;
  instrument?: Instrument;
  type: 'BINARY' | 'SCALPING' | 'SWING';
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  confidence: number;
  timeframe: string;
  status: string;
  createdAt: string;
}

export interface Trade {
  id: string;
  instrument: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number | null;
  quantity: number;
  stopLoss: number | null;
  takeProfit: number | null;
  pnl: number | null;
  status: 'OPEN' | 'CLOSED' | 'CANCELLED';
  openedAt: string;
  closedAt: string | null;
}

export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  assetClassId: string;
}

export interface Broker {
  id: string;
  name: string;
  logo: string | null;
  website: string;
  apiSupport: boolean;
  assetTypes: string[];
  description: string | null;
  rating: number;
}

export interface CommunityEvent {
  id: string;
  type: string;
  message: string;
  location: string | null;
  createdAt: string;
}

export interface PnlSummary {
  totalTrades: number;
  totalPnl: number;
  wins: number;
  losses: number;
  winRate: number;
}
