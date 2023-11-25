import { getVaultInfo, getVaultPerformance } from "@/api/vault";
import Chart, { ChartData } from "@/components/Chart";
import Ethereum from "@/components/icons/Ethereum";
import dayjs from "dayjs";

async function getData() {
  const [vaultInfo, vaultPerformance] = await Promise.all([
    getVaultInfo(),
    getVaultPerformance(),
  ]);

  return { vaultInfo, vaultPerformance };
}

export default async function Vault() {
  const {
    vaultInfo: {
      apr,
      max_drawdown,
      total_deposit,
      vault_currency,
      vault_capacity,
    },
    vaultPerformance: { cum_return, benchmark_ret },
  } = await getData();

  const percentCapacity = (total_deposit / vault_capacity) * 100;

  const chartData: ChartData = cum_return.map((item, index) => ({
    cum_return: item,
    benchmark_ret: benchmark_ret[index],
    date_added: dayjs()
      .subtract(cum_return.length - index + 1, "day")
      .toISOString(),
  }));

  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center justify-between mx-auto p-24">
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          {/* Chart */}
          <div className="bg-secondary rounded-lg px-4 pt-4 pb-8">
            <div className="ml-4 mb-2">
              <p className="text-caption">APR to date</p>
              <p className="text-success text-xl font-semibold">{`${Math.round(
                apr
              )}%`}</p>
            </div>
            <div className="w-full h-[300px]">
              <Chart data={chartData} />
            </div>

            <div className="flex flex-col gap-2 mt-8">
              <div className="flex items-center justify-between text-sm">
                <p>{`${Intl.NumberFormat("en", { notation: "compact" }).format(
                  total_deposit
                )} ${vault_currency}`}</p>
                <p>{`${Intl.NumberFormat("en", { notation: "compact" }).format(
                  vault_capacity
                )} ${vault_currency}`}</p>
              </div>
              <div className="w-full h-1 bg-black rounded-full">
                <div
                  className="h-1 bg-[#69BEBE] rounded-full"
                  style={{ width: percentCapacity }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm text-caption">
                <p>Total Deposits</p>
                <p>Vault Capacity</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-caption mb-4">
              Description
            </h3>
            <p>
              The Orbitians is a collection of 10,000 unique NFTs on the
              Ethereum blockchain,
            </p>
            <p className="my-4">
              There are all sorts of beings in the NFT Universe. The most
              advanced and friendly of the bunch are Orbitians.
            </p>
            <p>
              They live in a metal space machines, high up in the sky and only
              have one foot on Earth. These Orbitians are a peaceful race, but
              they have been at war with a group of invaders for many
              generations. The invaders are called Upside-Downs, because of
              their inverted bodies that live on the ground, yet do not know any
              other way to be. Upside-Downs believe that they will be able to
              win this war if they could only get an eye into Orbitian
              territory, so they&apos;ve taken to make human beings their
              target.
            </p>
          </div>
        </div>

        {/* Deposit */}
        <div>
          <div className="bg-secondary rounded-lg px-4 pt-2 pb-8">
            <div className="grid grid-cols-2 border border-gray-700 rounded-md">
              <button type="button" className="border-b border-gray-400 py-2">
                Deposit
              </button>
              <button type="button" className="text-caption">
                Withdraw
              </button>
            </div>

            <div className="px-6">
              <div className="flex flex-col gap-3 bg-primary rounded-xl my-6 px-8 py-6">
                <h5 className="text-xl">Rock Onyx Vault</h5>
                <div className="flex items-center justify-between">
                  <p className="text-caption">APR to date:</p>
                  <p>{`${Math.round(apr)}%`}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-caption">Max Drawdown:</p>
                  <p>{`${Math.round(max_drawdown)}%`}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-caption">Withdrawals:</p>
                  <p>Instant</p>
                </div>
              </div>

              <div>
                <h5 className="mb-2">{`${vault_currency} Amount`}</h5>
                <div className="relative">
                  <Ethereum className="absolute top-1/2 left-2 -translate-y-1/2" />
                  <input
                    type="text"
                    className="w-full bg-primary rounded-xl px-12 py-3 border-none outline-none ring-0 focus:ring-1 focus:ring-gray-700"
                    defaultValue="0.0"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-sm uppercase"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 mt-4 text-sm text-caption">
            <p className="mb-2 text-base">Vault Fees</p>
            <div className="flex items-center justify-between">
              <p>Withdrawal Penalty:</p>
              <p>0.75%</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Vault usage (per anum):</p>
              <p>2%</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Yield (annual equivalent):</p>
              <p>20%</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60 * 60;
