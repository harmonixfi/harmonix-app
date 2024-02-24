import { IconProps } from '@/@types/common';

const Order = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" stroke="#87909F" strokeWidth="2" />
      <path d="M9 9H15" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 13H15" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 17H13" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Order;
