import Typography from '@/components/shared/Typography';

const DeltaNeutralOverview = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Typography variant="body">
          We generate yield by shorting ETH on perpetual markets with a favorable funding rate,
          while simultaneously holding ETH in spot or yield to maintain a neutral delta against USD.
          Additionally, to leverage the features of DeFi, we hold wstETH to earn approximately{' '}
          <span className="font-bold text-[#4281FF]">4%</span> yield and add collateral asset AEVO
          to earn <span className="font-bold text-[#4281FF]">14%</span>.
        </Typography>

        <ul className="grid grid-cols-2 gap-6">
          <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-xl p-6">
            <p className="text-rock-sub-body font-light">ETH Holding</p>
            <p className="text-white text-2xl font-semibold">50%</p>
          </li>
          <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-xl p-6">
            <p className="text-rock-sub-body font-light">ETH Perp</p>
            <p className="text-white text-2xl font-semibold">50%</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DeltaNeutralOverview;
