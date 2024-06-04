import { Card } from '@nextui-org/react';

import VaultFilter from '@/components/products/VaultFilter';
import VaultList from '@/components/products/VaultList';
import Page from '@/components/shared/Page';
import { TelegramIcon } from '@/components/shared/icons';
import { toCurrency } from '@/utils/currency';
import { withCommas } from '@/utils/number';

export default async function Products() {
  return (
    <Page title="Vaults">
      <div className="flex flex-col gap-12">
        <Card className="flex flex-row items-center justify-between px-8 py-4 rounded-3xl">
          <div>
            <div className="w-3/4 space-y-3">
              <p className="text-xl font-semibold text-primary">Lorem Ipsum</p>
              <p className="text-sm text-primary font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam suscipit in dolor
                possimus amet fugiat rerum vel illo blanditiis expedita? Repudiandae, magni
                distinctio?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-12 bg-secondary rounded-2xl px-8 py-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-primary opacity-60">TVL</p>
              <p className="text-lg text-primary font-medium">{toCurrency(2000)}</p>
            </div>
            <span className="w-[1px] h-10 bg-rock-g80 bg-opacity-30" />
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-primary opacity-60">Depositors</p>
              <p className="text-lg text-primary font-medium">{withCommas(1200)}</p>
            </div>
          </div>
        </Card>

        <VaultFilter />

        <VaultList />
      </div>
    </Page>
  );
}
