'use client';

import { useMemo } from 'react';

import { Card } from '@nextui-org/react';

type VaultWithdrawalProps = {
  slug: string;
};

const VaultWithdrawal = (props: VaultWithdrawalProps) => {
  const { slug } = props;

  const contents = useMemo(() => {
    if (slug.includes('option')) {
      return [
        `Once user funds have been used in the vault’s weekly strategy they cannot be withdrawn until
        the vault closes it’s position the following Friday at 8am UTC.`,
        `The process of withdrawing funds from Harmonix is simple and flexible. Users can choose to
        withdraw their funds at any time by initiating a withdraw request on the website. When the
        options expiry date arrives, we will automatically close the options positions and transfer
        the user’s fund back to the vault. Then, the user can claim their fund from the Harmonix
        website at their convenience.`,
      ];
    }

    return [
      `Upon utilization of user funds in spot and perpetual trading on DEX, there is a necessary
      period for withdrawing funds from our vendor.`,
      ` The withdrawal process from Harmonix is straightforward and adaptable. Users have the option
      to initiate a withdrawal request on the website at their convenience. Once your request is
      received, we will promptly trigger the withdrawal of funds from the vendor. This process may
      take several minutes or hours. After the funds have been successfully withdrawn from the
      vendor and transferred back to the vault, users can then claim their funds from the Harmonix
      website.`,
    ];
  }, [slug]);

  return (
    <Card className="h-full p-8 space-y-6 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Withdrawal</p>

      <div className="flex flex-col gap-2">
        {contents.map((x) => (
          <p key={x}>{x}</p>
        ))}
      </div>
    </Card>
  );
};

export default VaultWithdrawal;
