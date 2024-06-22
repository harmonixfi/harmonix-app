import { Suspense } from 'react';

import type { Metadata } from 'next';

import '@rainbow-me/rainbowkit/styles.css';
import { Outfit } from 'next/font/google';

import GoogleAnalytics from '@/components/scripts/GoogleAnalytics';
import FeedbackButton from '@/components/shared/FeedbackButton';
import ReferralDialog from '@/components/shared/ReferralDialog';
import Sidebar from '@/components/shared/Sidebar';

import Providers from './_providers/Providers';
import './globals.css';
import Loading from './loading';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Harmonix Finance',
  description: 'Automatic Hedging Vaults While Earning Good Yields With Low Risk',
  twitter: {
    title: 'Harmonix Finance',
    description:
      'Building efficient hedge fund on-chain derivatives pools. Delta neutral. Option Wheel. Restaking. Juicy Yield. Low Risk.',
    card: 'summary_large_image',
    images: {
      url: '/images/twitter-banner.jpeg',
    },
  },
  openGraph: {
    title: 'Harmonix Finance',
    description:
      'Building efficient hedge fund on-chain derivatives pools. Delta neutral. Option Wheel. Restaking. Juicy Yield. Low Risk.',
    type: 'website',
    images: { url: '/images/twitter-banner.jpeg' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.className} bg-[#F5F5F5]`}>
      <body className="font-inconsolata">
        <Providers>
          <Suspense fallback={<Loading />}>
            <main className="flex h-screen relative">
              <Sidebar />
              <div className="flex-1">
                <div className="h-full">{children}</div>
              </div>
              <FeedbackButton />
              <ReferralDialog />
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
