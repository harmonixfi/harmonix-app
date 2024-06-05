import { IconProps } from '@/@types/common';

const VaultTransferArrowDown = ({ className }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.875"
        y="1.875"
        width="36.25"
        height="36.25"
        rx="14.125"
        fill="#F5F6F6"
        stroke="white"
        stroke-width="3.75"
      />
      <path
        d="M14 21L20 27M20 27L26 21M20 27L20 16"
        stroke="#33363F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default VaultTransferArrowDown;
