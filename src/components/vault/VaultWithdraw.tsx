'use client';

import { ChangeEvent, useState } from 'react';

import { useAddress, useConnectionStatus } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { FLOAT_REGEX } from '@/constants/regex';
import useAppConfig from '@/hooks/useAppConfig';
import useRockOnyxVaultContract from '@/hooks/useRockOnyxVaultContract';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';
import { formatTokenAmount } from '@/utils/number';

import Tooltip from '../shared/Tooltip';
import TransactionStatusDialog from '../shared/TransactionStatusDialog';
import { QuestionIcon, RockOnyxTokenIcon, SpinnerIcon, WarningIcon } from '../shared/icons';

type VaultWithdrawProps = {
  apr: number;
};

const VaultWithdraw = (props: VaultWithdrawProps) => {
  const { apr } = props;

  const [inputValue, setInputValue] = useState('');

  const { transactionBaseUrl } = useAppConfig();
  const { isOpen, type, url, onOpenDialog, onCloseDialog } = useTransactionStatusDialog();

  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  const {
    isInitiatingWithdrawal,
    isCompletingWithdraw,
    balanceOf,
    pricePerShare,
    availableWithdrawalAmount,
    initiateWithdrawal,
    completeWithdraw,
  } = useRockOnyxVaultContract();

  const isEnableCompleteWithdraw = availableWithdrawalAmount > 0;

  const handleInitiateWithdraw = async () => {
    try {
      const amount = ethers.utils.parseUnits(inputValue, 6);
      const response = await initiateWithdrawal({ args: [amount] });
      onOpenDialog('success', `${transactionBaseUrl}/${response?.receipt?.transactionHash}`);
      setInputValue('');
    } catch {
      onOpenDialog('failed');
    }
  };

  const handleCompleteWithdraw = async () => {
    try {
      const response = await completeWithdraw({ args: [] });
      onOpenDialog('success', `${transactionBaseUrl}/${response?.receipt?.transactionHash}`);
      setInputValue('');
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

  const isConnectedWallet = connectionStatus === 'connected';

  const isWithdrawing = isInitiatingWithdrawal || isCompletingWithdraw;

  const disabledButton = !isConnectedWallet || isWithdrawing || !inputValue;

  return (
    <div>
      {!isConnectedWallet && (
        <div className="flex items-center gap-2 mt-12">
          <WarningIcon />
          <p className="text-sm font-normal text-rock-yellow">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="mt-10">
        <p className="text-lg lg:text-xl font-semibold uppercase text-rock-gray">Rock onyx vault</p>
        <div className="flex flex-col gap-3 lg:gap-6 bg-[#5A5A5A] rounded-2xl bg-opacity-10 mt-4 p-4 lg:p-7">
          <div className="flex items-center justify-between">
            <p className="text-rock-gray">APR to date:</p>
            <p>{`${Math.round(apr)}%`}</p>
          </div>
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

      <div className="flex items-center justify-between mt-12">
        <p className="text-lg lg:text-xl text-rock-gray font-semibold">roUSD AMOUNT</p>
        <button
          type="button"
          className="border border-rock-primary rounded-full px-3 py-1 text-sm font-light hover:ring-2 hover:ring-blue-800"
          onClick={handleClickWithdrawAll}
        >
          Withdraw all
        </button>
      </div>

      <div className="relative mt-6">
        <RockOnyxTokenIcon className="absolute top-1/2 left-3 -translate-y-1/2 w-16 h-16" />
        <input
          className="w-full h-20 block bg-[#5A5A5A] rounded-xl bg-opacity-10 pl-24 pr-3 text-2xl text-rock-gray focus:ring-2 focus:outline-none"
          type="text"
          placeholder="0.0"
          disabled={!isConnectedWallet}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
      </div>

      <div className="text-rock-gray mt-6 text-sm lg:text-base">
        <div className="flex items-center justify-between">
          <p>Your deposit</p>
          <p>{`${formatTokenAmount(balanceOf)} roUSD`}</p>
        </div>

        <div
          className="w-full h-[1px] my-3 lg:my-6"
          style={{
            background:
              'linear-gradient(270deg, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
          }}
        />

        <div className="flex items-center justify-between">
          <p>You will receive</p>
          <p>{`${formatTokenAmount((Number(inputValue) || 0) * pricePerShare)} USDC`}</p>
        </div>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-rock-primary text-sm lg:text-base text-white font-light rounded-full uppercase mt-16 py-2.5 ${
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
