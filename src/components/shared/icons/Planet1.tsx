import { IconProps } from '@/@types/common';

const Planet1 = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
    >
      <g filter="url(#filter0_f_380_1651)">
        <circle cx="22.5" cy="22.5" r="17.5" fill="url(#paint0_linear_380_1651)" />
      </g>
      <defs>
        <filter
          id="filter0_f_380_1651"
          x="0"
          y="0"
          width="45"
          height="45"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_380_1651" />
        </filter>
        <linearGradient
          id="paint0_linear_380_1651"
          x1="13"
          y1="5"
          x2="27.0259"
          y2="45.1293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C1426" />
          <stop offset="0.59375" stopColor="#2553F8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Planet1;
