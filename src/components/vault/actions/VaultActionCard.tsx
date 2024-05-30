'use client';

import { useState } from 'react';

import { Card } from '@nextui-org/react';

import { VaultNetwork } from '@/@types/enum';

import VaultDeposit from './VaultDeposit';
import VaultWithdraw from './VaultWithdraw';

type VaultActionCardProps = {
  apr: number;
  networkChain: VaultNetwork;
  withdrawalTime: string;
  withdrawalStep2: string;
};

const VaultActionCard = (props: VaultActionCardProps) => {
  const { apr, networkChain, withdrawalTime, withdrawalStep2 } = props;

  const [selectedTab, setSelectedTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
    <Card className="p-6 xl:p-9">
      <ul className="flex w-full">
        <li className="flex-1">
          <button
            type="button"
            className={`w-full text-sm lg:text-base ${
              selectedTab === 'deposit' ? 'bg-primary text-white' : ''
            }  rounded-full py-2.5`}
            onClick={() => setSelectedTab('deposit')}
          >
            Deposit
          </button>
        </li>
        <li className="flex-1">
          <button
            type="button"
            className={`w-full text-sm lg:text-base ${
              selectedTab === 'withdraw' ? 'bg-primary text-white' : ''
            }  rounded-full py-2.5`}
            onClick={() => setSelectedTab('withdraw')}
          >
            Withdraw
          </button>
        </li>
      </ul>

      {selectedTab === 'deposit' && <VaultDeposit networkChain={networkChain} />}
      {selectedTab === 'withdraw' && (
        <VaultWithdraw
          apr={apr}
          networkChain={networkChain}
          withdrawalTime={withdrawalTime}
          withdrawalStep2={withdrawalStep2}
        />
      )}
    </Card>
  );
};

export default VaultActionCard;
