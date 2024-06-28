import type { Metadata } from 'next';

import PortfolioTemplate from '@/components/portfolio/PortfolioTemplate';
import Page from '@/components/shared/Page';

import {
  metaImageUrl,
  metaOpenGraphType,
  metaTwitterCard,
  metaTwitterSite,
} from '../shared-metadata';

const metaTitle = 'Portfolio Management';
const metaDescription = `Manage your DeFi portfolio with ease. Our tools and insights help you optimize returns and achieve your financial goals.`;

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

export default async function Portfolio() {
  return (
    <Page title="Portfolio">
      <PortfolioTemplate />
    </Page>
  );
}
