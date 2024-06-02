'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { ArrowDownIcon } from '@heroicons/react/16/solid';
import { Button, Select, SelectItem } from '@nextui-org/react';
import * as Sentry from '@sentry/nextjs';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { SupportedCurrency, VaultNetwork, VaultVariant } from '@/@types/enum';
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
import TransactionStatusDialog from '../../shared/TransactionStatusDialog';
import { InformationIcon, SpinnerIcon, WarningIcon } from '../../shared/icons';

type VaultDepositProps = {
  networkChain: VaultNetwork;
};

const VaultDeposit = (props: VaultDepositProps) => {
  const { networkChain } = props;

  const { vaultAbi, vaultAddress, vaultVariant } = useVaultDetailContext();
  const { usdcAddress } = useContractMapping();

  const account = useAccount();

  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(
    SupportedCurrency.Usdc,
  );
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const { isOpen, type, url, onOpenDialog, onCloseDialog } =
    useTransactionStatusDialog(networkChain);

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
    const isRestakingVault =
      vaultVariant === VaultVariant.KelpdaoRestaking ||
      vaultVariant === VaultVariant.RenzoRestaking;
    const tokenIn = isRestakingVault ? usdcAddress : undefined;
    const transitToken = isRestakingVault ? usdcAddress : undefined;
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

      <div className="relative space-y-2">
        <div className="flex flex-col gap-4 bg-gray-200 px-6 pt-2 pb-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-3">
              <Select
                aria-label="assets"
                size="md"
                variant="bordered"
                className="max-w-[100px]"
                defaultSelectedKeys={['usdc']}
              >
                <SelectItem key="usdc">USDC</SelectItem>
                <SelectItem key="usdt">USDT</SelectItem>
              </Select>
              <Button variant="light" onClick={handleClickMax}>
                MAX
              </Button>
            </div>
            <p className="text-xs uppercase">You pay</p>
          </div>
          <div className="space-y-1">
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
            {!!inputError && <p className="text-red-600 text-sm font-light mt-1">{inputError}</p>}
          </div>
          <p className="text-sm">
            Balance: {balance ? withCommas(toFixedNumber(walletBalance)) : '0'} USDC
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-gray-200 px-6 pt-2 pb-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">roUSD</span>
            <p className="text-xs uppercase">You receive</p>
          </div>
          <p className="w-full block bg-rock-bg rounded-xl px-3 py-4 text-2xl text-white">
            {withCommas(
              toFixedNumber(pricePerShare > 0 ? Number(inputValue) / Number(pricePerShare) : 0),
            )}
          </p>
          <p className="text-sm">Your shares: {withCommas(toFixedNumber(balanceOf))} roUSD</p>
        </div>

        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 rounded-full p-2">
          <ArrowDownIcon className="w-6 h-6 text-white" />
        </span>
      </div>

      <div className="flex items-center justify-between text-sm font-light mt-1">
        <p>Price per share</p>
        <p>{`1 roUSD = ${toFixedNumber(
          pricePerShare,
          4,
        ).toString()} ${selectedCurrency.toUpperCase()}`}</p>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-rock-primary text-sm lg:text-base text-white font-light rounded-full mt-8 py-2.5 ${
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
