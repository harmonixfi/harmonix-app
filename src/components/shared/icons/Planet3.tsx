import { IconProps } from '@/@types/common';

const Planet3 = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="71"
      height="71"
      viewBox="0 0 71 71"
      fill="none"
    >
      <g filter="url(#filter0_f_380_1664)">
        <circle cx="35.5" cy="35.4998" r="25.5" fill="url(#paint0_linear_380_1664)" />
      </g>
      <defs>
        <filter
          id="filter0_f_380_1664"
          x="0"
          y="-0.000244141"
          width="71"
          height="71"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_380_1664" />
        </filter>
        <linearGradient
          id="paint0_linear_380_1664"
          x1="-4.5"
          y1="29.9998"
          x2="75.5"
          y2="60.9998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1433A1" />
          <stop offset="0.59375" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Planet3;
