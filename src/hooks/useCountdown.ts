import { useEffect, useState } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: string, onCountDownEnd: () => void): CountdownValues => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    // Update the countdown only if it's positive
    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const timeLeft = countDownDate - currentTime;
      if (timeLeft < 0) {
        clearInterval(interval);
        setCountDown(0);
        onCountDownEnd();
      } else {
        setCountDown(timeLeft);
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number): CountdownValues => {
  // Time calculations for days, hours, minutes and seconds
  const days: number = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes: number = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds: number = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export default useCountdown;
