import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

type BalanceWidgetProps = {
  balance: number;
  pnl: number;
};

const BalanceWidget = (props: BalanceWidgetProps) => {
  const { balance, pnl } = props;
  return (
    <div className="w-full flex flex-col gap-6 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-6 py-2">
      <p className="text-rock-gray uppercase mt-3 ml-2">Balance</p>
      <div className="flex flex-col gap-3 pl-2 pb-4">
        <p className="text-sm md:text-xl font-semibold leading-4">{withCommas(balance)} USDC</p>
        <p
          className={`text-sm md:text-xl leading-4 font-normal ${
            Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >
          {formatPnl(toFixedNumber(pnl), true)} <span className="text-rock-gray">PNL</span>
        </p>
      </div>
    </div>
  );
};

export default BalanceWidget;
