import { IconProps } from '@/@types/common';

const PortfolioMenu = ({ className }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.33447 17.3333C5.33447 14.8192 5.33447 13.5621 6.11552 12.781C6.89657 12 8.15365 12 10.6678 12H21.3345C23.8486 12 25.1057 12 25.8868 12.781C26.6678 13.5621 26.6678 14.8192 26.6678 17.3333V20C26.6678 23.7712 26.6678 25.6569 25.4962 26.8284C24.3247 28 22.439 28 18.6678 28H13.3345C9.56324 28 7.67762 28 6.50605 26.8284C5.33447 25.6569 5.33447 23.7712 5.33447 20V17.3333Z"
        stroke="currentColor"
        strokeWidth="2.66667"
      />
      <path
        d="M21.3346 10.6667V9.33333C21.3346 6.38781 18.9468 4 16.0013 4V4C13.0558 4 10.668 6.38781 10.668 9.33333V10.6667"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PortfolioMenu;
