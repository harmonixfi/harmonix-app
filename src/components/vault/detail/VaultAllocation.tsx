import { Card } from '@nextui-org/react';
import { ethers } from 'ethers';
import { useChains } from 'wagmi';

import { VaultNetwork, VaultVariant } from '@/@types/enum';
import { AevoIcon, CamelotIcon, KelpDaoIcon, LidoIcon, RenzoIcon } from '@/components/shared/icons';
import { supportedChainMapping } from '@/constants/chain';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { toFixedNumber } from '@/utils/number';

type VaultAllocationProps = {
  vaultNetwork: VaultNetwork;
};

const VaultAllocation = (props: VaultAllocationProps) => {
  const { vaultNetwork } = props;

  const configuredChains = useChains();

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[vaultNetwork])?.id;

  const { vaultAbi, vaultAddress, vaultVariant } = useVaultDetailContext();

  const { allocatedRatioData } = useVaultQueries(vaultAbi, vaultAddress, vaultVariant, chainId);

  return (
    <Card className="h-full p-8 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Vault allocation</p>
      <table className="w-full border-separate border-spacing-3 mt-6 py-4 bg-rock-grey01 rounded-2xl">
        <thead>
          <tr>
            <th className="text-base font-normal opacity-60">Asset</th>
            <th className="text-base font-normal opacity-60">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {vaultVariant === VaultVariant.OptionsWheel && renderOptionsWheel(allocatedRatioData)}
          {vaultVariant === VaultVariant.DeltaNeutral && renderDeltaNeutral(allocatedRatioData)}
          {vaultVariant === VaultVariant.RenzoRestaking && renderRenzoRestaking(allocatedRatioData)}
          {vaultVariant === VaultVariant.KelpdaoRestaking &&
            renderKelpdaoRestaking(allocatedRatioData)}
        </tbody>
      </table>
    </Card>
  );
};

const renderOptionsWheel = (allocatedRatioData: unknown) => {
  return (
    <>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <CamelotIcon className="w-6 h-6" />
          <span className="text-sm font-bold">ETH</span>
        </td>
        <td className="text-sm font-bold text-center">
          <span className="text-sm font-bold">{`${
            Array.isArray(allocatedRatioData) && allocatedRatioData[0]
              ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[0], 2)))
              : 0
          }%`}</span>
        </td>
      </tr>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <CamelotIcon className="w-6 h-6" />
          <span className="text-sm font-bold">USDC</span>
        </td>
        <td className="text-sm font-bold text-center">{`${
          Array.isArray(allocatedRatioData) && allocatedRatioData[1]
            ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[1], 2)))
            : 0
        }%`}</td>
      </tr>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <AevoIcon className="w-6 h-6" />
          <span className="text-sm font-bold">USDC</span>
        </td>
        <td className="text-sm font-bold text-center">{`${
          Array.isArray(allocatedRatioData) && allocatedRatioData[2]
            ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[2], 2)))
            : 0
        }%`}</td>
      </tr>
    </>
  );
};

const renderDeltaNeutral = (allocatedRatioData: unknown) => {
  return (
    <>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <LidoIcon className="w-6 h-6 -mr-2" />
          <span className="text-sm font-bold">wstEth</span>
        </td>
        <td className="text-sm font-bold text-center">
          {' '}
          <span className="text-sm font-bold">{`${
            Array.isArray(allocatedRatioData) && allocatedRatioData[0]
              ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[0], 2)))
              : 0
          }%`}</span>
        </td>
      </tr>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <AevoIcon className="w-6 h-6" />
          <span className="text-sm font-bold">USDC, USDT</span>
        </td>
        <td className="text-sm font-bold text-center">{`${
          Array.isArray(allocatedRatioData) && allocatedRatioData[1]
            ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[1], 2)))
            : 0
        }%`}</td>
      </tr>
    </>
  );
};

const renderRenzoRestaking = (allocatedRatioData: unknown) => {
  return (
    <>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <RenzoIcon className="w-6 h-6" />
          <span className="text-sm font-bold">ezETH</span>
        </td>
        <td className="text-sm font-bold text-center">
          {' '}
          <span className="text-sm font-bold">{`${
            Array.isArray(allocatedRatioData) && allocatedRatioData[0]
              ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[0], 2)))
              : 0
          }%`}</span>
        </td>
      </tr>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <AevoIcon className="w-6 h-6" />
          <span className="text-sm font-bold">USDC</span>
        </td>
        <td className="text-sm font-bold text-center">{`${
          Array.isArray(allocatedRatioData) && allocatedRatioData[1]
            ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[1], 2)))
            : 0
        }%`}</td>
      </tr>
    </>
  );
};

const renderKelpdaoRestaking = (allocatedRatioData: unknown) => {
  return (
    <>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <KelpDaoIcon className="w-6 h-6" />
          <span className="text-sm font-bold">rsETH</span>
        </td>
        <td className="text-sm font-bold text-center">
          {' '}
          <span className="text-sm font-bold">{`${
            Array.isArray(allocatedRatioData) && allocatedRatioData[0]
              ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[0], 2)))
              : 0
          }%`}</span>
        </td>
      </tr>
      <tr>
        <td className="flex items-center justify-start gap-2 pl-4">
          <AevoIcon className="w-6 h-6" />
          <span className="text-sm font-bold">USDC</span>
        </td>
        <td className="text-sm font-bold text-center">{`${
          Array.isArray(allocatedRatioData) && allocatedRatioData[1]
            ? toFixedNumber(Number(ethers.utils.formatUnits(allocatedRatioData[1], 2)))
            : 0
        }%`}</td>
      </tr>
    </>
  );
};

export default VaultAllocation;
