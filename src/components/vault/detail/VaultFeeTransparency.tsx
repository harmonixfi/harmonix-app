import { Card } from '@nextui-org/react';

import Tooltip from '@/components/shared/Tooltip';
import { QuestionIcon } from '@/components/shared/icons';

const VaultFeeTransparency = () => {
  return (
    <Card className="px-6 py-4 space-y-6">
      <p className="uppercase">Fee transparency</p>
      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-8 pb-4">
        <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
          <p className="text-rock-sub-body text-xs xl:text-base">Entry</p>
          <p className="text-sm sm:text-xl xl:text-3xl font-semibold">0%</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
          <div className="flex items-center gap-1 xl:gap-2 text-sm xl:text-base text-rock-sub-body">
            <p className="text-xs xl:text-base">Exit</p>
            <Tooltip message="Penalty fee when you withdraw in 1 month.">
              <QuestionIcon className="w-4 h-4 xl:w-6 xl:h-6" />
            </Tooltip>
          </div>
          <p className="text-sm sm:text-xl xl:text-3xl font-semibold">0.5%</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
          <div className="flex items-center gap-1 xl:gap-2 text-sm xl:text-base text-rock-sub-body">
            <p className="text-xs xl:text-base">Performance</p>
            <Tooltip message="We will charge the performance fee when you withdraw fund with profit.">
              <QuestionIcon className="w-4 h-4 xl:w-6 xl:h-6" />
            </Tooltip>
          </div>
          <p className="text-sm sm:text-xl xl:text-3xl font-semibold">10%</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
          <div className="flex items-center gap-1 xl:gap-2 text-sm xl:text-base text-rock-sub-body">
            <p className="text-xs xl:text-base">Management</p>
            <Tooltip message="We will charge the management fee when you withdraw fund.">
              <QuestionIcon className="w-4 h-4 xl:w-6 xl:h-6" />
            </Tooltip>
          </div>
          <p className="text-sm sm:text-xl xl:text-3xl font-semibold">1%</p>
        </div>
        <div className="w-full h-[1px] sm:w-[1px] sm:h-full absolute top-1/2 left-0 sm:top-0 sm:left-1/4 bg-rock-divider" />
        <div className="w-[1px] h-full absolute top-0 left-1/2 bg-rock-divider" />
        <div className="hidden sm:block w-[1px] h-full absolute top-0 left-3/4 bg-rock-divider" />
      </div>
    </Card>
  );
};

export default VaultFeeTransparency;
