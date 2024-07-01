import type { Metadata } from 'next';

import { getVaultStatistic } from '@/api/statistic';
import {
  metaImageUrl,
  metaOpenGraphType,
  metaTwitterCard,
  metaTwitterSite,
} from '@/app/shared-metadata';
import { VaultDashboardTemplate } from '@/components/dashboard';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const vaultStatistic = await getVaultStatistic(String(id));

  const { slug } = vaultStatistic;

  let metaTitle = '';
  let metaDescription = '';

  if (slug.includes('option')) {
    metaTitle = 'Harmonix - Options Wheel';
    metaDescription = `This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not only exceed the performance of holding ETH alone by 20%-50% but also to minimize drawdowns by up to 50% during bearish/downward market trends.`;
  } else if (slug.includes('renzo')) {
    metaTitle = 'Harmonix - Renzo Restaking';
    metaDescription = `Generate yield by swapping 50% of the fund deposit into ETH and re-staking it on Renzo, while converting the remaining 50% into stablecoins and shorting at 1x leverage on decentralized derivative exchanges.`;
  } else if (slug.includes('kelpdao')) {
    metaTitle = 'Harmonix - Kelp DAO Restaking';
    metaDescription = `Increase yield by converting half of the fund deposit into ETH and re-staking it on KelpDAO. Meanwhile, exchange the other half for stablecoins and open a 1x short position on decentralized derivative exchanges.`;
  } else if (slug.includes('base')) {
    metaTitle = 'Harmonix - BSX';
    metaDescription = `Generate yield by shorting ETH on BSX with a favorable funding rate, while holding ETH in spot or yield to be neutral delta against USD.`;
  } else if (slug.includes('etherfi')) {
    metaTitle = 'Harmonix - Etherfi';
    metaDescription = `Generate yield by shorting ETH on Etherfi with a favorable funding rate, while holding ETH in spot or yield to be neutral delta against USD.`;
  } else {
    metaTitle = 'Harmonix - Delta Neutral';
    metaDescription = `Generate yield by shorting ETH on a perp markets with a favorable funding rate, while holding ETH in spot or yield to be neutral delta against USD.`;
  }

  return {
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
}

export default async function VaultDashboard() {
  return <VaultDashboardTemplate />;
}
