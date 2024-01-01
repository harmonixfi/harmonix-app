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
      <g filter="url(#filter0_f_103_1751)">
        <circle cx="35.5" cy="35.5" r="25.5" fill="url(#paint0_linear_103_1751)" />
      </g>
      <defs>
        <filter
          id="filter0_f_103_1751"
          x="0"
          y="0"
          width="71"
          height="71"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_103_1751" />
        </filter>
        <linearGradient
          id="paint0_linear_103_1751"
          x1="21.2112"
          y1="4.72414"
          x2="42.0948"
          y2="68.4741"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D255B" />
          <stop offset="0.59375" stopColor="#210C11" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Planet3;
