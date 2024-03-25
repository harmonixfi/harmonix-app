import { IconProps } from '@/@types/common';

const Stat = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="18"
        y="5"
        width="4"
        height="13"
        rx="1"
        stroke="#87909F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y="11"
        width="4"
        height="7"
        rx="1"
        stroke="#87909F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="2"
        y="7"
        width="4"
        height="11"
        rx="1"
        stroke="#87909F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Stat;
