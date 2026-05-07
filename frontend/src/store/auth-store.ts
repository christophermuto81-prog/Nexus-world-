'use client';

import { create } from 'zustand';
import { api } from '@/lib/api';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await api.login(email, password);
      api.setToken(token);
      set({ user, token, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await api.register(email, password, name);
      api.setToken(token);
      set({ user, token, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    api.clearToken();
    set({ user: null, token: null });
  },

  loadUser: async () => {
    const token = api.getToken();
    if (!token) return;
    try {
      const user = await api.getProfile() as User;
      set({ user, token });
    } catch {
      api.clearToken();
      set({ user: null, token: null });
    }
  },
}));
