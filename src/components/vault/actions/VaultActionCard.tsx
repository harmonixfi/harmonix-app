'use client';

import { Card, Tab, Tabs } from '@nextui-org/react';

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

  return (
    <Card className="p-6">
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="deposit" title="Deposit">
          <VaultDeposit networkChain={networkChain} />
        </Tab>
        <Tab key="withdraw" title="Withdraw">
          <VaultWithdraw
            apr={apr}
            networkChain={networkChain}
            withdrawalTime={withdrawalTime}
            withdrawalStep2={withdrawalStep2}
          />
        </Tab>
      </Tabs>
    </Card>
  );
};

export default VaultActionCard;
