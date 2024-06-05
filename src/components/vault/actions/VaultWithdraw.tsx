'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Button, Tooltip } from '@nextui-org/react';
import * as Sentry from '@sentry/nextjs';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { VaultNetwork, VaultVariant } from '@/@types/enum';
import { getUserPortfolio } from '@/api/vault';
import { FLOAT_REGEX } from '@/constants/regex';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useCompleteWithdrawal from '@/hooks/useCompleteWithdrawal';
import useInitiateWithdrawal from '@/hooks/useInitiateWithdrawal';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';
import useVaultQueries from '@/hooks/useVaultQueries';
import { getDeltaNeutralWithdrawalDate, getOptionsWheelWithdrawalDate } from '@/utils/date';
import { toFixedNumber, withCommas } from '@/utils/number';

import TransactionStatusDialog from '../../shared/TransactionStatusDialog';
import { QuestionIcon, VaultTransferArrowDownIcon, WarningIcon } from '../../shared/icons';
import WithdrawCoolDown from './WithdrawCoolDown';

type VaultWithdrawProps = {
  apr: number;
  networkChain: VaultNetwork;
  withdrawalTime: string;
  withdrawalStep2: string;
};

const VaultWithdraw = (props: VaultWithdrawProps) => {
  const { networkChain, withdrawalTime, withdrawalStep2 } = props;

  const params = useParams();

  const { vaultVariant, vaultAbi, vaultAddress } = useVaultDetailContext();

  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const { isOpen, type, url, onOpenDialog, onCloseDialog } =
    useTransactionStatusDialog(networkChain);

  const { status, address } = useAccount();

  const {
    data: portfolio,
    isLoading: isLoadingPortfolio,
    mutate: refetchPortfolio,
  } = useSWR(address, getUserPortfolio, { refreshInterval: 2 * 60 * 1000 });

  const {
    isInitiatingWithdrawal,
    isConfirmedInitiateWithdrawal,
    isInitiateWithdrawalError,
    initiateWithdrawalError,
    initiateWithdrawal,
  } = useInitiateWithdrawal(vaultAbi, vaultAddress);
  const {
    isCompletingWithdrawal,
    isConfirmedCompleteWithdrawal,
    isCompleteWithdrawalError,
    completeWithdrawalError,
    completeWithdrawalTransactionHash,
    completeWithdrawal,
  } = useCompleteWithdrawal(vaultAbi, vaultAddress);

  const {
    balanceOf,
    pricePerShare,
    availableWithdrawalAmount,
    withdrawPoolAmount,
    refetchBalanceOf,
    refetchAvailableWithdrawalAmount,
    refetchDeltaNeutralAvailableWithdrawalShares,
  } = useVaultQueries(vaultAbi, vaultAddress, vaultVariant);

  const isEnableCompleteWithdraw =
    availableWithdrawalAmount > 0 && withdrawPoolAmount >= availableWithdrawalAmount;

  const handleRefetchAvailableWithdrawalAmount = () => {
    if (vaultVariant === VaultVariant.OptionsWheel) {
      refetchAvailableWithdrawalAmount();
    } else {
      refetchDeltaNeutralAvailableWithdrawalShares();
    }
  };

  useEffect(() => {
    if (isCoolingDown || isEnableCompleteWithdraw) {
      setInputValue(String(availableWithdrawalAmount));
    }
  }, [isCoolingDown, isEnableCompleteWithdraw, availableWithdrawalAmount]);

  useEffect(() => {
    if (isConfirmedInitiateWithdrawal) {
      refetchPortfolio();
      setInputValue('');
      onOpenDialog('success');
      refetchBalanceOf();
      handleRefetchAvailableWithdrawalAmount();
    }
  }, [isConfirmedInitiateWithdrawal]);

  useEffect(() => {
    if (isConfirmedCompleteWithdrawal) {
      refetchPortfolio();
      setInputValue('');
      onOpenDialog('success', completeWithdrawalTransactionHash);
      refetchBalanceOf();
      handleRefetchAvailableWithdrawalAmount();
    }
  }, [isConfirmedCompleteWithdrawal]);

  useEffect(() => {
    if (isInitiateWithdrawalError) {
      onOpenDialog('error');
      Sentry.captureException(initiateWithdrawalError);
      console.error(initiateWithdrawalError);
    }
  }, [isInitiateWithdrawalError]);

  useEffect(() => {
    if (isCompleteWithdrawalError) {
      onOpenDialog('error');
      Sentry.captureException(completeWithdrawalError);
      console.error(completeWithdrawalError);
    }
  }, [isCompleteWithdrawalError]);

  const handleInitiateWithdraw = async () => {
    const amount = ethers.utils.parseUnits(inputValue, 6);
    await initiateWithdrawal(amount);
  };

  const handleCompleteWithdraw = async () => {
    const amount = ethers.utils.parseUnits(inputValue, 6);
    await completeWithdrawal(amount);
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

    if (value.match(FLOAT_REGEX)) {
      setInputValue(value);
      if (isEnableCompleteWithdraw) {
        if (Number(value) > availableWithdrawalAmount) {
          setInputError('Insufficient balance');
        } else {
          setInputError('');
        }
      } else {
        if (Number(value) > balanceOf) {
          setInputError('Insufficient balance');
        } else {
          setInputError('');
        }
      }
    }
  };

  const handleClickWithdrawAll = () => {
    setInputValue(balanceOf > 0 ? String(balanceOf) : '');
    setInputError('');
  };

  const isConnectedWallet = status === 'connected';

  const isWithdrawing = isInitiatingWithdrawal || isCompletingWithdrawal;

  const currentPosition = useMemo(
    () => portfolio?.positions?.find((x) => x.slug === params.slug),
    [portfolio, params.slug],
  );

  const isWaitingForWithdrawPool = availableWithdrawalAmount > 0 && !isEnableCompleteWithdraw;

  const disabledButton =
    !isConnectedWallet ||
    isWithdrawing ||
    !inputValue ||
    !!inputError ||
    isCoolingDown ||
    isWaitingForWithdrawPool;

  const withdrawalTargetDate = useMemo(() => {
    if (isEnableCompleteWithdraw || !currentPosition || !currentPosition.initiated_withdrawal_at)
      return null;

    let targetDate = null;

    if (vaultVariant === VaultVariant.OptionsWheel) {
      /** Options wheel vault: 8am UTC Friday */
      targetDate = getOptionsWheelWithdrawalDate();
    } else {
      /** Delta neutral vault: after 4 hours from initiated_withdrawal_at */
      targetDate = getDeltaNeutralWithdrawalDate(currentPosition.initiated_withdrawal_at);
    }

    if (new Date() > targetDate) return null;

    return targetDate.toISOString();
  }, [isEnableCompleteWithdraw, vaultVariant, currentPosition]);

  useEffect(() => {
    if (withdrawalTargetDate) {
      setIsCoolingDown(true);
    }
  }, [withdrawalTargetDate]);

  useEffect(() => {
    if (isEnableCompleteWithdraw && isCoolingDown) {
      setIsCoolingDown(false);
    }
  }, [isEnableCompleteWithdraw, isCoolingDown]);

  return (
    <div className="flex flex-col gap-6">
      {!isConnectedWallet && (
        <div className="flex items-center gap-2">
          <WarningIcon className="w-6 h-6 text-yellow-600" />
          <p className="text-sm font-normal text-yellow-600">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="flex flex-col gap-3 lg:gap-6 bg-rock-grey01 rounded-2xl mt-4 p-4 lg:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-rock-gray">Withdrawals</p>
            <Tooltip
              content={
                <div className="flex flex-col gap-3">
                  <p>
                    If you want to withdraw funds that have been invested in the vault&apos;s weekly
                    options strategy, you need to follow a 2-step process:
                  </p>
                  <p>Step 1: You need to initiate the withdrawal request.</p>
                  <p>{`Step 2: ${withdrawalStep2}`}`</p>
                </div>
              }
            >
              <QuestionIcon />
            </Tooltip>
          </div>
          <p>{withdrawalTime}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex flex-col gap-4 bg-rock-grey01 px-6 pt-4 pb-4 rounded-2xl">
          <p className="opacity-50 capitalize font-medium">You withdraw</p>
          <div className="flex items-start justify-between gap-4">
            <div className="grow space-y-1">
              <input
                className={`w-full h-14 px-4 rounded-xl bg-white text-3xl ${
                  !!inputError ? 'focus:ring-0 border border-red-600' : 'focus:ring-2'
                } focus:outline-none`}
                type="text"
                placeholder="0"
                disabled={
                  !isConnectedWallet ||
                  isCoolingDown ||
                  isWaitingForWithdrawPool ||
                  isEnableCompleteWithdraw
                }
                value={inputValue}
                onChange={handleChangeInputValue}
              />
              {!!inputError && <p className="text-red-600 text-sm font-light mt-1">{inputError}</p>}
            </div>
            <p className="text-3xl font-medium translate-y-2.5">roUSD</p>
          </div>
          {!isLoadingPortfolio &&
            !isCoolingDown &&
            !isEnableCompleteWithdraw &&
            !isWaitingForWithdrawPool && (
              <div className="flex items-center justify-between">
                <p className="text-sm opacity-50 font-medium">
                  Your available shares: {withCommas(toFixedNumber(balanceOf))} roUSD
                </p>

                <Button variant="light" onClick={handleClickWithdrawAll}>
                  Max
                </Button>
              </div>
            )}
        </div>

        <div className="flex flex-col gap-4 bg-rock-grey01 px-6 pt-4 pb-4 rounded-2xl relative">
          <p className="opacity-50 capitalize font-medium">You receive</p>
          <p className="text-3xl font-medium">
            {withCommas(toFixedNumber((Number(inputValue) || 0) * pricePerShare))} USDC
          </p>

          <span className="absolute -top-6 left-1/2 -translate-x-1/2">
            <VaultTransferArrowDownIcon className="w-10 h-10" />
          </span>
        </div>
      </div>

      {isCoolingDown && withdrawalTargetDate && (
        <WithdrawCoolDown
          targetDate={withdrawalTargetDate}
          onCoolDownEnd={() => setIsCoolingDown(false)}
        />
      )}

      <Button
        type="button"
        size="lg"
        color="primary"
        fullWidth
        isLoading={isWithdrawing}
        isDisabled={disabledButton}
        onClick={handleWithdraw}
      >
        {isCoolingDown || isWaitingForWithdrawPool || isEnableCompleteWithdraw
          ? 'Complete withdrawal'
          : 'Initiate withdrawal'}
      </Button>

      <TransactionStatusDialog isOpen={isOpen} type={type} url={url} onClose={onCloseDialog} />
    </div>
  );
};

export default VaultWithdraw;
