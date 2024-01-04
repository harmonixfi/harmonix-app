'use client';

import { ChangeEvent, useState } from 'react';

import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { FLOAT_REGEX } from '@/constants/regex';

import withdrawAllImg from '../../../public/images/withdraw-all.png';
import { TCurrencyIcon } from '../shared/icons';

const rockAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';

type VaultWithdrawProps = {
  apr: number;
};

const VaultWithdraw = (props: VaultWithdrawProps) => {
  const { apr } = props;

  const [inputValue, setInputValue] = useState('');

  const address = useAddress();
  const { contract: rockOnyxUSDTVaultContract } = useContract(rockAddress, rockOnyxUsdtVaultAbi);
  const { data: balanceOf } = useContractRead(rockOnyxUSDTVaultContract, 'balanceOf', [address]);

  const { mutateAsync: withdraw, isLoading: isLoadingWithdraw } = useContractWrite(
    rockOnyxUSDTVaultContract,
    'initiateWithdraw',
  );

  const handleWithdraw = async () => {
    try {
      const amount = ethers.utils.parseUnits(inputValue, 6);
      await withdraw({ args: [amount] });
      enqueueSnackbar('You have withdraw successfully', {
        variant: 'success',
        autoHideDuration: 5000,
      });
      setInputValue('');
    } catch (error) {
      enqueueSnackbar(JSON.stringify(error), { variant: 'error', autoHideDuration: 5000 });
    }
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.match(FLOAT_REGEX)) setInputValue(value);
  };

  const handleClickWithdrawAll = () => {
    setInputValue(balanceOf ? ethers.utils.formatUnits(balanceOf._hex, 6) : '');
  };

  const disabledButton = isLoadingWithdraw || !inputValue;

  return (
    <div>
      <div className="mt-10">
        <p className="text-xl font-semibold uppercase text-rock-gray">Rock onyx vault</p>
        <div className="flex flex-col gap-6 bg-[#5A5A5A] rounded-2xl bg-opacity-10 mt-4 p-7">
          <div className="flex items-center justify-between">
            <p className="text-rock-gray">APR to date:</p>
            <p>{`${Math.round(apr)}%`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-rock-gray">Withdrawals</p>
            <p>5 - 7 days</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-12">
        <p className="text-xl text-rock-gray font-semibold uppercase">USDC AMOUNT</p>
        <div className="flex items-center justify-between gap-2 text-sm text-rock-gray">
          <p>
            <span>Your deposit</span>{' '}
            <span>{`${balanceOf ? ethers.utils.formatUnits(balanceOf._hex, 6) : 0} USDC`}</span>
          </p>
          <button type="button" onClick={handleClickWithdrawAll}>
            <Image src={withdrawAllImg} alt="Withdraw all" />
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        <TCurrencyIcon className="absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          className="w-full h-16 block bg-[#5A5A5A] rounded-xl bg-opacity-10 pl-[72px] pr-3 text-lg text-rock-gray focus:ring-2 focus:outline-none"
          type="text"
          placeholder="0.0"
          value={inputValue}
          onChange={handleChangeInputValue}
        />
      </div>

      <div className="text-rock-gray text-base mt-6">
        <div className="flex items-center justify-between">
          <p>Available liquidity</p>
          <p>{`${balanceOf ? ethers.utils.formatUnits(balanceOf._hex, 6) : 0} USDC`}</p>
        </div>

        <div
          className="w-full h-[1px] my-6"
          style={{
            background:
              'linear-gradient(270deg, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
          }}
        />

        <div className="flex items-center justify-between">
          <p>You will receive</p>
          <div className="flex items-center justify-between gap-2">
            <p>{`${balanceOf ? ethers.utils.formatUnits(balanceOf._hex, 6) : 0} USDC`}</p>
            <TCurrencyIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`w-full bg-white text-rock-muted rounded-full uppercase mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20' : ''
        } ${isLoadingWithdraw ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={handleWithdraw}
      >
        {isLoadingWithdraw ? 'Withdrawing...' : 'Withdraw'}
      </button>
    </div>
  );
};

export default VaultWithdraw;
