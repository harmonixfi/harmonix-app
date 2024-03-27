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
    vaultInfo: { name, apr, weekly_apy, monthly_apy },
    vaultPerformance: { date, apy_ytd },
  } = await getData(params.slug);

  const onyxData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: apy_ytd[index],
  }));

  const { description, parameter, overview, safetyAssurance } = vaultDetailMapping(name);

  return (
    <div className="relative z-40 pb-16 sm:pb-40">
      <Navbar />

      <VaultDetailTemplate
        name={name}
        weeklyApy={Math.floor(weekly_apy || 0)}
        monthlyApy={Math.floor(monthly_apy || 0)}
        apr={apr || 0}
        onyxData={onyxData}
        description={description}
        parameter={parameter}
        overview={overview}
        safetyAssurance={safetyAssurance}
      />
    </div>
  );
}
