import { Abi } from 'viem';

import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { getVaultInfo } from '@/api/vault';
import VaultCard from '@/components/products/VaultCard';
import Select from '@/components/shared/Select';
import Navbar from '@/components/shared/navbar/Navbar';
import { Urls } from '@/constants/urls';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function Products() {
  const {
    vaultInfo: { monthly_apy },
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

      <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6 xl:gap-8 w-[90%] sm:w-3/5 md:w-3/4 lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-24 md:mb-32 xl:mb-48 px-6 sm:px-0">
        <VaultCard
          name="Stable Coin Vault"
          link={`${Urls.Vaults}${Urls.StableCoinVault}`}
          apy={Math.round(monthly_apy)}
          maxCapacity={4000000}
          vaultAbi={rockOnyxUsdtVaultAbi as Abi}
          vaultAddress={rockOnyxUsdtVaultAddress}
        />

        <VaultCard
          name="Delta Neutral Vault"
          link={`${Urls.Vaults}${Urls.DeltaNeutralVault}`}
          color="secondary"
          maxCapacity={4000000}
          vaultAbi={rockOnyxDeltaNeutralVaultAbi as Abi}
          vaultAddress={rockOnyxDeltaNeutralVaultAddress}
        />
      </div>
    </>
  );
}
