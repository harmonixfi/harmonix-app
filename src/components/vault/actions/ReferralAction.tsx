'use client';

import { useEffect, useState } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import useSWRMutation from 'swr/mutation';

import { Address } from '@/@types/common';
import { JoinUserPayload } from '@/@types/referral';
import { joinUser } from '@/api/referral';
import { LOCAL_STORAGE_INVITE_CODE_KEY } from '@/constants/common';
import { SOCIAL_URLS } from '@/constants/socials';

async function updateUser(url: string, { arg }: { arg: JoinUserPayload }) {
  return await joinUser(arg);
}

type ReferralActionProps = {
  walletAddress?: Address;
  onRefetchUser: () => void;
};

const ReferralAction = (props: ReferralActionProps) => {
  const { walletAddress, onRefetchUser } = props;

  const { openConnectModal } = useConnectModal();

  const storageInviteCode =
    typeof window !== 'undefined' ? window.localStorage.getItem(LOCAL_STORAGE_INVITE_CODE_KEY) : '';

  const [value, setValue] = useState(storageInviteCode || '');
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const { trigger, isMutating } = useSWRMutation('join-user', updateUser);

  const handleSubmit = () => {
    if (!walletAddress) return;

    trigger(
      { walletAddress, referralCode: value },
      {
        onSuccess(data) {
          if (data.valid) {
            enqueueSnackbar('Invite code submitted successfully. Thank you!', {
              variant: 'success',
              anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
            onRefetchUser();
            localStorage.removeItem(LOCAL_STORAGE_INVITE_CODE_KEY);
          } else {
            enqueueSnackbar('Invalid invite code.', {
              variant: 'error',
              anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
          }
        },
        onError: () => {
          enqueueSnackbar('Failed to submit invite code.', {
            variant: 'error',
            anchorOrigin: { horizontal: 'right', vertical: 'top' },
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-8 text-primary">
      <p className="text-center text-2xl sm:text-3xl 2xl:text-4xl font-semibold">
        Enter your invite code
      </p>
      <div className="relative flex flex-col gap-2">
        <Input
          classNames={{
            inputWrapper: 'h-16 sm:h-20',
            innerWrapper: 'py-2',
            input:
              'text-center text-5xl sm:text-6xl lg:text-5xl 2xl:text-6xl font-semibold uppercase',
          }}
          type="text"
          size="lg"
          variant="faded"
          color="secondary"
          value={value}
          onValueChange={setValue}
        />
        {!isSSR && !value && (
          <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-12 sm:h-16 bg-primary bg-opacity-90 blinking-cursor" />
        )}
        <p className="text-sm">
          *An invite code is required to make a deposit. Please enter your code or reach out to
          support if you need assistance.
        </p>
      </div>

      <div className="bg-[#EDF9F2] border border-[#F1F1EB] rounded-sm px-2 lg:px-4 py-4">
        <p className="text-base lg:text-lg text-center">
          Don’t have an invite code? Join our{' '}
          <Link href={SOCIAL_URLS.Discord} target="_blank" className="text-indigo-500">
            Discord
          </Link>{' '}
          and get one in the <span className="font-semibold">#ref-invites</span> channel
        </p>
      </div>

      {!walletAddress ? (
        <Button
          fullWidth
          color="secondary"
          size="lg"
          className="text-primary"
          onClick={openConnectModal}
        >
          Connect wallet
        </Button>
      ) : (
        <Button
          fullWidth
          size="lg"
          color="secondary"
          className="text-primary"
          isDisabled={!value}
          isLoading={isMutating}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default ReferralAction;
