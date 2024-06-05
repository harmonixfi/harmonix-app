import { Card } from '@nextui-org/react';

import VaultTabs from '@/components/products/VaultTabs';
import Page from '@/components/shared/Page';
import { toCurrency } from '@/utils/currency';
import { withCommas } from '@/utils/number';

export default async function Products() {
  return (
    <Page title="Vaults">
      <div>
        <Card className="flex flex-col lg:flex-row items-center justify-between gap-4 px-8 py-4 rounded-3xl mb-12">
          <div>
            <div className="ư-full xl:w-3/4 space-y-3">
              <p className="text-xl font-semibold text-primary">Lorem Ipsum</p>
              <p className="text-base text-primary font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam suscipit in dolor
                possimus amet fugiat rerum vel illo blanditiis expedita? Repudiandae, magni
                distinctio?
              </p>
            </div>
          </div>
          <div className="w-full lg:w-auto flex items-center justify-center gap-12 bg-secondary rounded-2xl px-8 lg:px-12 py-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-base text-primary opacity-60">TVL</p>
              <p className="text-lg text-primary font-bold">{toCurrency(2000)}</p>
            </div>
            <span className="w-[1px] h-10 bg-rock-g80 bg-opacity-30" />
            <div className="flex flex-col items-center gap-2">
              <p className="text-base text-primary opacity-60">Depositors</p>
              <p className="text-lg text-primary font-bold">{withCommas(1200)}</p>
            </div>
          </div>
        </Card>

        <VaultTabs />

        {/* <VaultFilter /> */}
      </div>
    </Page>
  );
}
