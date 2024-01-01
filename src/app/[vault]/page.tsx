import { getVaultInfo, getVaultPerformance } from '@/api/vault';
import Select from '@/components/shared/Select';
import Tooltip from '@/components/shared/Tooltip';
import { LineChartData } from '@/components/shared/chart/LineChart';
import { QuestionIcon, VaultIcon } from '@/components/shared/icons';
import Navbar from '@/components/shared/navbar/Navbar';
import VaultActionCard from '@/components/vault/VaultActionCard';
import VaultChart from '@/components/vault/VaultChart';
import VaultSummary from '@/components/vault/VaultSummary';

async function getData() {
  const [vaultInfo, vaultPerformance] = await Promise.all([getVaultInfo(), getVaultPerformance()]);

  return { vaultInfo, vaultPerformance };
}

export default async function LaunchApp() {
  const {
    vaultInfo: { apr, weekly_apy, monthly_apy, total_deposit },
    vaultPerformance: { date, cum_return, benchmark_ret },
  } = await getData();

  const marketData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: benchmark_ret[index],
  }));

  const onyxData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: cum_return[index],
  }));

  return (
    <>
      <Navbar />

      <div className="relative grid grid-cols-5 gap-20 my-24 z-20">
        <div className="col-span-3">
          <div className="flex flex-col gap-14">
            <h5 className="text-4xl font-normal uppercase">Stable Coin vault</h5>
            <VaultSummary
              weeklyApy={weekly_apy}
              monthlyApy={monthly_apy}
              totalDeposit={total_deposit}
            />

            <div className="border-t border-rock-divider pt-6">
              <VaultChart apr={apr} marketData={marketData} onyxData={onyxData} />
            </div>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-24 mt-48">
            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">An Overview of Stable coin vault</h5>
              <p className="text-base font-light">
                The Stable coin vault - hedging vault utilizing a set of strategies from Options to
                collect premium fee as yield while dynamically adjusting the allocation of assets
                during a market downturn, and decreasing the proportion of assets relative to cash
                when the market experiences a substantial uptrend. This approach aims to optimize
                the yield from asset holdings.
              </p>
            </div>

            {/* Safety & Assurance */}
            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">Safety & Assurance</h5>
              <div className="bg-rock-bg-tab rounded-2xl p-9">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="text-rock-gray uppercase text-left">Asset</th>
                      <th className="text-rock-gray uppercase text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>ETH</span>
                      </td>
                      <td className="p-3 rounded-r-lg">60%</td>
                    </tr>
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>USDC</span>
                      </td>
                      <td className="p-3 rounded-r-lg">20%</td>
                    </tr>
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>USDC.e</span>
                      </td>
                      <td className="p-3 rounded-r-lg">20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fee transparency */}
            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">Fee transparency</h5>
              <div className="relative grid grid-cols-4 bg-rock-bg-tab rounded-2xl uppercase py-6">
                <div className="flex flex-col items-center justify-between gap-4">
                  <p className="text-rock-gray text-base">Entry</p>
                  <p className="text-3xl font-semibold">0%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-base text-rock-gray font-semibold">
                    <p>Exit</p>
                    <Tooltip message="Penalty fee when you withdraw in 1 month.">
                      <QuestionIcon />
                    </Tooltip>
                  </div>
                  <p className="text-3xl font-semibold">0.5%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-base text-rock-gray font-semibold">
                    <p>Performance</p>
                    <Tooltip message="We will charge the performance fee when you withdraw fund with profit.">
                      <QuestionIcon />
                    </Tooltip>
                  </div>
                  <p className="text-3xl font-semibold">1%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-base text-rock-gray font-semibold">
                    <p>Management</p>
                    <Tooltip message="We will charge the management fee when you withdraw fund.">
                      <QuestionIcon />
                    </Tooltip>
                  </div>
                  <p className="text-3xl font-semibold">10%</p>
                </div>
                <div
                  className="w-[1px] h-full absolute top-0 left-1/4"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
                  }}
                />
                <div
                  className="w-[1px] h-full absolute top-0 left-1/2"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
                  }}
                />
                <div
                  className="w-[1px] h-full absolute top-0 left-3/4"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Withdrawals */}
            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">Withdrawals</h5>
              <p className="text-base font-light">
                We will settle the withdrawal every Friday, when the options positions expired.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <VaultActionCard />
        </div>
      </div>

      <div className="w-[50vw] h-[200vh] absolute top-0 right-[-5%] overflow-hidden z-10">
        <div
          className="w-full h-1/2 absolute top-0 -right-full rounded-full mix-blend-difference blur-[290px] rotate-[-45deg]"
          style={{
            background: 'linear-gradient(243deg, #D3382C 30.36%, #001AFF 70.7%)',
          }}
        />
      </div>

      <div className="absolute top-[75%] 2xl:top-[65%] w-full h-[100vh] z-10 opacity-60 blur-[60px] overflow-y-hidden">
        <div
          className="w-full h-full absolute top-full left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[290px] rotate-[-15deg]"
          style={{
            background: 'linear-gradient(243deg, #D3382C 30.36%, #001AFF 70.7%)',
          }}
        />
      </div>
    </>
  );
}
