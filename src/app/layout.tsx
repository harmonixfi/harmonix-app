import { Suspense } from 'react';

import type { Metadata } from 'next';

import '@rainbow-me/rainbowkit/styles.css';
import { Inter, Sora } from 'next/font/google';

import GoogleAnalytics from '@/components/scripts/GoogleAnalytics';
import Footer from '@/components/shared/Footer';

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
  title: 'Rock Onyx',
  description: 'Automatic Hedging Vaults While Earning Good Yields With Low Risk',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.className} bg-rock-bg`}>
      <body className="font-inconsolata">
        <Providers>
          <Suspense fallback={<Loading />}>
            <main className="relative pb-4">
              <div>{children}</div>
              <Footer />
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
