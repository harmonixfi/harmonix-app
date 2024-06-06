import { Card, Tooltip } from '@nextui-org/react';

import { QuestionIcon } from '@/components/shared/icons';

const VaultFeeTransparency = () => {
  return (
    <Card className="h-full p-8 space-y-6 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Fee transparency</p>
      <div className="flex flex-wrap items-center gap-2">
        <div className="shrink-0 basis-1/3 xl:basis-1/3 2xl:basis-1/4 3xl:basis-1/4 grow flex flex-col items-center justify-between gap-2 bg-rock-grey01 rounded-2xl py-6">
          <p className="opacity-50">Entry</p>
          <p className="text-lg font-bold">0%</p>
        </div>
        <div className="shrink-0 basis-1/3 xl:basis-1/3 2xl:basis-1/4 3xl:basis-1/4 grow flex flex-col items-center justify-between gap-2 bg-rock-grey01 rounded-2xl py-6">
          <div className="flex items-center gap-1 xl:gap-2">
            <p className="opacity-50">Exit</p>
            <Tooltip
              showArrow
              color="foreground"
              closeDelay={100}
              classNames={{ base: 'w-64' }}
              content="Penalty fee when you withdraw in 1 month."
            >
              <span>
                <QuestionIcon className="w-4 h-4" />
              </span>
            </Tooltip>
          </div>
          <p className="text-lg font-bold">0.5%</p>
        </div>
        <div className="shrink-0 basis-1/3 xl:basis-1/3 2xl:basis-1/4 3xl:basis-1/4 grow flex flex-col items-center justify-between gap-2 bg-rock-grey01 rounded-2xl py-6">
          <div className="flex items-center gap-1 xl:gap-2">
            <p className="opacity-50">Performance</p>
            <Tooltip
              showArrow
              color="foreground"
              closeDelay={100}
              classNames={{ base: 'w-64' }}
              content="We will charge the performance fee when you withdraw fund with profit."
            >
              <span>
                <QuestionIcon className="w-4 h-4" />
              </span>
            </Tooltip>
          </div>
          <p className="text-lg font-bold">10%</p>
        </div>
        <div className="shrink-0 basis-1/3 xl:basis-1/3 2xl:basis-1/4 3xl:basis-1/4 grow flex flex-col items-center justify-between gap-2 bg-rock-grey01 rounded-2xl py-6">
          <div className="flex items-center gap-1 xl:gap-2">
            <p className="opacity-50">Management</p>
            <Tooltip
              showArrow
              color="foreground"
              closeDelay={100}
              classNames={{ base: 'w-64' }}
              content="We will charge the management fee when you withdraw fund."
            >
              <span>
                <QuestionIcon className="w-4 h-4" />
              </span>
            </Tooltip>
          </div>
          <p className="text-lg font-bold">1%</p>
        </div>
      </div>
    </Card>
  );
};

export default VaultFeeTransparency;
