import { getVaultInfo } from '@/api/vault';
import VaultCard from '@/components/products/VaultCard';
import Select from '@/components/shared/Select';
import Navbar from '@/components/shared/navbar/Navbar';

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function Products() {
  const {
    vaultInfo: { weekly_apy },
  } = await getData();

  return (
    <>
      <Navbar />

      <div className="hidden md:flex flex-wrap gap-6 w-fit mt-12 mx-auto px-6 sm:px-0">
        <div className="w-44">
          <Select
            placeholder="Strategy"
            options={[
              { value: 'deltaNeutral', label: 'Delta neutral' },
              { value: 'hedging', label: 'Hedging' },
            ]}
          />
        </div>
        <div className="w-52">
          <Select
            placeholder="Deposit asset"
            options={[
              { value: 'usdc', label: 'USDC' },
              { value: 'eth', label: 'ETH' },
              { value: 'btc', label: 'BTC' },
            ]}
          />
        </div>
        <div className="w-36">
          <Select
            placeholder="Sort by"
            options={[
              { value: 'name', label: 'Name' },
              { value: 'apy', label: 'APY' },
              { value: 'tvl', label: 'TVL' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:hidden gap-4 w-full px-6">
        <div>
          <Select
            placeholder="Filter"
            popupClassName="w-[50vw]"
            options={[
              { value: 'deltaNeutral', label: 'Delta neutral' },
              { value: 'hedging', label: 'Hedging' },
              { value: 'usdc', label: 'USDC' },
              { value: 'eth', label: 'ETH' },
              { value: 'btc', label: 'BTC' },
            ]}
          />
        </div>
        <div>
          <Select
            placeholder="Sort by"
            popupClassName="w-[50vw] right-0"
            options={[
              { value: 'name', label: 'Name' },
              { value: 'apy', label: 'APY' },
              { value: 'tvl', label: 'TVL' },
            ]}
          />
        </div>
      </div>

      <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 w-full sm:w-4/5 md:w-3/4 lg:w-5/6 2xl:w-4/5 mx-auto mt-6 sm:mt-24 mb-24 sm:mb-48 px-6 sm:px-0">
        <VaultCard
          name="Stable Coin Vault"
          link="/stable-coin-vault"
          apy={Math.round(weekly_apy)}
          maxCapacity={4000000}
        />

        <VaultCard name="Delta Neutral Vault" color="secondary" available={false} />
      </div>
    </>
  );
}
