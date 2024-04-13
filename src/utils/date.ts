import { UTCDate } from '@date-fns/utc';
import {
  addHours,
  addWeeks,
  setDay,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';

export const getOptionsWheelWithdrawalDate = () => {
  // Get the current date
  const now = new UTCDate();

  // Set the time to 8 AM UTC
  const baseTime = setHours(setMinutes(setSeconds(setMilliseconds(now, 0), 0), 0), 8);

  // Find the next Friday
  // Friday is represented as 5 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const nextFriday = setDay(baseTime, 5, { weekStartsOn: 1 });

  // If it's currently Friday and before 8 AM, don't add a week
  const nextFridayAt8AMUTC = nextFriday > now ? nextFriday : addWeeks(nextFriday, 1);

  // Ensure the time is still 8 AM UTC
  const finalDate = setHours(
    setMinutes(setSeconds(setMilliseconds(nextFridayAt8AMUTC, 0), 0), 0),
    8,
  );

  return finalDate;
};

export const getDeltaNeutralWithdrawalDate = (initDate: string) => {
  return addHours(new Date(initDate), 4);
};
