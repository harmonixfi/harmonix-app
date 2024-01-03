'use client';

import { useState } from 'react';

import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';
import Image from 'next/image';

import rockOnyxAbi from '@/abi/RockOnyxUSDTVault.json';

import maxImg from '../../../public/images/max.png';
import { VaultIcon } from '../shared/icons';

const contractAddress = '0x9CF034CdFAcA16Ae8d691D9E2023983aDa4e1Ce8';

type VaultActionCardProps = {
  apr: number;
};

const VaultActionCard = (props: VaultActionCardProps) => {
  const { apr } = props;

  const [selectedTab, setSelectedTab] = useState<'deposit' | 'withdraw'>('deposit');

  const { contract } = useContract(contractAddress, rockOnyxAbi);
  const { mutateAsync, isLoading, error } = useContractWrite(contract, 'deposit');
  const address = useAddress();

  const { data: balanceOf } = useContractRead(contract, 'balanceOf', [address]);

  return (
    <div className="bg-[#5A5A5A] rounded-2xl bg-opacity-10 p-9">
      {balanceOf !== undefined && <p>Your balance: {BigNumber.from(balanceOf._hex).toString()}</p>}
      <Web3Button
        contractAddress={contractAddress}
        contractAbi={rockOnyxAbi}
        action={() =>
          mutateAsync({
            args: [1],
          })
        }
      >
        Execute Action
      </Web3Button>
      <ul className="flex w-full">
        <li className="flex-1">
          <button
            type="button"
            className={`w-full ${
              selectedTab === 'deposit' ? 'bg-rock-button shadow-xl' : ''
            }  rounded-full py-2.5 uppercase`}
            onClick={() => setSelectedTab('deposit')}
          >
            Deposit
          </button>
        </li>
        <li className="flex-1">
          <button
            type="button"
            className={`w-full ${
              selectedTab === 'withdraw' ? 'bg-rock-button shadow-xl' : ''
            }  rounded-full py-2.5 uppercase`}
            onClick={() => setSelectedTab('withdraw')}
          >
            Withdraw
          </button>
        </li>
      </ul>

      {selectedTab === 'withdraw' && (
        <div className="mt-10">
          <p className="text-3xl font-semibold uppercase text-rock-gray">Rock onyx vault</p>
          <div className="flex flex-col gap-6 bg-[#5A5A5A] rounded-2xl bg-opacity-10 mt-6 p-7">
            <div className="flex items-center justify-between">
              <p className="text-rock-gray">APR to date:</p>
              <p>{`${Math.round(apr)}%`}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-rock-gray">Withdrawals</p>
              <p>5 - 7 days</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-12">
        <p className="text-3xl text-rock-gray font-semibold uppercase">USDT AMOUNT</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-rock-gray">Wallet Balance: 0000 USDT</p>
          <button type="button">
            <Image src={maxImg} alt="Max" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#5A5A5A] rounded-2xl bg-opacity-10 mt-4 p-3">
        <VaultIcon className="w-12 h-12 rounded-md bg-rock-blue p-2" />
        <div>
          <p>0.0</p>
          <p className="text-rock-gray">(0.0)</p>
        </div>
      </div>

      {selectedTab === 'deposit' && (
        <div className="flex items-center justify-between text-rock-gray mt-12">
          <p>Current Deposit</p>
          <p>0.0 USDT</p>
        </div>
      )}

      <button
        type="button"
        className="w-full bg-white text-rock-muted rounded-full uppercase mt-8 py-2.5"
      >
        {selectedTab}
      </button>
    </div>
  );
};

export default VaultActionCard;
