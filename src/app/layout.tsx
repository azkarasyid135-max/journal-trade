import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { TradeProvider } from '@/lib/trades-store';

export const metadata: Metadata = {
  title: 'Journal Forex',
  description: 'Modern trading journal dashboard with AI review and risk management.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TradeProvider>
          <AppShell>{children}</AppShell>
        </TradeProvider>
      </body>
    </html>
  );
}
