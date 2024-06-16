'use client';

import { useState } from 'react';

import { Button, Input } from '@nextui-org/react';
import useSWRMutation from 'swr/mutation';

import { Address } from '@/@types/common';
import { JoinUserPayload } from '@/@types/referral';
import { joinUser } from '@/api/referral';

async function updateUser(url: string, { arg }: { arg: JoinUserPayload }) {
  await joinUser(arg);
}

type ReferralActionProps = {
  walletAddress?: Address;
};

const ReferralAction = (props: ReferralActionProps) => {
  const { walletAddress } = props;

  const [value, setValue] = useState('ABCXYZ12');

  const { trigger } = useSWRMutation('join-user', updateUser);

  const handleSubmit = () => {
    if (!walletAddress) return;

    trigger({ walletAddress, referralCode: value });
  };

  return (
    <div className="flex flex-col gap-8 text-primary">
      <p className="text-center text-3xl 2xl:text-4xl font-semibold">Enter your invite code</p>
      <div className="flex flex-col gap-2">
        <Input
          classNames={{
            inputWrapper: 'h-16',
            input: 'text-center text-6xl lg:text-5xl 2xl:text-6xl font-semibold uppercase',
          }}
          type="text"
          size="lg"
          variant="underlined"
          color="secondary"
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm">
          *An invite code is required to make a deposit. Please enter your code or reach out to
          support if you need assistance.
        </p>
      </div>
      <Button
        fullWidth
        size="lg"
        color="secondary"
        className="text-primary"
        isDisabled={!value}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default ReferralAction;