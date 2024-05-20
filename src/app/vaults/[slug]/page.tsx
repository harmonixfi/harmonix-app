import { getUnixTime } from 'date-fns';
import { UTCTimestamp } from 'lightweight-charts';
import { notFound } from 'next/navigation';

import { getVaultInfo, getVaultPerformance } from '@/api/vault';
import { LineChartData } from '@/components/shared/chart/LineChart';
import Navbar from '@/components/shared/navbar/Navbar';
import VaultDetailTemplate from '@/components/vault/detail/VaultDetailTemplate';
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
    vaultInfo: { slug, name, apr, apy: vaultApy },
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
    <div className="relative z-40 pb-16 sm:pb-40">
      <Navbar />

      <VaultDetailTemplate
        timeVisible={name.toLowerCase().includes('delta')}
        slug={slug}
        name={name}
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
  );
}
