'use client';

import { useEffect, useState } from 'react';

import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getUser } from '@/api/referral';
import { LOCAL_STORAGE_INVITE_CODE_KEY } from '@/constants/common';

import ReferralAction from '../vault/actions/ReferralAction';

const ReferralDialog = () => {
  const { address, status } = useAccount();

  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [connectingWallet, setConnectingWallet] = useState(false);

  const { data, isLoading, mutate } = useSWR(address ? ['get-user', address] : null, () =>
    getUser(address ?? '0x00'),
  );

  useEffect(() => {
    if (refCode) {
      localStorage.setItem(LOCAL_STORAGE_INVITE_CODE_KEY, refCode);
    }
  }, [refCode]);

  useEffect(() => {
    if (status === 'connecting' || status === 'reconnecting') {
      setConnectingWallet(true);
    }

    if (status === 'connected') {
      setConnectingWallet(false);
    }
  }, [status]);

  useEffect(() => {
    if (refCode && connectingWallet && status === 'disconnected') {
      onOpen();
      setConnectingWallet(false);
    }
  }, [refCode, connectingWallet, status]);

  useEffect(() => {
    if (refCode && !isLoading && data) {
      if (data.joined) {
        onClose();
      } else {
        onOpen();
      }
    }
  }, [isLoading, refCode, data]);

  const handleRefetchUser = () => {
    mutate();
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      placement="center"
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="max-w-xl p-4 sm:p-8">
        <ReferralAction walletAddress={address} onRefetchUser={handleRefetchUser} />
      </ModalContent>
    </Modal>
  );
};

export default ReferralDialog;
