import { getVaultInfo } from '@/api/vault';
import ActivePositions from '@/components/portfolio/ActivePositions';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';
import Navbar from '@/components/shared/navbar/Navbar';

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function Portfolio() {
  const {
    vaultInfo: { monthly_apy },
  } = await getData();
  return (
    <>
      <Navbar />

      <div className="w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-16 md:mb-32 xl:mb-48 px-6 sm:px-4 md:px-8 lg:px-0">
        <PortfolioOverview />

        <ActivePositions monthlyApy={Math.round(monthly_apy)} />
      </div>
    </>
  );
}
