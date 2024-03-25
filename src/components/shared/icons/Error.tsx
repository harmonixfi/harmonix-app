import { IconProps } from '@/@types/common';

const Failed = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="101"
      height="100"
      viewBox="0 0 101 100"
      fill="none"
    >
      <circle cx="50.5" cy="50" r="50" fill="#FF5673" />
      <path
        d="M36.3096 35.7395L51.0486 50.0498L65.7877 64.36"
        stroke="white"
        strokeWidth="4.19249"
        strokeLinecap="round"
      />
      <path
        d="M65.3623 35.3132L51.0521 50.0523L36.7418 64.7914"
        stroke="white"
        strokeWidth="4.19249"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Failed;
