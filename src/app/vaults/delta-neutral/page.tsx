import { getVaultInfo, getVaultPerformance } from '@/api/vault';
import { LineChartData } from '@/components/shared/chart/LineChart';
import Navbar from '@/components/shared/navbar/Navbar';
import DeltaNeutralDetail from '@/components/vault/delta-neutral/DeltaNeutralDetail';

async function getData() {
  const [vaultInfo, vaultPerformance] = await Promise.all([getVaultInfo(), getVaultPerformance()]);

  return { vaultInfo, vaultPerformance };
}

export default async function DeltaNeutralVault() {
  const {
    vaultInfo: { apr, weekly_apy, monthly_apy },
    vaultPerformance: { date, cum_return, benchmark_ret },
  } = await getData();

  const marketData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: benchmark_ret[index],
  }));

  const onyxData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: cum_return[index],
  }));

  return (
    <div className="relative z-40 pb-16 sm:pb-40">
      <Navbar />

      <DeltaNeutralDetail
        weeklyApy={weekly_apy}
        monthlyApy={monthly_apy}
        apr={apr}
        marketData={marketData}
        onyxData={onyxData}
      />
    </div>
  );
}
