import { Card } from '@nextui-org/react';

import { RenzoIcon } from '@/components/shared/icons';

type VaultAllocationProps = {};

const VaultAllocation = (props: VaultAllocationProps) => {
  return (
    <Card className="h-full p-8 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Vault allocation</p>
      <table className="w-full border-separate border-spacing-3 mt-6 py-4 bg-rock-grey01 rounded-2xl">
        <thead>
          <tr>
            <th className="text-sm font-normal opacity-60">Asset</th>
            <th className="text-sm font-normal opacity-60">Percentage</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td className="flex items-center justify-start gap-2 pl-4">
              <RenzoIcon className="w-6 h-6" />
              <span className="text-sm font-bold">ETH</span>
            </td>
            <td className="text-sm font-bold text-center">50%</td>
          </tr>
          <tr>
            <td className="flex items-center justify-start gap-2 pl-4">
              <RenzoIcon className="w-6 h-6" />
              <span className="text-sm font-bold">USDC</span>
            </td>
            <td className="text-sm font-bold text-center">25%</td>
          </tr>
          <tr>
            <td className="flex items-center justify-start gap-2 pl-4">
              <RenzoIcon className="w-6 h-6" />
              <span className="text-sm font-bold">USDC</span>
            </td>
            <td className="text-sm font-bold text-center">25%</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default VaultAllocation;
