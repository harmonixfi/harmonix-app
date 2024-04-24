import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

import WidgetCard from './WidgetCard';

type BalanceWidgetProps = {
  balance: number;
  pnl: number;
};

const BalanceWidget = (props: BalanceWidgetProps) => {
  const { balance, pnl } = props;
  return (
    <WidgetCard name="Balance">
      <div className="flex flex-col gap-3 pl-6 pb-4">
        <p className="text-sm md:text-xl font-semibold leading-4">{withCommas(balance)} USDC</p>
        <p
          className={`text-sm md:text-xl leading-4 font-normal ${
            Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >
          {formatPnl(toFixedNumber(pnl), true)} <span className="text-rock-gray">PNL</span>
        </p>
      </div>
    </WidgetCard>
  );
};

export default BalanceWidget;
