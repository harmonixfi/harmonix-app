'use client';

import { ChangeEvent, useEffect, useState } from 'react';

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
import { CurrencySymbolIcon, VaultTransferArrowDownIcon, WarningIcon } from '../../shared/icons';

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
    <div className="flex flex-col gap-6 text-primary mt-6">
      {!isConnectedWallet && (
        <div className="flex items-center gap-2">
          <WarningIcon className="w-6 h-6 text-yellow-600" />
          <p className="text-sm font-normal text-yellow-600">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="space-y-1">
        <div className="flex flex-col gap-4 bg-rock-grey01 px-6 pt-4 pb-4 rounded-2xl">
          <p className="opacity-50 capitalize font-medium">You pay</p>
          <div className="flex items-start justify-between gap-4">
            <div className="grow space-y-1">
              <input
                className={`w-full h-14 px-4 rounded-xl bg-white text-3xl ${
                  !!inputError ? 'focus:ring-0 border border-red-600' : 'focus:ring-2'
                } focus:outline-none`}
                type="text"
                placeholder="0"
                disabled={!isConnectedWallet}
                value={inputValue}
                onChange={handleChangeInputValue}
              />
              {!!inputError && <p className="text-red-600 text-sm font-light mt-1">{inputError}</p>}
            </div>
            <Select
              aria-label="assets"
              size="md"
              variant="bordered"
              className="max-w-[120px] translate-y-2.5"
              classNames={{
                trigger: 'rounded-full bg-white border border-[#F1F1EB]',
              }}
              defaultSelectedKeys={['usdc']}
              renderValue={(items) => {
                return items.map((x) => (
                  <div key={x.key} className="flex items-center gap-2">
                    <CurrencySymbolIcon className="w-6 h-6" />
                    <span>{x.textValue}</span>
                  </div>
                ));
              }}
            >
              <SelectItem key="usdc" textValue="USDC">
                <div className="flex items-center gap-2">
                  <CurrencySymbolIcon /> USDC
                </div>
              </SelectItem>
              <SelectItem key="usdt" textValue="USDT">
                <div className="flex items-center gap-2">
                  <CurrencySymbolIcon /> USDT
                </div>
              </SelectItem>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-50 font-medium">
              Balance: {balance ? withCommas(toFixedNumber(walletBalance)) : '0'} USDC
            </p>
            <Button variant="light" onClick={handleClickMax}>
              Max
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-rock-grey01 px-6 pt-4 pb-4 rounded-2xl relative">
          <p className="opacity-50 capitalize font-medium">You receive</p>
          <p className="text-3xl font-medium">
            {withCommas(
              toFixedNumber(pricePerShare > 0 ? Number(inputValue) / Number(pricePerShare) : 0),
            )}{' '}
            roUSD
          </p>
          <p className="text-sm opacity-50 font-medium">
            Your shares: {withCommas(toFixedNumber(balanceOf))} roUSD
          </p>

          <span className="absolute -top-6 left-1/2 -translate-x-1/2">
            <VaultTransferArrowDownIcon className="w-10 h-10" />
          </span>
        </div>
      </div>

      <ul className="space-y-1">
        <li className="flex items-center justify-between text-sm font-light">
          <p className="font-normal">Price per share</p>
          <p className="font-bold">{`1 roUSD = ${toFixedNumber(
            pricePerShare,
            4,
          ).toString()} ${selectedCurrency.toUpperCase()}`}</p>
        </li>
        <li className="flex items-center justify-between text-sm font-light">
          <p className="font-normal">Minimum deposit amount</p>
          <p className="font-bold">$5</p>
        </li>
      </ul>

      <Button
        type="button"
        size="lg"
        color="primary"
        isLoading={isButtonLoading}
        isDisabled={disabledButton}
        onClick={() => setIsOpenConfirmDialog(true)}
      >
        {skipApprove ? 'Deposit' : 'Approve'}
      </Button>

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
