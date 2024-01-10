import Image from 'next/image';
import Link from 'next/link';

import { getVaultInfo } from '@/api/vault';
import VaultCard from '@/components/lauch-app/VaultCard';
import NetworkSelect from '@/components/shared/NetworkSelect';
import Select from '@/components/shared/Select';
import WalletConnectButton from '@/components/shared/WalletConnectButton';

import logoImg from '../../../public/images/logo.png';

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function LaunchApp() {
  const {
    vaultInfo: { monthly_apy, total_deposit },
  } = await getData();

  return (
    <>
      <nav className="w-full flex flex-wrap items-center justify-between py-8">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={logoImg}
            alt="Rock Onyx Logo"
            width={28}
            height={36}
            className="w-auto h-full"
          />
          <p className="text-3xl uppercase hidden sm:inline-block">Rock Onyx</p>
        </Link>
        <ul className="hidden sm:flex items-center gap-12">
          <li className="text-base font-light uppercase cursor-pointer hover:font-medium">
            Product
          </li>
          <li className="text-base font-light uppercase opacity-30 cursor-pointer hover:font-medium">
            Portfolio
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <NetworkSelect />
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
        <div className="w-48">
          <Select
            placeholder="Strategy type"
            options={[
              { value: 'deltaNeutral', label: 'Delta neutral' },
              { value: 'hedging', label: 'Hedging' },
            ]}
          />
        </div>
        <div className="w-48">
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

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full sm:w-4/5 mx-auto mt-12 sm:mt-32 mb-36 sm:mb-60">
        <VaultCard
          name="Stable Coin Vault"
          link="/stable-coin-vault"
          apy={Math.round(monthly_apy)}
          tvl={total_deposit}
          maxCapacity={4000000}
        />
      </div>

      <div className="absolute top-[56%] 2xl:top-[40%] w-full h-[100vh] opacity-60 blur-[60px] overflow-y-hidden">
        <div
          className="w-full h-full absolute top-full left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[290px] rotate-[-15deg]"
          style={{
            background: 'linear-gradient(243deg, #D3382C 30.36%, #001AFF 70.7%)',
          }}
        />
      </div>
    </>
  );
}
