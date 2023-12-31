import Select from "@/components/Select";
import { InformationIcon, VaultIcon } from "@/components/icons";
import Navbar from "@/components/navbar/Navbar";
import { LineChartData } from "@/components/LineChart";
import { getVaultInfo, getVaultPerformance } from "@/api/vault";
import VaultChart from "@/components/VaultChart";
import VaultActionCard from "@/components/VaultActionCard";

async function getData() {
  const [vaultInfo, vaultPerformance] = await Promise.all([
    getVaultInfo(),
    getVaultPerformance(),
  ]);

  return { vaultInfo, vaultPerformance };
}

export default async function LaunchApp() {
  const {
    vaultInfo: { apr },
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

      <div className="grid grid-cols-5 gap-20 my-24">
        <div className="col-span-3">
          <div className="flex flex-col gap-14">
            <h5 className="text-4xl font-normal uppercase">
              Stable Coin vault
            </h5>
            <div className="relative flex justify-center gap-24 w-2/3 bg-rock-bg-tab rounded-2xl px-8 py-6">
              <div className="flex-1 flex flex-col items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-2xl text-rock-gray font-semibold">
                  <p>APY</p>
                  <InformationIcon />
                  <div>
                    <Select
                      placeholder="1W"
                      options={[
                        { label: "1W", value: "1w" },
                        { label: "1M", value: "1m" },
                      ]}
                    />
                  </div>
                </div>
                <p className="text-3xl font-semibold">392%</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-between gap-4">
                <p className="text-2xl text-rock-gray font-semibold translate-y-3">
                  TVL
                </p>
                <p className="text-3xl font-semibold">$7,945</p>
              </div>
              <div
                className="w-[1px] h-full absolute top-0 left-1/2"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)",
                }}
              />
            </div>

            <div className="border-t border-rock-divider pt-6">
              <VaultChart
                apr={apr}
                marketData={marketData}
                onyxData={onyxData}
              />
            </div>
          </div>

          <div className="flex flex-col gap-24 mt-48">
            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">
                An Overview of Stable coin vault
              </h5>
              <p className="text-base font-light text-rock-gray">
                The Stable coin vault - hedging vault utilizing a set of
                strategies from Options to collect premium fee as yield while
                dynamically adjusting the allocation of assets during a market
                downturn, and decreasing the proportion of assets relative to
                cash when the market experiences a substantial uptrend. This
                approach aims to optimize the yield from asset holdings.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">
                Safety & Assurance
              </h5>
              <div className="bg-rock-bg-tab rounded-2xl p-9">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="text-rock-gray uppercase text-left">
                        Asset
                      </th>
                      <th className="text-rock-gray uppercase text-left">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>wstETH</span>
                      </td>
                      <td className="p-3 rounded-r-lg">63.3%</td>
                    </tr>
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>wstETH</span>
                      </td>
                      <td className="p-3 rounded-r-lg">63.3%</td>
                    </tr>
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>wstETH</span>
                      </td>
                      <td className="p-3 rounded-r-lg">63.3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-base font-light text-rock-gray">
                This token engages with the subsequent assets and protocols:
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">
                Free transparency
              </h5>
              <div className="relative grid grid-cols-4 bg-rock-bg-tab rounded-2xl uppercase py-6">
                <div className="flex flex-col items-center justify-between gap-4">
                  <p className="text-rock-gray text-base">Entry</p>
                  <p className="text-3xl font-semibold">0%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <p className="text-rock-gray text-base">Exit</p>
                  <p className="text-3xl font-semibold">0.5%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-base text-rock-gray font-semibold">
                    <p>Performance</p>
                    <InformationIcon />
                  </div>
                  <p className="text-3xl font-semibold">1%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-base text-rock-gray font-semibold">
                    <p>Management</p>
                    <InformationIcon />
                  </div>
                  <p className="text-3xl font-semibold">10%</p>
                </div>
                <div
                  className="w-[1px] h-full absolute top-0 left-1/4"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)",
                  }}
                />
                <div
                  className="w-[1px] h-full absolute top-0 left-1/2"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)",
                  }}
                />
                <div
                  className="w-[1px] h-full absolute top-0 left-3/4"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)",
                  }}
                />
              </div>
              <p className="text-base font-light text-rock-gray">
                The Stable coin vault - hedging vault utilizing a set of
                strategies from Options  to collect premium fee as yield while
                dynamically adjusting the allocation of assets during a market
                downturn, and decreasing the proportion of assets relative to
                cash when the market experiences a substantial uptrend. This
                approach aims to optimize the yield from asset holdings.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="text-4xl font-normal uppercase">Withdrawals</h5>
              <p className="text-base font-light text-rock-gray">
                For your security, once you buy this token, you&apos;ll need to
                wait 15 minutes before selling. This helps keep your funds safe
                from flash loan and arbitrage attacks.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 z-20">
          <VaultActionCard />
        </div>
      </div>

      <div className="w-[50vw] h-[200vh] absolute top-0 right-[-5%] overflow-hidden z-10">
        <div
          className="w-full h-1/2 absolute top-0 -right-full rounded-full mix-blend-difference blur-[290px] rotate-[-45deg]"
          style={{
            background:
              "linear-gradient(243deg, #D3382C 30.36%, #001AFF 70.7%)",
          }}
        />
      </div>

      <div className="absolute top-[75%] 2xl:top-[65%] w-full h-[100vh] opacity-60 blur-[60px] overflow-y-hidden">
        <div
          className="w-full h-full absolute top-full left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[290px] rotate-[-15deg]"
          style={{
            background:
              "linear-gradient(243deg, #D3382C 30.36%, #001AFF 70.7%)",
          }}
        />
      </div>
    </>
  );
}

export const revalidate = 60 * 60;
