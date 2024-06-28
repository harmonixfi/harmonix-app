import type { Metadata } from 'next';

import ReferralDetail from '@/components/referral/ReferralDetail';
import ReferralGuide from '@/components/referral/ReferralGuide';
import Page from '@/components/shared/Page';

import {
  metaImageUrl,
  metaOpenGraphType,
  metaTwitterCard,
  metaTwitterSite,
} from '../shared-metadata';

const metaTitle = 'Referral Program';
const metaDescription = `Join the Harmonix Referral Program and earn rewards by inviting others to our platform. Share the benefits of advanced DeFi strategies and get up to 8% commission.`;

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  twitter: {
    site: metaTwitterSite,
    title: metaTitle,
    description: metaDescription,
    card: metaTwitterCard,
    images: {
      url: metaImageUrl,
    },
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: metaOpenGraphType,
    images: { url: metaImageUrl },
  },
};

export default async function Referral() {
  return (
    <Page title="Referral Program">
      <div className="max-w-2xl xl:max-w-6xl grid xl:grid-cols-2 gap-8 mx-auto">
        <ReferralGuide />
        <ReferralDetail />
      </div>
    </Page>
  );
}
