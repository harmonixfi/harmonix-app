'use client';

import { useState } from 'react';

import VaultDeposit from './VaultDeposit';
import VaultWithdraw from './VaultWithdraw';

type VaultActionCardProps = {
  apr: number;
};

const VaultActionCard = (props: VaultActionCardProps) => {
  const { apr } = props;

  const [selectedTab, setSelectedTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
    <div className="bg-white bg-opacity-5 border border-rock-divider rounded-2xl backdrop-blur-sm p-6 xl:p-9">
      <ul className="flex w-full">
        <li className="flex-1">
          <button
            type="button"
            className={`w-full text-sm lg:text-base ${
              selectedTab === 'deposit' ? 'bg-rock-blue' : ''
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
              selectedTab === 'withdraw' ? 'bg-rock-blue' : ''
            }  rounded-full py-2.5`}
            onClick={() => setSelectedTab('withdraw')}
          >
            Withdraw
          </button>
        </li>
      </ul>

      {selectedTab === 'deposit' && <VaultDeposit />}
      {selectedTab === 'withdraw' && <VaultWithdraw apr={apr} />}
    </div>
  );
};

export default VaultActionCard;
