import Image from 'next/image';
import Link from 'next/link';

import { getVaultInfo } from '@/api/vault';
import VaultCard from '@/components/lauch-app/VaultCard';
// import NetworkSelect from '@/components/shared/NetworkSelect';
import Select from '@/components/shared/Select';
import WalletConnectButton from '@/components/shared/WalletConnectButton';

import logoImg from '../../../public/images/logo.png';

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function LaunchApp() {
  const {
    vaultInfo: { weekly_apy },
  } = await getData();

  return (
    <>
      <nav className="w-full grid grid-cols-12 p-4">
        <div className="col-span-1 lg:col-span-3 flex items-center">
          <Link href="/" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block">
            <Image
              src={logoImg}
              alt="Rock Onyx Logo"
              width="100"
              height="100"
              className="w-full h-auto"
            />
          </Link>
        </div>
        <ul className="hidden md:flex items-center lg:justify-center gap-8 lg:gap-12 col-span-6 lg:col-span-4 xl:col-span-6 pl-6 lg:pl-0">
          <li className="text-base font-extralight uppercase cursor-pointer hover:font-medium">
            Product
          </li>
          <li className="text-base font-extralight uppercase opacity-30 cursor-pointer hover:font-medium">
            Portfolio
          </li>
        </ul>
        <div className="flex items-center justify-end gap-4 col-span-11 md:col-span-5 lg:col-span-5 xl:col-span-3">
          {/* <NetworkSelect /> */}
          <WalletConnectButton />
        </div>
      </nav>
      <div
        className="w-full h-[1px]"
        style={{
          background:
            'linear-gradient(270deg, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
        }}
      />

      <div className="flex flex-wrap gap-6 w-fit mt-12 mx-auto">
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

      <div className="relative z-50 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full sm:w-4/5 mx-auto mt-12 sm:mt-32 mb-36 sm:mb-60">
        <VaultCard
          name="Stable Coin Vault"
          link="/stable-coin-vault"
          apy={Math.round(weekly_apy)}
          maxCapacity={4000000}
        />
      </div>
    </>
  );
}
