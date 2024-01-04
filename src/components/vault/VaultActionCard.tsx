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
    <div className="bg-[#5A5A5A] rounded-2xl bg-opacity-10 p-9">
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

      {selectedTab === 'deposit' && <VaultDeposit />}
      {selectedTab === 'withdraw' && <VaultWithdraw apr={apr} />}
    </div>
  );
};

export default VaultActionCard;
