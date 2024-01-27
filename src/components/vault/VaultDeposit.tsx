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

import { SupportedCurrency } from '@/@types/enum';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import usdcAbi from '@/abi/usdc.json';
import { FLOAT_REGEX } from '@/constants/regex';
import useAppConfig from '@/hooks/useAppConfig';
import useTransactionStatusDialog from '@/hooks/useTransactionStatusDialog';

import CurrencySelect from '../shared/CurrencySelect';
import TransactionStatusDialog from '../shared/TransactionStatusDialog';
import { SpinnerIcon, WarningIcon } from '../shared/icons';

const rockAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';
const tokenAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS ?? '';

const VaultDeposit = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(
    SupportedCurrency.Usdc,
  );

  const { transactionBaseUrl } = useAppConfig();
  const { isOpen, type, url, onOpenDialog, onCloseDialog } = useTransactionStatusDialog();

  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  const { contract: rockOnyxUSDTVaultContract } = useContract(rockAddress, rockOnyxUsdtVaultAbi);
  const { contract: usdcContract } = useContract(tokenAddress, usdcAbi);
  const { data: balanceOf } = useContractRead(rockOnyxUSDTVaultContract, 'balanceOf', [address]);

  const { data: pricePerShareData } = useContractRead(rockOnyxUSDTVaultContract, 'pricePerShare');
  const pricePerShare = pricePerShareData ? ethers.utils.formatUnits(pricePerShareData._hex, 6) : 0;

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
        <p className="text-lg lg:text-xl text-rock-gray font-semibold uppercase">{`Amount (${selectedCurrency})`}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-rock-gray">
            Wallet Balance: {tokenBalance ? tokenBalance.displayValue : '0'} USDC
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
          className="w-full h-20 block bg-[#5A5A5A] rounded-xl bg-opacity-10 pl-8 pr-[180px] text-2xl text-rock-gray focus:ring-2 focus:outline-none"
          type="text"
          placeholder="0.0"
          disabled={!isConnectedWallet}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
        <div className="absolute top-1.5 right-6">
          <CurrencySelect value={selectedCurrency} onChange={setSelectedCurrency} />
        </div>
      </div>
      {pricePerShare && (
        <p className="w-full text-right text-rock-gray text-xs font-light mt-2">{`1 ${selectedCurrency.toUpperCase()} = ${pricePerShare} roUSD`}</p>
      )}

      <div className="flex items-center justify-between mt-8 text-rock-gray">
        <p>You will receive</p>
        <div className="flex items-center justify-between gap-2">
          <p>{`${Number(pricePerShare) * Number(inputValue)} roUSD`}</p>
        </div>
      </div>

      <div
        className="w-full h-[1px] my-3 lg:my-6"
        style={{
          background:
            'linear-gradient(270deg, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
        }}
      />

      <div className="flex items-center justify-between text-sm lg:text-base text-rock-gray">
        <p>Current Deposit</p>
        <p>{`${balanceOf ? ethers.utils.formatUnits(balanceOf._hex, 6) : 0} USDC`}</p>
      </div>

      <button
        type="button"
        className={`w-full flex items-center justify-center gap-2 bg-rock-primary text-sm lg:text-base text-white font-light rounded-full uppercase mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20 text-opacity-40' : ''
        } ${isButtonLoading ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={handleDeposit}
      >
        {isButtonLoading && <SpinnerIcon className="w-6 h-6 animate-spin" />}
        Deposit
      </button>

      <TransactionStatusDialog isOpen={isOpen} type={type} url={url} onClose={onCloseDialog} />
    </div>
  );
};

export default VaultDeposit;
