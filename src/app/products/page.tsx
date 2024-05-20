import { getVaults } from '@/api/vault';
import VaultCard from '@/components/products/VaultCard';
import Select from '@/components/shared/Select';
import Navbar from '@/components/shared/navbar/Navbar';
import { Urls } from '@/constants/urls';

async function getData() {
  const vaults = await getVaults();
  return { vaults };
}

export default async function Products() {
  const { vaults } = await getData();

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

      <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 w-[90%] sm:w-3/5 md:w-5/6 lg:w-[calc(100%-24px)] xl:w-[90%] 2xl:w-3/4 3xl:w-[1350px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-24 md:mb-32 xl:mb-48 px-6 sm:px-0">
        {vaults.map((vault) => {
          return (
            <VaultCard
              key={vault.id}
              slug={vault.slug}
              name={vault.name}
              link={`${Urls.Vaults}/${vault.slug}`}
              apy={vault.apy || 0}
              maxCapacity={vault.vault_capacity}
            />
          );
        })}
      </div>
    </>
  );
}
