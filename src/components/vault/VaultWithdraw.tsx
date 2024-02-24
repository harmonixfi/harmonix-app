'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { FLOAT_REGEX } from '@/constants/regex';
import useAppConfig from '@/hooks/useAppConfig';
import useCompleteWithdrawal from '@/hooks/useCompleteWithdrawal';
import useInitiateWithdrawal from '@/hooks/useInitiateWithdrawal';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';
import { formatTokenAmount } from '@/utils/number';

import Tooltip from '../shared/Tooltip';
import TransactionStatusDialog from '../shared/TransactionStatusDialog';
import { QuestionIcon, RockOnyxTokenIcon, SpinnerIcon, WarningIcon } from '../shared/icons';

type VaultWithdrawProps = {
  apr: number;
};

const VaultWithdraw = (props: VaultWithdrawProps) => {
  const [inputValue, setInputValue] = useState('');

  const { transactionBaseUrl } = useAppConfig();
  const { isOpen, type, url, onOpenDialog, onCloseDialog } = useTransactionStatusDialog();

  const { status } = useAccount();

  const {
    isInitiatingWithdrawal,
    isConfirmedInitiateWithdrawal,
    isInitiateWithdrawalError,
    initiateWithdrawal,
  } = useInitiateWithdrawal();
  const {
    isCompletingWithdrawal,
    isConfirmedCompleteWithdrawal,
    isCompleteWithdrawalError,
    completeWithdrawalTransactionHash,
    completeWithdrawal,
  } = useCompleteWithdrawal();

  const { balanceOf, pricePerShare, availableWithdrawalAmount } = useRockOnyxVaultQueries();

  const isEnableCompleteWithdraw = availableWithdrawalAmount > 0;

  useEffect(() => {
    if (availableWithdrawalAmount > 0) {
      setInputValue(String(availableWithdrawalAmount));
    }
  }, [availableWithdrawalAmount]);

  useEffect(() => {
    if (isConfirmedInitiateWithdrawal) {
      setInputValue('');
      onOpenDialog('success');
    }
  }, [isConfirmedInitiateWithdrawal]);

  useEffect(() => {
    if (isConfirmedCompleteWithdrawal) {
      setInputValue('');
      onOpenDialog('success', `${transactionBaseUrl}/${completeWithdrawalTransactionHash}`);
    }
  }, [isConfirmedCompleteWithdrawal]);

  useEffect(() => {
    if (isInitiateWithdrawalError || isCompleteWithdrawalError) {
      onOpenDialog('failed');
    }
  }, [isInitiateWithdrawalError, isCompleteWithdrawalError]);

  const handleInitiateWithdraw = async () => {
    try {
      const amount = ethers.utils.parseUnits(inputValue, 6);
      await initiateWithdrawal(amount);
    } catch {
      onOpenDialog('failed');
    }
  };

  const handleCompleteWithdraw = async () => {
    try {
      const amount = ethers.utils.parseUnits(inputValue, 6);
      await completeWithdrawal(amount);
    } catch {
      onOpenDialog('failed');
    }
  };

  const handleWithdraw = async () => {
    if (isEnableCompleteWithdraw) {
      handleCompleteWithdraw();
    } else {
      handleInitiateWithdraw();
    }
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.match(FLOAT_REGEX)) setInputValue(value);
  };

  const handleClickWithdrawAll = () => {
    setInputValue(balanceOf > 0 ? String(balanceOf) : '');
  };

  const isConnectedWallet = status === 'connected';

  const isWithdrawing = isInitiatingWithdrawal || isCompletingWithdrawal;

  const disabledButton = !isConnectedWallet || isWithdrawing || !inputValue;

  return (
    <div>
      {!isConnectedWallet && (
        <div className="flex items-center gap-2 mt-12">
          <WarningIcon />
          <p className="text-sm font-normal text-rock-yellow">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="mt-6 sm:mt-10">
        <p className="text-lg lg:text-xl font-semibold uppercase text-rock-gray">Rock onyx vault</p>
        <div className="flex flex-col gap-3 lg:gap-6 bg-rock-bg rounded-2xl mt-4 p-4 lg:p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-rock-gray">Withdrawals</p>
              <Tooltip
                message={
                  <div className="flex flex-col gap-3">
                    <p>
                      If you want to withdraw funds that have been invested in the vault&apos;s
                      weekly options strategy, you need to follow a 2-step process:
                    </p>
                    <p>Step 1: You need to initiate the withdrawal request.</p>
                    <p>
                      Step 2: You can claim your withdrawal every Friday at 8am UTC after our
                      options positions have expired.
                    </p>
                  </div>
                }
              >
                <QuestionIcon />
              </Tooltip>
            </div>
            <p>8am UTC Friday</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 sm:mt-12">
        <p className="text-lg lg:text-xl text-rock-gray font-semibold">roUSD AMOUNT</p>
        {!isEnableCompleteWithdraw && (
          <button
            type="button"
            className="border border-rock-primary rounded-full px-3 py-1 text-sm font-light hover:ring-2 hover:ring-blue-800"
            onClick={handleClickWithdrawAll}
          >
            Withdraw all
          </button>
        )}
      </div>

      <div className="relative mt-3 sm:mt-6">
        <RockOnyxTokenIcon className="absolute top-1/2 left-3 -translate-y-1/2 w-12 h-12" />
        <input
          className="w-full h-16 block bg-rock-bg rounded-xl pl-20 pr-3 text-2xl text-white focus:ring-2 focus:outline-none"
          type="text"
          placeholder="0.0"
          disabled={!isConnectedWallet || isEnableCompleteWithdraw}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
      </div>

      <div className="text-rock-gray mt-6 text-sm lg:text-base">
        {!isEnableCompleteWithdraw && (
          <>
            <div className="flex items-center justify-between">
              <p>Your available amount</p>
              <p>{`${formatTokenAmount(balanceOf)} roUSD`}</p>
            </div>

            <div className="w-full h-[1px] my-3 lg:my-6 bg-rock-bg" />
          </>
        )}

        <div className="flex items-center justify-between">
          <p>You will receive</p>
          <p className="text-white">{`${formatTokenAmount(
            (Number(inputValue) || 0) * pricePerShare,
          )} USDC`}</p>
        </div>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-rock-primary text-sm lg:text-base text-white font-light rounded-full mt-8 sm:mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20 text-opacity-40' : ''
        } ${isWithdrawing ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={handleWithdraw}
      >
        {isWithdrawing && <SpinnerIcon className="w-6 h-6 animate-spin" />}
        {isEnableCompleteWithdraw ? 'Complete withdrawal' : 'Initiate withdrawal'}
      </button>

      <TransactionStatusDialog isOpen={isOpen} type={type} url={url} onClose={onCloseDialog} />
    </div>
  );
};

export default VaultWithdraw;
