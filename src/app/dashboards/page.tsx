import type { Metadata } from 'next';

import { DashboardsTemplate } from '@/components/dashboard';
import Page from '@/components/shared/Page';

import {
  metaImageUrl,
  metaOpenGraphType,
  metaTwitterCard,
  metaTwitterSite,
} from '../shared-metadata';

const metaTitle = 'Harmonix Dashboard';
const metaDescription = `Provide a clear view of Harmonix's performance, displaying each vault's APY, TVL, and key STATISTICS at a glance.`;

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

export default async function MainDashboard() {
  return (
    <Page title="Dashboard">
      <DashboardsTemplate />
    </Page>
  );
}
