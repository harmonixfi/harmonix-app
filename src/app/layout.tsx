import { Suspense } from 'react';

import type { Metadata } from 'next';

import '@rainbow-me/rainbowkit/styles.css';
import { Outfit } from 'next/font/google';

import GoogleAnalytics from '@/components/scripts/GoogleAnalytics';
import Sidebar from '@/components/shared/Sidebar';

import Providers from './_providers/Providers';
import './globals.css';
import Loading from './loading';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Harmonix',
  description: 'Automatic Hedging Vaults While Earning Good Yields With Low Risk',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.className} bg-[#F5F5F5]`}>
      <body className="font-inconsolata">
        <Providers>
          <Suspense fallback={<Loading />}>
            <main className="flex h-screen">
              <Sidebar />
              <div className="flex-1">
                <div className="h-full">{children}</div>
              </div>
            </main>
          </Suspense>
        </Providers>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
      </body>
    </html>
  );
}
