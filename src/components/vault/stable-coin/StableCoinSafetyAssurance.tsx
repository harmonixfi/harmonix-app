'use client';

import { ethers } from 'ethers';

import Typography from '@/components/shared/Typography';
import {
  AevoIcon,
  CamelotIcon,
  ChartPinIcon,
  OrderIcon,
  StatIcon,
  WaterfallIcon,
} from '@/components/shared/icons';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { toFixedNumber } from '@/utils/number';

const StableCoinSafetyAssurance = () => {
  const { vaultAbi, vaultAddress } = useVaultDetailContext();

  const { allocatedRatioData } = useRockOnyxVaultQueries(vaultAbi, vaultAddress);

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
              <td className="flex items-center gap-2 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                <CamelotIcon className="w-10 h-10 p-1.5 rounded-md" />
                <span className="text-rock-sub-body">ETH</span>
              </td>
              <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">
                {`${
                  Array.isArray(allocatedRatioData) && allocatedRatioData[0]
                    ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[0], 2)))
                    : 0
                }%`}
              </td>
            </tr>
            <tr>
              <td className="flex items-center gap-2 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                <CamelotIcon className="w-10 h-10 p-1.5 rounded-md" />
                <span className="text-rock-sub-body">USDC</span>
              </td>
              <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">
                {`${
                  Array.isArray(allocatedRatioData) && allocatedRatioData[1]
                    ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[1], 2)))
                    : 0
                }%`}
              </td>
            </tr>
            <tr>
              <td className="flex items-center gap-2 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                <AevoIcon className="w-10 h-10 p-1.5 rounded-md" />
                <span className="text-rock-sub-body">USDC</span>
              </td>
              <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">
                {`${
                  Array.isArray(allocatedRatioData) && allocatedRatioData[2]
                    ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[2], 2)))
                    : 0
                }%`}
              </td>
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
            <StatIcon className="-translate-y-0.5" />
            <p>Market Risk</p>
          </div>
          <Typography variant="subbody">
            Due to the vault&apos;s strategy of buying and holding ETH (at a ratio of 60%), the
            performance of the vault will be correlated with the price of ETH. However, the risk
            during downtrends is reduced because only 60% of the assets are held in ETH.
          </Typography>
        </div>

        <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
            <ChartPinIcon className="-translate-y-0.5" />
            <p className="text-rock-sub-body">Conversion Risk</p>
          </div>
          <Typography variant="subbody">
            Trading covered options involves converting assets when the ETH price hits the strike
            price. This entails selling ETH for USDC to take profit and cover losses from options.
            Profits from these covered options typically range from 10% to 15%. However, selling ETH
            to take profit and then buying back when the market declines increases the quantity of
            ETH held when the market is sideways.
          </Typography>
        </div>

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
            <WaterfallIcon className="-translate-y-0.5" />
            <p className="text-rock-sub-body">For Market and Conversion Risks</p>
          </div>
          <Typography variant="subbody">
            In the initial phase, the vault&apos;s performance will be lower than simply buying and
            holding ETH. The vault offers a risk-reduction mechanism by holding only 60% ETH and
            generating profits through LP farming and options trading. Therefore, shortly after
            depositing funds, the performance will significantly lag behind the buy and hold
            strategy for ETH. However, in the long term, as profits from LP farming and options are
            reinvested through compounding, the vault&apos;s performance will closely track ETH
            performance, but with consistently lower drawdowns compared to the market.
          </Typography>
        </div>
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

export default StableCoinSafetyAssurance;
