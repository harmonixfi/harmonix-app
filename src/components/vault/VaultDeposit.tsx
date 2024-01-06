'use client';

import { ChangeEvent, useState } from 'react';

import {
  useAddress,
  useBalance,
  useConnectionStatus,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Image from 'next/image';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import usdcAbi from '@/abi/usdc.json';
import { FLOAT_REGEX } from '@/constants/regex';
import useAppConfig from '@/hooks/useAppConfig';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';

import maxImg from '../../../public/images/max.png';
import TransactionStatusDialog from '../shared/TransactionStatusDialog';
import { TCurrencyIcon, WarningIcon } from '../shared/icons';

const rockAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';
const tokenAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS ?? '';

const VaultDeposit = () => {
  const [inputValue, setInputValue] = useState('');

  const { transactionBaseUrl } = useAppConfig();
  const { isOpen, type, url, onOpenDialog, onCloseDialog } = useTransactionStatusDialog();

  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  const { contract: rockOnyxUSDTVaultContract } = useContract(rockAddress, rockOnyxUsdtVaultAbi);
  const { contract: usdcContract } = useContract(tokenAddress, usdcAbi);
  const { data: balanceOf } = useContractRead(rockOnyxUSDTVaultContract, 'balanceOf', [address]);

  const { mutateAsync: deposit, isLoading: isDepositing } = useContractWrite(
    rockOnyxUSDTVaultContract,
    'deposit',
  );
  const { mutateAsync: approve, isLoading: isApproving } = useContractWrite(
    usdcContract,
    'approve',
  );

  const { data: tokenBalance } = useBalance(tokenAddress);

  const handleDeposit = async () => {
    try {
      const amount = ethers.utils.parseUnits(inputValue, 6);
      await approve({ args: [rockAddress, amount] });
      const response = await deposit({ args: [amount] });

      onOpenDialog('success', `${transactionBaseUrl}/${response?.receipt?.transactionHash}`);
      setInputValue('');
    } catch {
      onOpenDialog('failed');
    }
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.match(FLOAT_REGEX)) setInputValue(value);
  };

  const handleClickMax = () => {
    setInputValue(tokenBalance?.displayValue ?? '');
  };
  const isConnectedWallet = connectionStatus === 'connected';
  const isButtonLoading = isDepositing || isApproving;
  const disabledButton = !isConnectedWallet || !inputValue || isButtonLoading;

  return (
    <div>
      {!isConnectedWallet && (
        <div className="flex items-center gap-2 mt-12">
          <WarningIcon />
          <p className="text-sm font-normal text-rock-yellow">Please connect wallet to deposit</p>
        </div>
      )}

      <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between mt-12">
        <p className="text-xl text-rock-gray font-semibold uppercase">USDC AMOUNT</p>
        <div className="flex items-center justify-between gap-2">
          {tokenBalance && (
            <p className="text-sm text-rock-gray">
              Wallet Balance: {tokenBalance.displayValue} USDC
            </p>
          )}
          <button type="button" onClick={handleClickMax}>
            <Image src={maxImg} alt="Max" />
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        <TCurrencyIcon className="absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          className="w-full h-16 block bg-[#5A5A5A] rounded-xl bg-opacity-10 pl-[72px] pr-3 text-lg text-rock-gray focus:ring-2 focus:outline-none"
          type="text"
          placeholder="0.0"
          disabled={!isConnectedWallet}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
      </div>

      <div className="flex items-center justify-between text-rock-gray mt-12">
        <p>Current Deposit</p>
        <p>{`${balanceOf ? ethers.utils.formatUnits(balanceOf._hex, 6) : 0} USDC`}</p>
      </div>

      <button
        type="button"
        className={`w-full bg-white text-rock-muted rounded-full uppercase mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20' : ''
        } ${isButtonLoading ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={handleDeposit}
      >
        {isButtonLoading ? 'Depositing...' : 'Deposit'}
      </button>

      <TransactionStatusDialog isOpen={isOpen} type={type} url={url} onClose={onCloseDialog} />
    </div>
  );
};

export default VaultDeposit;