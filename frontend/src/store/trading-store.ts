'use client';

import { create } from 'zustand';
import { api } from '@/lib/api';
import type { Signal, Trade, PnlSummary } from '@/types';

interface TradingState {
  signals: Signal[];
  trades: Trade[];
  positions: Trade[];
  pnl: PnlSummary | null;
  prices: Record<string, number>;
  isLoading: boolean;
  fetchSignals: (type?: string) => Promise<void>;
  fetchTrades: (status?: string) => Promise<void>;
  fetchPositions: () => Promise<void>;
  fetchPnl: () => Promise<void>;
  openTrade: (data: any) => Promise<void>;
  closeTrade: (tradeId: string, exitPrice: number) => Promise<void>;
  updatePrice: (symbol: string, price: number) => void;
}

export const useTradingStore = create<TradingState>((set, get) => ({
  signals: [],
  trades: [],
  positions: [],
  pnl: null,
  prices: {},
  isLoading: false,

  fetchSignals: async (type) => {
    set({ isLoading: true });
    try {
      const signals = await api.getSignals(type) as Signal[];
      set({ signals, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchTrades: async (status) => {
    const trades = await api.getTrades(status) as Trade[];
    set({ trades });
  },

  fetchPositions: async () => {
    const positions = await api.getOpenPositions() as Trade[];
    set({ positions });
  },

  fetchPnl: async () => {
    const pnl = await api.getPnlSummary() as PnlSummary;
    set({ pnl });
  },

  openTrade: async (data) => {
    await api.openTrade(data);
    await get().fetchPositions();
  },

  closeTrade: async (tradeId, exitPrice) => {
    await api.closeTrade(tradeId, exitPrice);
    await Promise.all([get().fetchPositions(), get().fetchPnl()]);
  },

  updatePrice: (symbol, price) => {
    set((state) => ({
      prices: { ...state.prices, [symbol]: price },
    }));
  },
}));
