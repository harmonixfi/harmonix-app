import { IconProps } from "@/@types/common";

const Planet2 = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
    >
      <g filter="url(#filter0_f_103_1755)">
        <circle cx="26" cy="26" r="16" fill="url(#paint0_linear_103_1755)" />
      </g>
      <defs>
        <filter
          id="filter0_f_103_1755"
          x="0"
          y="0"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="5"
            result="effect1_foregroundBlur_103_1755"
          />
        </filter>
        <linearGradient
          id="paint0_linear_103_1755"
          x1="17.3143"
          y1="10"
          x2="30.1379"
          y2="46.6897"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C1426" />
          <stop offset="0.59375" stopColor="#9C79C4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Planet2;
