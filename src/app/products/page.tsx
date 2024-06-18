import { Card } from '@nextui-org/react';

import { getVaultsOverview } from '@/api/statistic';
import VaultTabs from '@/components/products/VaultTabs';
import Page from '@/components/shared/Page';
import { toCurrency } from '@/utils/currency';
import { withCommas } from '@/utils/number';

async function getData() {
  const response = await getVaultsOverview();
  return response;
}

export default async function Products() {
  const { tvl_in_all_vaults, total_depositors } = await getData();

  return (
    <Page title="Vaults">
      <div>
        <Card className="flex flex-col lg:flex-row items-center justify-between gap-4 px-8 py-4 rounded-3xl mb-12">
          <div className="w-full space-y-3">
            <p className="text-xl font-semibold text-primary">Harmonix&apos;s Vaults</p>
            <p className="text-base text-primary font-normal">
              Crypto investment on autopilot. Secure your wealth, earn more with automated hedging.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-72 xl:min-w-96 grid grid-cols-2 bg-secondary rounded-2xl px-0 py-4">
            <div className="flex flex-col items-center justify-center gap-2 border-r border-rock-g80 border-opacity-30">
              <p className="text-base text-primary opacity-60">TVL</p>
              <p className="text-lg text-primary font-bold">{toCurrency(tvl_in_all_vaults)}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-base text-primary opacity-60">Depositors</p>
              <p className="text-lg text-primary font-bold">{withCommas(total_depositors)}</p>
            </div>
          </div>
        </Card>

        <VaultTabs />
      </div>
    </Page>
  );
}
