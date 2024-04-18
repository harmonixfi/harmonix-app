import { PieChartWidget, TextWidget, VaultWidget } from '@/components/dashboard';
import HomeNavbar from '@/components/shared/navbar/HomeNavbar';
import { toCurrency } from '@/utils/currency';

export default async function MainDashboard() {
  return (
    <div className="max-w-[90%] mx-auto">
      <HomeNavbar />
      <div className="w-full flex flex-col items-center gap-6 pb-24">
        <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold uppercase mt-0 sm:mt-12 mb-8">
          Dashboard
        </h3>
        <div className="w-[90%] sm:w-4/5 md:w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1050px] grid md:grid-cols-2 gap-8">
          <TextWidget title="TVL in all vaults" value={toCurrency(1000000)} />
          <PieChartWidget title="TVL Compositions" />
          <VaultWidget name="Options wheel" tvl={2650} pricePerShare={1} apy={12} riskFactor={2} />
          <VaultWidget name="Delta neutral" tvl={2650} pricePerShare={1} apy={12} riskFactor={2} />
        </div>
      </div>
    </div>
  );
}
