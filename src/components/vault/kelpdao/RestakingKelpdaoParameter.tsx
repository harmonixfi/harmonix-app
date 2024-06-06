import Tooltip from '@/components/shared/Tooltip';
import { QuestionIcon, UsdcCircleIcon } from '@/components/shared/icons';

const RestakingKelpdaoParameter = () => {
  return (
    <ul className="w-full 2xl:w-4/5 grid grid-cols-2 sm:grid-cols-3 gap-4 xl:gap-6">
      <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
        <p className="text-rock-sub-body font-light text-center">Deposit assets</p>
        <div className="flex items-center gap-2">
          <UsdcCircleIcon className="w-6 h-6" />
          <p className="font-semibold text-sm text-center">USDC/USDT</p>
        </div>
      </li>

      <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
        <p className="text-rock-sub-body font-light text-center">Settlement assets</p>
        <div className="flex items-center gap-2">
          <UsdcCircleIcon className="w-6 h-6" />
          <p className="font-semibold text-sm text-center">USDC/USDT</p>
        </div>
      </li>

      <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <p className="text-rock-sub-body font-light text-center">Underlying Asset</p>
          <Tooltip message="The asset or asset pair in which your investment performance is dependent on.">
            <QuestionIcon className="w-4 h-4" />
          </Tooltip>
        </div>
        <p className="font-semibold text-sm text-center">wstEth-Eth</p>
      </li>

      <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
        <p className="text-rock-sub-body font-light text-center">Initiate Withdrawal</p>
        <p className="font-semibold text-sm text-center">Any time</p>
      </li>

      <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
        <p className="text-rock-sub-body font-light text-center">Withdrawal</p>
        <p className="font-semibold text-sm text-center">After 1 - 4 hours</p>
      </li>
    </ul>
  );
};

export default RestakingKelpdaoParameter;
