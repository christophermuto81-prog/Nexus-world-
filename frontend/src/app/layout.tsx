import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LatruxTrade — Autonomous Trading Intelligence',
  description: 'AI-powered trading signals, strategy builder, and automated execution platform by Latrux AI. We Are Time. Live the Future. Not Tomorrow. Now.',
  keywords: ['trading', 'AI', 'signals', 'crypto', 'forex', 'Latrux', 'autonomous', 'binary options', 'scalping'],
  openGraph: {
    title: 'LatruxTrade — Autonomous Trading Intelligence',
    description: 'AI-powered signals, strategy builder, and automated execution. The self-evolving trading ecosystem.',
    images: [{ url: '/preview.png', width: 1200, height: 630, alt: 'LatruxTrade Platform' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LatruxTrade — Autonomous Trading Intelligence',
    description: 'AI-powered signals, strategy builder, and automated execution.',
    images: ['/preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="splash-screen" aria-hidden="true">
          <div className="geometric-pulse" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
