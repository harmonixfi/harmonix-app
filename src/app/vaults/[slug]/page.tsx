import type { Metadata } from 'next';

import { getUnixTime } from 'date-fns';
import { UTCTimestamp } from 'lightweight-charts';
import { notFound } from 'next/navigation';

import { getVaultInfo, getVaultPerformance } from '@/api/vault';
import {
  metaImageUrl,
  metaOpenGraphType,
  metaTwitterCard,
  metaTwitterSite,
} from '@/app/shared-metadata';
import Page from '@/components/shared/Page';
import { LineChartData } from '@/components/shared/chart/LineChart';
import VaultDetailTemplate from '@/components/vault/detail/VaultDetailTemplate';
import { Urls } from '@/constants/urls';
import { vaultDetailMapping } from '@/services/vaultMapping';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

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

async function getData(slug: string) {
  const [vaultInfo, vaultPerformance] = await Promise.all([
    getVaultInfo(slug),
    getVaultPerformance(slug),
  ]);

  return { vaultInfo, vaultPerformance };
}

export default async function VaultPage({ params }: Props) {
  const {
    vaultInfo: { id, slug, name, apr, apy: vaultApy, contract_address, points, network_chain },
    vaultPerformance: { date, apy },
  } = await getData(params.slug);

  if (!name) {
    notFound();
  }

  const onyxData: LineChartData[] = date.map((item, index) => ({
    time: getUnixTime(new Date(item)) as UTCTimestamp,
    value: apy[index],
  }));

  const { withdrawal } = vaultDetailMapping(name);

  return (
    <Page backUrl={Urls.Products}>
      <div className="relative z-40 pb-16 sm:pb-40">
        <VaultDetailTemplate
          timeVisible={name.toLowerCase().includes('delta')}
          id={id}
          slug={slug}
          name={name}
          contractAddress={contract_address}
          points={points}
          networkChain={network_chain}
          apy={vaultApy || 0}
          apr={apr || 0}
          onyxData={onyxData}
          withdrawal={withdrawal}
        />
      </div>
    </Page>
  );
}
