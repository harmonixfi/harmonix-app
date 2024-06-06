import { IconProps } from '@/@types/common';

const Ethereum = ({ className }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="#627EEA" fillOpacity="0.602" />
      <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="#627EEA" />
      <path
        d="M16.498 21.9682V27.9952L24 17.6162L16.498 21.9682Z"
        fill="#627EEA"
        fillOpacity="0.602"
      />
      <path d="M16.498 27.9952V21.9672L9 17.6162L16.498 27.9952Z" fill="#627EEA" />
      <path
        d="M16.498 20.5731L23.995 16.2201L16.498 12.8721V20.5731Z"
        fill="#627EEA"
        fillOpacity="0.2"
      />
      <path d="M9 16.2201L16.498 20.5731V12.8721L9 16.2201Z" fill="#627EEA" fillOpacity="0.602" />
    </svg>
  );
};

export default Ethereum;
