import Image from 'next/image';

import maxImg from '../../public/images/max.png';
import { VaultIcon } from './icons';

const VaultActionCard = () => {
  return (
    <div className="bg-[#5A5A5A] rounded-2xl bg-opacity-10 p-9">
      <ul className="flex w-full">
        <li className="flex-1">
          <button type="button" className="w-full bg-rock-button rounded-full py-2.5 uppercase">
            Deposit
          </button>
        </li>
        <li className="flex-1">
          <button type="button" className="w-full py-2.5 uppercase">
            Withdraw
          </button>
        </li>
      </ul>

      <div className="mt-10">
        <p className="text-3xl font-semibold uppercase text-rock-gray">Rock onyx vault</p>
        <div className="flex flex-col gap-6 bg-[#5A5A5A] rounded-2xl bg-opacity-10 mt-6 p-7">
          <div className="flex items-center justify-between">
            <p className="text-rock-gray">APR to date:</p>
            <p>14%</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-rock-gray">Withdrawals</p>
            <p>Instants</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-12">
        <p className="text-3xl text-rock-gray font-semibold uppercase">USDT AMOUNT</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-rock-gray">Wallet Balance: 0000 USDT</p>
          <button type="button">
            <Image src={maxImg} alt="Max" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#5A5A5A] rounded-2xl bg-opacity-10 mt-4 p-3">
        <VaultIcon className="w-12 h-12 rounded-md bg-rock-blue p-2" />
        <div>
          <p>1.4444444</p>
          <p className="text-rock-gray">(0.0)</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-rock-gray mt-12">
        <p>Current Deposit</p>
        <p>0.0 USDT</p>
      </div>

      <button
        type="button"
        className="w-full bg-white text-rock-muted rounded-full uppercase mt-8 py-2.5"
      >
        Deposit
      </button>
    </div>
  );
};

export default VaultActionCard;
