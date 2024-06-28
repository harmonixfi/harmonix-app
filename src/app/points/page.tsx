import type { Metadata } from 'next';

import PointGuide from '@/components/rewards/PointGuide';
import PointRewardTable from '@/components/rewards/PointRewardTable';
import Page from '@/components/shared/Page';

import {
  metaImageUrl,
  metaOpenGraphType,
  metaTwitterCard,
  metaTwitterSite,
} from '../shared-metadata';

const metaTitle = 'Point Reward';
const metaDescription = `Participate in the Harmonix Point Reward System and earn points for various activities. Redeem points for exclusive rewards and enhance your investment experience.`;

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

export default async function Rewards() {
  return (
    <Page title="Points">
      <div className="max-w-5xl flex flex-col gap-6 mx-auto">
        <PointGuide />
        <PointRewardTable />
      </div>
    </Page>
  );
}
