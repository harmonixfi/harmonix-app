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
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-24 pr-8">
          <div>
            <p className="text-xl font-semibold">Lorem Ipsum</p>
            <p className="text-sm font-light mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam suscipit in dolor
              possimus amet fugiat rerum vel illo blanditiis expedita? Repudiandae, magni
              distinctio?
            </p>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <TelegramIcon className="w-6 h-6" />
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">TVL</p>
                <p className="font-semibold">{toCurrency(2000)}</p>
              </div>
            </div>
            <span className="w-[1px] h-10 bg-gray-300" />
            <div className="flex items-center gap-4">
              <TelegramIcon className="w-6 h-6" />
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Depositors</p>
                <p className="font-semibold">{withCommas(1200)}</p>
              </div>
            </div>
          </div>
        </div>

        <VaultFilter />

        <VaultList />
      </div>
    </Page>
  );
}
