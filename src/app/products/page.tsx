import { Card } from '@nextui-org/react';

import { getVaultsOverview } from '@/api/vault';
import VaultTabs from '@/components/products/VaultTabs';
import Page from '@/components/shared/Page';
import { toCurrency } from '@/utils/currency';
import { withCommas } from '@/utils/number';

async function getData() {
  const response = await getVaultsOverview();
  return response;
}

export default async function Products() {
  const { tvl_in_all_vaults } = await getData();

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
          <div className="w-full lg:w-auto flex items-center justify-center gap-12 bg-secondary rounded-2xl px-8 lg:px-12 py-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-base text-primary opacity-60">TVL</p>
              <p className="text-lg text-primary font-bold">{toCurrency(tvl_in_all_vaults)}</p>
            </div>
            <span className="w-[1px] h-10 bg-rock-g80 bg-opacity-30" />
            <div className="flex flex-col items-center gap-2">
              <p className="text-base text-primary opacity-60">Depositors</p>
              <p className="text-lg text-primary font-bold">{withCommas(20)}+</p>
            </div>
          </div>
        </Card>

        <VaultTabs />
      </div>
    </Page>
  );
}
