import Typography from '@/components/shared/Typography';
import {
  ChartPinIcon,
  OrderIcon,
  StatIcon,
  VaultIcon,
  WaterfallIcon,
} from '@/components/shared/icons';

const DeltaNeutralSafetyAssurance = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="border border-rock-divider rounded-2xl p-6 sm:p-9">
        <table className="w-full border-separate border-spacing-y-3 -mt-2 sm:mt-0">
          <thead>
            <tr>
              <th className="text-rock-sub-body uppercase text-left">Asset</th>
              <th className="text-rock-sub-body uppercase text-left">Percentage</th>
            </tr>
          </thead>
          <tbody className="mt-2">
            <tr>
              <td className="flex items-center gap-4 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                <VaultIcon className="bg-rock-blue opacity-60 w-10 h-10 p-1.5 rounded-md" />
                <span>wstETH</span>
              </td>
              <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">50%</td>
            </tr>
            <tr>
              <td className="flex items-center gap-4 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                <VaultIcon className="bg-rock-blue opacity-60 w-10 h-10 p-1.5 rounded-md" />
                <span>USDC, USDT</span>
              </td>
              <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">50%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* User's risk */}
      <div id="user-risk" className="flex flex-col gap-6">
        <p className="uppercase">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
          User&apos;s risk
        </p>
        <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
            <OrderIcon className="-translate-y-0.5" />
            <p className="text-rock-sub-body">Smart Contract Risk</p>
          </div>
          <Typography variant="subbody">
            There is smart contract risk associated with depositing funds on-chain and third parties
            risk
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="uppercase">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
          Rock Onyx&apos;s Solution
        </p>
        <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
            <OrderIcon className="-translate-y-0.5" />
            <p className="text-rock-sub-body">For smart contract risk</p>
          </div>
          <Typography variant="subbody">
            Rock Onyx is working with 3 audit firms to conduct code audits and maintain continuous
            oversight to ensure user protection.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DeltaNeutralSafetyAssurance;
