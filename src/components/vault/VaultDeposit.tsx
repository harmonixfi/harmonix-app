'use client';

import { ChangeEvent, useState } from 'react';

import {
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import usdcAbi from '@/abi/usdc.json';
import { FLOAT_REGEX } from '@/constants/regex';

import maxImg from '../../../public/images/max.png';
import { TCurrencyIcon } from '../shared/icons';

const rockAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';
const tokenAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS ?? '';

const VaultDeposit = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoadingDeposit, setIsLoadingDeposit] = useState(false);

  const address = useAddress();
  const { contract: rockOnyxUSDTVaultContract } = useContract(rockAddress, rockOnyxUsdtVaultAbi);
  // // const { contract: usdcContract } = useContract(tokenAddress, usdcAbi);
  const { data: balanceOf } = useContractRead(rockOnyxUSDTVaultContract, 'balanceOf', [address]);

  // const {
  //   mutateAsync: deposit,
  //   isLoading: isLoadingDeposit,
  //   status: depositStatus,
  // } = useContractWrite(rockOnyxUSDTVaultContract, 'deposit');
  // const { mutateAsync: approve, isLoading, status } = useContractWrite(usdcContract, 'approve');

  const { data: tokenBalance } = useBalance(tokenAddress);

  const signer = useSigner();

  const rockContract = new ethers.Contract(rockAddress, rockOnyxUsdtVaultAbi, signer);
  const usdcContract = new ethers.Contract(tokenAddress, usdcAbi, signer);

  const handleDeposit = async () => {
    if (signer) {
      try {
        setIsLoadingDeposit(true);
        const amount = ethers.utils.parseUnits(inputValue, 6);
        await usdcContract.connect(signer);
        await usdcContract.approve(rockAddress, amount);
        // await approve({ args: [rockAddress, amount] });
        // console.log('@@approved');
        // await deposit({ args: [100] });
        await rockContract.connect(signer);
        const depositAction = await rockContract.deposit(amount);
        await depositAction.wait();
        enqueueSnackbar('You have deposited successfully', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        setInputValue('');
      } catch (error) {
        console.log(error);
        enqueueSnackbar(JSON.stringify(error), { variant: 'error', autoHideDuration: 5000 });
      } finally {
        setIsLoadingDeposit(false);
      }
    }
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.match(FLOAT_REGEX)) setInputValue(value);
  };

  const handleClickMax = () => {
    setInputValue(tokenBalance?.displayValue ?? '');
  };

  const disabledButton = isLoadingDeposit || !inputValue;

  return (
    <div>
      <div className="flex items-center justify-between mt-12">
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
          value={inputValue}
          onChange={handleChangeInputValue}
        />
      </div>

      <div className="flex items-center justify-between text-rock-gray mt-12">
        <p>Current Deposit</p>
        {balanceOf && <p>{ethers.utils.formatUnits(balanceOf._hex, 6)} USDC</p>}
      </div>

      <button
        type="button"
        className={`w-full bg-white text-rock-muted rounded-full uppercase mt-16 py-2.5 ${
          disabledButton ? 'bg-opacity-20' : ''
        } ${isLoadingDeposit ? 'animate-pulse' : ''}`}
        disabled={disabledButton}
        onClick={handleDeposit}
      >
        {isLoadingDeposit ? 'Depositing...' : 'Deposit'}
      </button>
    </div>
  );
};

export default VaultDeposit;
