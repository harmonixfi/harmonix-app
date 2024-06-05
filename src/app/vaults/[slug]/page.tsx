import { getUnixTime } from 'date-fns';
import { UTCTimestamp } from 'lightweight-charts';
import { notFound } from 'next/navigation';

import { getVaultInfo, getVaultPerformance } from '@/api/vault';
import Page from '@/components/shared/Page';
import { LineChartData } from '@/components/shared/chart/LineChart';
import VaultDetailTemplate from '@/components/vault/detail/VaultDetailTemplate';
import { Urls } from '@/constants/urls';
import { vaultDetailMapping } from '@/services/vaultMapping';

async function getData(slug: string) {
  const [vaultInfo, vaultPerformance] = await Promise.all([
    getVaultInfo(slug),
    getVaultPerformance(slug),
  ]);

  return { vaultInfo, vaultPerformance };
}

export default async function VaultPage({ params }: { params: { slug: string } }) {
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

  const { description, parameter, overview, safetyAssurance, withdrawal } =
    vaultDetailMapping(name);

  return (
    <Page backUrl={Urls.Products}>
      <div className="relative z-40 pb-16 sm:pb-40">
        <VaultDetailTemplate
          timeVisible={name.toLowerCase().includes('delta')}
          id={id}
          slug={slug}
          name={name}
          contractAddress={contract_address}
          networkChain={network_chain}
          points={points}
          networkChain={network_chain}
          apy={vaultApy || 0}
          apr={apr || 0}
          onyxData={onyxData}
          description={description}
          parameter={parameter}
          overview={overview}
          safetyAssurance={safetyAssurance}
          withdrawal={withdrawal}
        />
      </div>
    </Page>
  );
}
