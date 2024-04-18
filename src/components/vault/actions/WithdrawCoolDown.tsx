'use client';

import { InformationIcon } from '@/components/shared/icons';
import useCountdown from '@/hooks/useCountdown';
import { minDigits } from '@/utils/number';

type WithdrawCoolDownProps = {
  targetDate: string;
  onCoolDownEnd: () => void;
};

const WithdrawCoolDown = (props: WithdrawCoolDownProps) => {
  const { targetDate, onCoolDownEnd } = props;

  const { days, hours, minutes, seconds } = useCountdown(targetDate, onCoolDownEnd);

  const timer = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-rock-bg rounded-lg mt-4 px-4 sm:px-6 py-6">
      <div className="flex gap-2 text-sm font-normal">
        <InformationIcon className="translate-y-0.5" />
        <span className="text-rock-gray">
          Time left until your shares are available to withdraw
        </span>
      </div>
      <div className="w-full flex justify-center gap-6 sm:gap-20 lg:gap-6 2xl:gap-12 mt-4">
        {timer.map((item, index) => (
          <div key={item.label} className="relative flex flex-col items-center gap-2">
            <span className="text-xs uppercase text-rock-gray">{item.label}</span>
            <div className="flex items-center justify-center bg-gray-50 rounded-md text-xl sm:text-2xl lg:text-xl xl:text-2xl font-semibold text-rock-bg w-10 sm:w-14 lg:w-10 xl:w-14 h-10 sm:h-1 lg:h-10 xl:h-14">
              {minDigits(item.value)}
            </div>
            {index < timer.length - 1 && (
              <span className="absolute bottom-1.5 sm:bottom-2.5 lg:bottom-1.5 xl:bottom-2.5 -right-4 sm:-right-10 lg:-right-4 2xl:-right-7 text-3xl text-gray-300 font-semibold">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawCoolDown;
