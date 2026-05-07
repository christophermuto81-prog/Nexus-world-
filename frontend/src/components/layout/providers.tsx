'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useAuthStore } from '@/store/auth-store';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { loadUser } = useAuthStore();
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthInitializer>{children}</AuthInitializer>
    </SessionProvider>
  );
}
