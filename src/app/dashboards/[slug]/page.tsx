import { startCase } from 'lodash';
import Link from 'next/link';

import { AreaChartWidget, StatisticWidget, TextWidget } from '@/components/dashboard';
import { ChevronLeftIcon } from '@/components/shared/icons';
import HomeNavbar from '@/components/shared/navbar/HomeNavbar';
import { Urls } from '@/constants/urls';
import { toCurrency } from '@/utils/currency';
import { maskAddress } from '@/utils/string';

export default async function VaultDashboard({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-[90%] mx-auto">
      <HomeNavbar />
      <div className="w-[90%] sm:w-4/5 md:w-full 3xl:w-[1250px] flex flex-col items-stretch gap-8 mx-auto pt-12 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
          <div className="flex items-center gap-2">
            <Link href={Urls.Dashboard}>
              <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </Link>
            <h3 className="text-xl sm:text-3xl 2xl:text-4xl font-bold uppercase">
              {startCase(params.slug)}
            </h3>
          </div>

          <Link
            href={`${Urls.Vaults}/${params.slug}`}
            className="inline-block rounded-3xl text-center text-white text-sm font-normal bg-rock-primary px-8 py-2 sm:py-3 hover:ring-2 hover:ring-rock-divider"
          >
            Deposit
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TextWidget title="Price per share" value={toCurrency(1.2025522, 4)} />
          <TextWidget title="APY" value="128%" />
          <TextWidget title="Total value locked" value={toCurrency(1000000)} />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <AreaChartWidget title="Performance" />
          <AreaChartWidget title="Total value locked" />
        </div>
        {/* <div className="grid grid-cols-12 items-stretch gap-8">
          <div className="col-span-5 flex">
            <BalanceWidget balance={12000} pnl={35.222322} />
          </div>
          <div className="col-span-7 flex">
            <FeeWidget />
          </div>
        </div> */}
        <StatisticWidget
          statistics={[
            {
              label: 'Vault address',
              value: maskAddress('0x9b1a4fCb7AF2a1438F1F45B17d0018021d49JIU7'),
              link: 'google.com',
            },
            {
              label: 'Manager address',
              value: maskAddress('0x9b1a4fCb7AF2a1438F1F45B17d0018021d49JIU7'),
              link: 'google.com',
            },
            { label: 'Risk factor', value: '2/5' },
            { label: 'All-time high', value: toCurrency(3.52316, 4) },
            { label: 'Total shares', value: 8000 },
            { label: 'Unique depositors', value: 1200 },
            { label: 'Earned fee', value: toCurrency(8200) },
            { label: 'Sortino ratio', value: 2.5 },
            { label: 'Downside volatility', value: '1.7%' },
          ]}
        />
      </div>
    </div>
  );
}
