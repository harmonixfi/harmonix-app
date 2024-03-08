import Typography from '@/components/shared/Typography';
import Navbar from '@/components/shared/navbar/Navbar';

export default async function Portfolio() {
  return (
    <>
      <Navbar />

      <div className="w-[90%] sm:w-3/5 md:w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-24 md:mb-32 xl:mb-48 px-6 sm:px-0 md:px-8 lg:px-0">
        <Typography variant="subheading">Portfolio Overview</Typography>

        <div className="md:w-[360px] xl:w-[400px] bg-white bg-opacity-10 border border-rock-divider p-8 xl:p-11 rounded-2xl mt-8">
          <p className="text-base xl:text-xl uppercase text-rock-gray leading-3">Your balance</p>
          <div className="flex items-center justify-between mt-10">
            <p className="text-xl xl:text-2xl font-semibold leading-4">402.34 USDC</p>
            <p className="text-rock-green text-xl xl:text-2xl leading-4 font-normal">+14.95%</p>
          </div>
        </div>

        <p className="text-3xl font-semibold uppercase mt-16 xl:mt-24 mb-6">
          Your active positions
        </p>

        <div className="w-full 3xl:w-4/5 border border-rock-divider rounded-2xl p-6 2xl:p-9">
          <div className="grid grid-cols-7 px-6 text-rock-sub-body uppercase text-left text-xs lg:text-sm 2xl:text-base font-semibold">
            <p className="col-span-2 ">Vault name</p>
            <p className="text-left">Total balance</p>
            <p className="text-left">Initial deposit</p>
            <p className="text-center">PNL</p>
            <p className="text-center">PNL %</p>
            <p className="text-center">APY</p>
          </div>

          <div className="grid grid-cols-7 mt-4 lg:mt-6 p-6 bg-white bg-opacity-10 rounded-2xl text-xs lg:text-sm">
            <p className="col-span-2">1. Stable coin vault</p>
            <p>52.17 USDC</p>
            <p>50.00 USDC</p>
            <p className="text-center text-rock-green">2.17 USDC</p>
            <p className="text-center text-rock-green">4%</p>
            <p className="text-center text-rock-green">821%</p>

            <div className="col-span-7">
              <div className="grid grid-cols-2 3xl:gap-16 bg-rock-bg rounded-lg px-6 py-4 mt-6 text-rock-sub-body text-xs 2xl:text-sm font-normal">
                <div className="grid grid-cols-2 3xl:grid-cols-3 gap-y-2">
                  <p>Trade Start Date:</p>
                  <p className="3xl:col-span-2">09 Feb, 2024</p>
                  <p>Current Round No.:</p>
                  <p className="3xl:col-span-2">#2</p>
                  <p>Next Close Round Date:</p>
                  <p className="3xl:col-span-2"> 23 Feb, 2024</p>
                </div>

                <div className="grid grid-cols-2 3xl:grid-cols-3 gap-y-2">
                  <p>Pending Withdrawal:</p>
                  <p className="3xl:col-span-2">20 roUSD</p>
                  <p>Current Price Per Share:</p>
                  <p className="3xl:col-span-2">1 roUSD = 1.04 USDC</p>
                  <p>Total Locked Value:</p>
                  <p className="3xl:col-span-2"> 1,152 USDC</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 mt-4 p-6 bg-white bg-opacity-10 rounded-2xl text-xs lg:text-sm">
            <p className="col-span-2">2. ETH Delta Neutral Vault</p>
            <p>52.17 USDC</p>
            <p>50.00 USDC</p>
            <p className="text-center text-rock-green">2.17 USDC</p>
            <p className="text-center text-rock-green">4%</p>
            <p className="text-center text-rock-green">821%</p>
          </div>
        </div>
      </div>
    </>
  );
}
