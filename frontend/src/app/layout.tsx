import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LatruxTrade — Autonomous Trading Intelligence',
  description: 'AI-powered trading signals, strategy builder, and automated execution platform by Latrux AI',
  keywords: ['trading', 'AI', 'signals', 'crypto', 'forex', 'Latrux'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
