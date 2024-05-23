'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import * as Sentry from '@sentry/nextjs';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { SupportedCurrency } from '@/@types/enum';
import { FLOAT_REGEX } from '@/constants/regex';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useApprove from '@/hooks/useApprove';
import useContractMapping from '@/hooks/useContractMapping';
import useDeposit from '@/hooks/useDeposit';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';
import useUsdcQueries from '@/hooks/useUsdcQueries';
import useVaultQueries from '@/hooks/useVaultQueries';
import { vaultDisableDepositMapping, vaultWhitelistWalletsMapping } from '@/services/vaultMapping';
import { toFixedNumber, withCommas } from '@/utils/number';

import ConfirmDialog from '../../shared/ConfirmDialog';
import CurrencySelect from '../../shared/CurrencySelect';
import TransactionStatusDialog from '../../shared/TransactionStatusDialog';
import { InformationIcon, SpinnerIcon, WarningIcon } from '../../shared/icons';

const VaultDeposit = () => {
  const { vaultAbi, vaultAddress, vaultVariant } = useVaultDetailContext();
  const { usdcAddress } = useContractMapping();

  const account = useAccount();

  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(
    SupportedCurrency.Usdc,
  );
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const { isOpen, type, url, onOpenDialog, onCloseDialog } = useTransactionStatusDialog();

  const { status } = useAccount();
  const {
    balanceOf,
    pricePerShare,
    refetchBalanceOf,
    refetchDepositAmount,
    refetchUserVaultState,
  } = useVaultQueries(vaultAbi, vaultAddress);
  const { allowance, balance, refetchAllowance, refetchBalance } = useUsdcQueries(vaultAddress);
  const { isApproving, isApproveError, isConfirmedApproval, approvalError, approve } =
    useApprove(vaultAddress);
  const {
    isDepositing,
    isConfirmedDeposit,
    isDepositError,
    depositError,
    depositTransactionHash,
    deposit,
  } = useDeposit(vaultAbi, vaultAddress);

  useEffect(() => {
    if (isConfirmedDeposit) {
      setInputValue('');
      onOpenDialog('success', depositTransactionHash);
      refetchBalance();
      refetchBalanceOf();
      refetchDepositAmount();
      refetchUserVaultState();
    }
  }, [isConfirmedDeposit]);

  useEffect(() => {
    if (isApproveError) {
      onOpenDialog('error');
      Sentry.captureException(approvalError);
      console.error(approvalError);
    }
  }, [isApproveError]);

  useEffect(() => {
    if (isDepositError) {
      onOpenDialog('error');
      Sentry.captureException(depositError);
      console.error(depositError);
    }
  }, [isDepositError]);

  useEffect(() => {
    if (isConfirmedApproval) {
      refetchAllowance();
      handleDeposit(inputValue);
    }
  }, [isConfirmedApproval]);

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.match(FLOAT_REGEX)) {
      setInputValue(value);
      if (Number(value) > walletBalance) {
        setInputError('Insufficient balance');
      } else {
        setInputError('');
      }
    }
  };

  const handleClickMax = () => {
    setInputValue(balance?.formatted ?? '');
    setInputError('');
  };

  const handleApprove = async (amount: string) => {
    await approve(ethers.utils.parseUnits(amount, 6));
  };

  const handleDeposit = async (amount: string) => {
    const isKelpDaoVault =
      vaultAddress === process.env.NEXT_PUBLIC_ARBITRUM_DELTA_NEUTRAL_KELPDAO_VAULT_ADDRESS;
    const tokenIn = isKelpDaoVault ? usdcAddress : undefined;
    const transitToken = isKelpDaoVault ? usdcAddress : undefined;
    await deposit(ethers.utils.parseUnits(amount, 6), tokenIn, transitToken);
  };

  const handleConfirm = async () => {
    setIsOpenConfirmDialog(false);
    try {
      if (!skipApprove) {
        handleApprove(inputValue);
      } else {
        handleDeposit(inputValue);
      }
    } catch {
      onOpenDialog('error');
    }
  };

  const isConnectedWallet = status === 'connected';
  const isDisableDeposit = vaultDisableDepositMapping(vaultVariant);
  const whitelistWallets = vaultWhitelistWalletsMapping(vaultVariant);
  const isWalletAllowed = account.address && whitelistWallets.split(',').includes(account.address);
  const isButtonLoading = isDepositing || isApproving;
  const disabledButton =
    (isDisableDeposit && !isWalletAllowed) ||
    !isConnectedWallet ||
    !inputValue ||
    isButtonLoading ||
    !!inputError;
  const skipApprove = allowance > 0 && Number(inputValue) <= allowance;
  const walletBalance = balance
    ? Number(ethers.utils.formatUnits(balance.value, balance.decimals))
    : 0;

  return (
    <div>
      {!isConnectedWallet && (
        <div className="flex items-center gap-2 mt-12">
          <WarningIcon />
          <p className="text-sm font-normal text-rock-yellow">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm font-normal text-rock-gray rounded-lg bg-rock-bg mt-6 sm:mt-8 mb-6 p-4">
        <InformationIcon />
        <span>The minimum deposit amount is $5.</span>
      </div>

      <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between">
        <p className="text-lg lg:text-xl text-rock-gray font-semibold uppercase">{`Amount (${selectedCurrency})`}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-rock-gray">
            Wallet Balance: {balance ? withCommas(toFixedNumber(walletBalance)) : '0'} USDC
          </p>
          <button
            type="button"
            className="border border-rock-primary rounded-full px-3 py-0.5 text-sm font-light uppercase hover:ring-2 hover:ring-blue-800"
            onClick={handleClickMax}
          >
            Max
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        <input
          className={`w-full h-16 block bg-rock-bg rounded-xl pl-3 sm:pl-6 pr-[160px] text-2xl text-white ${
            !!inputError ? 'focus:ring-0 border border-red-600' : 'focus:ring-2'
          } focus:outline-none`}
          type="text"
          placeholder="0.0"
          disabled={!isConnectedWallet}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
        <div className="absolute top-1 right-2 sm:right-4">
          <CurrencySelect value={selectedCurrency} onChange={setSelectedCurrency} />
        </div>
      </div>
      <div className={`flex items-center ${!!inputError ? 'justify-between' : 'justify-end'}`}>
        {!!inputError && <p className="text-red-600 text-sm font-light mt-1">{inputError}</p>}
        {pricePerShare > 0 && (
          <p className="text-rock-gray text-xs font-light mt-2">{`1 roUSD = ${toFixedNumber(
            pricePerShare,
            4,
          ).toString()} ${selectedCurrency.toUpperCase()}`}</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-8 text-rock-gray text-sm lg:text-base">
        <p>You will receive</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-white">{`${withCommas(
            toFixedNumber(pricePerShare > 0 ? Number(inputValue) / Number(pricePerShare) : 0),
          )} roUSD`}</p>
        </div>
      </div>

      <div className="w-full h-[1px] my-3 lg:my-6 bg-rock-bg" />

      <div className="flex items-center justify-between text-sm lg:text-base text-rock-gray">
        <p>Current Deposit</p>
        <p className="text-white">{`${withCommas(toFixedNumber(balanceOf))} roUSD`}</p>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-rock-primary text-sm lg:text-base text-white font-light rounded-full mt-8 sm:mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20 text-opacity-40' : ''
        } ${isButtonLoading ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={() => setIsOpenConfirmDialog(true)}
      >
        {isButtonLoading && <SpinnerIcon className="w-6 h-6 animate-spin" />}
        {skipApprove ? 'Deposit' : 'Approve'}
      </button>

      <TransactionStatusDialog isOpen={isOpen} type={type} url={url} onClose={onCloseDialog} />

      <ConfirmDialog
        isOpen={isOpenConfirmDialog}
        title="You are about to deposit into your account"
        description="Please be aware that this transaction is being processed in our beta version. If you encounter any issues or discrepancies, kindly report them to our support team."
        confirmText="Continue"
        onCancel={() => setIsOpenConfirmDialog(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default VaultDeposit;
