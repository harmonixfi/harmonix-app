import { Suspense } from 'react';

import type { Metadata } from 'next';

import '@rainbow-me/rainbowkit/styles.css';
import { Inter, Sora } from 'next/font/google';

import GoogleAnalytics from '@/components/scripts/GoogleAnalytics';
import Sidebar from '@/components/shared/Sidebar';

import Providers from './_providers/Providers';
import './globals.css';
import Loading from './loading';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Harmonix',
  description: 'Automatic Hedging Vaults While Earning Good Yields With Low Risk',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.className} bg-[#F5F5F5]`}>
      <body className="font-inconsolata">
        <Providers>
          <Suspense fallback={<Loading />}>
            <main className="flex h-screen">
              <Sidebar />
              <div className="flex-1 pr-6 py-6">
                <div className="h-full rounded-xl border border-gray-200 bg-white overflow-auto">
                  {children}
                </div>
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
