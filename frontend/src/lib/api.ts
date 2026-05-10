const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('latrux_token', token);
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('latrux_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('latrux_token');
    }
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || 'Request failed');
    }

    return res.json();
  }

  // Auth
  register(email: string, password: string, name?: string) {
    return this.request<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  login(email: string, password: string) {
    return this.request<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  getProfile() {
    return this.request('/api/users/me');
  }

  // Subscriptions
  getTiers() {
    return this.request('/api/subscriptions/tiers');
  }

  getSignalPasses() {
    return this.request('/api/subscriptions/signal-passes');
  }

  subscribe(tierId: string, paymentId?: string) {
    return this.request('/api/subscriptions/subscribe', {
      method: 'POST',
      body: JSON.stringify({ tierId, paymentId }),
    });
  }

  getMySubscription() {
    return this.request('/api/subscriptions/my-subscription');
  }

  // Signals
  getSignals(type?: string) {
    const params = type ? `?type=${type}` : '';
    return this.request(`/api/signals${params}`);
  }

  getSignalStats() {
    return this.request('/api/signals/stats');
  }

  // Trades
  openTrade(data: any) {
    return this.request('/api/trades/open', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  closeTrade(tradeId: string, exitPrice: number) {
    return this.request(`/api/trades/${tradeId}/close`, {
      method: 'POST',
      body: JSON.stringify({ exitPrice }),
    });
  }

  getTrades(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.request(`/api/trades${params}`);
  }

  getOpenPositions() {
    return this.request('/api/trades/positions');
  }

  getPnlSummary() {
    return this.request('/api/trades/pnl');
  }

  // Brokers
  getBrokers(search?: string) {
    const params = search ? `?search=${search}` : '';
    return this.request(`/api/brokers${params}`);
  }

  // Community
  getCommunityEvents(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/api/community/events${params}`);
  }

  // Affiliate
  registerAffiliate() {
    return this.request('/api/affiliates/register', { method: 'POST' });
  }

  getAffiliateInfo() {
    return this.request('/api/affiliates/me');
  }

  // Admin
  getAdminDashboard() {
    return this.request('/api/admin/dashboard');
  }

  getAdminUsers() {
    return this.request('/api/admin/users');
  }

  // Payments
  createCoinbasePayment(amount: number, description: string, tierId?: string) {
    return this.request('/api/payments/coinbase', {
      method: 'POST',
      body: JSON.stringify({ amount, description, tierId }),
    });
  }
}

export const api = new ApiClient();
