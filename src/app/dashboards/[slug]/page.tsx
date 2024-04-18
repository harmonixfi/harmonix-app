import { startCase } from 'lodash';

import {
  AreaChartWidget,
  BalanceWidget,
  FeeWidget,
  StatisticWidget,
  TextWidget,
} from '@/components/dashboard';
import HomeNavbar from '@/components/shared/navbar/HomeNavbar';
import { toCurrency } from '@/utils/currency';
import { toFixedNumber, withCommas } from '@/utils/number';
import { maskAddress } from '@/utils/string';

export default async function VaultDashboard({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-[90%] mx-auto">
      <HomeNavbar />
      <div className="w-full flex flex-col items-center gap-6 pb-24">
        <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold uppercase mt-0 sm:mt-12 mb-8">
          {startCase(params.slug)}
        </h3>
        <div className="w-[90%] sm:w-4/5 md:w-full 3xl:w-[1250px] space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <TextWidget title="Price per share" value={toCurrency(1.2025522, 4)} />
            <TextWidget title="APY" value="128%" />
            <TextWidget title="Total value locked" value={toCurrency(1000000)} />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <AreaChartWidget title="Performance" />
            <AreaChartWidget title="Total value locked" />
          </div>
          <div className="grid grid-cols-12 items-stretch gap-8">
            <div className="col-span-4 flex">
              <BalanceWidget balance={12000} pnl={35.222322} />
            </div>
            <div className="col-span-8 flex">
              <FeeWidget />
            </div>
          </div>
          <StatisticWidget
            statistics={[
              {
                name: 'Vault address',
                value: maskAddress('0x9b1a4fCb7AF2a1438F1F45B17d0018021d49JIU7'),
              },
              {
                name: 'Manager address',
                value: maskAddress('0x9b1a4fCb7AF2a1438F1F45B17d0018021d49JIU7'),
              },
              { name: 'Risk factor', value: '2/5' },
              { name: 'All-time high', value: toCurrency(3.52316, 4) },
              { name: 'Total shares', value: 8000 },
              { name: 'Unique depositors', value: 1200 },
              { name: 'Earned fee', value: toCurrency(8200) },
              { name: 'Sortino ratio', value: 2.5 },
              { name: 'Downside volatility', value: '1.7%' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
