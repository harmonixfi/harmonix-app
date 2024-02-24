import { IconProps } from '@/@types/common';

const Waterfall = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M21 21H3" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 16V14" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12V9" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16V10" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 13V11" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 15V5" stroke="#87909F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Waterfall;
