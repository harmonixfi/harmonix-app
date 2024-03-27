import { getVaults } from '@/api/vault';
import VaultCard from '@/components/products/VaultCard';
import Select from '@/components/shared/Select';
import Navbar from '@/components/shared/navbar/Navbar';
import { Urls } from '@/constants/urls';
import { vaultCardMapping } from '@/services/vaultMapping';

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

      <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6 xl:gap-8 w-[90%] sm:w-3/5 md:w-3/4 lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-24 md:mb-32 xl:mb-48 px-6 sm:px-0">
        {vaults.map((vault) => {
          const { color, vaultAbi, vaultAddress } = vaultCardMapping(vault);
          return (
            <VaultCard
              key={vault.id}
              name={vault.name}
              link={`${Urls.Vaults}/${vault.slug}`}
              color={color}
              apy={Math.floor(vault.monthly_apy || 0)}
              maxCapacity={vault.vault_capacity}
              vaultAbi={vaultAbi}
              vaultAddress={vaultAddress}
            />
          );
        })}
      </div>
    </>
  );
}
