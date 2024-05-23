'use client';

import { ethers } from 'ethers';

import Typography from '@/components/shared/Typography';
import { AevoIcon, LidoIcon, OrderIcon } from '@/components/shared/icons';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { toFixedNumber } from '@/utils/number';

const RestakingRenzoSafetyAssurance = () => {
  const { vaultAbi, vaultAddress } = useVaultDetailContext();

  const { allocatedRatioData } = useVaultQueries(vaultAbi, vaultAddress);

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
                <LidoIcon className="w-10 h-10 p-1.5 rounded-md pl-3" />
                <span className="-ml-4 pl-3 -translate-y-0.5 text-rock-sub-body">wstETH</span>
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
                <AevoIcon className="w-10 h-10 p-1.5 rounded-md" />
                <span className="text-rock-sub-body">USDC, USDT</span>
              </td>
              <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">
                {`${
                  Array.isArray(allocatedRatioData) && allocatedRatioData[1]
                    ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[1], 2)))
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

export default RestakingRenzoSafetyAssurance;
