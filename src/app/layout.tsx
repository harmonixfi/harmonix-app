import { Suspense } from 'react';

import type { Metadata } from 'next';

import '@rainbow-me/rainbowkit/styles.css';
import { Sora } from 'next/font/google';

import Footer from '@/components/shared/Footer';

import Providers from './_providers/Providers';
import './globals.css';
import Loading from './loading';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rock Onyx',
  description: 'Automatic Hedging Vaults While Earning Good Yields With Low Risk',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.className} bg-rock-bg`}>
      <body className="font-inconsolata">
        <Providers>
          <Suspense fallback={<Loading />}>
            <main className="relative max-w-[90%] mx-auto pb-4">
              <div>{children}</div>
              <Footer />
            </main>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
