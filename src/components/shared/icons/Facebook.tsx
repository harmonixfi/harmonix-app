import { IconProps } from '@/@types/common';

const Facebook = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect width="40" height="40" rx="20" fill="#1C1C22" />
      <path
        d="M21.3809 20.2144H24.4827L24.9697 17.0718H21.3803V15.3542C21.3803 14.0486 21.808 12.891 23.0324 12.891H25V10.1485C24.6543 10.1019 23.9232 10 22.5416 10C19.6568 10 17.9656 11.5194 17.9656 14.9811V17.0718H15V20.2144H17.9656V28.8521C18.5529 28.9402 19.1477 29 19.7584 29C20.3104 29 20.8491 28.9497 21.3809 28.8779V20.2144Z"
        fill="white"
      />
    </svg>
  );
};

export default Facebook;
