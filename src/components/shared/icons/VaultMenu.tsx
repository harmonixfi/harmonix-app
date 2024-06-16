import { IconProps } from '@/@types/common';

const VaultMenu = ({ className }: IconProps) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10.7184" stroke="currentColor" strokeWidth="2.5632" />
      <rect
        x="15.5732"
        y="10"
        width="0.857143"
        height="12"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="22"
        y="15.5713"
        width="0.857143"
        height="12"
        transform="rotate(90 22 15.5713)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="19.9424"
        y="11.4556"
        width="0.857143"
        height="12"
        transform="rotate(45 19.9424 11.4556)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="20.5469"
        y="19.9399"
        width="0.857143"
        height="12"
        transform="rotate(135 20.5469 19.9399)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
};

export default VaultMenu;
