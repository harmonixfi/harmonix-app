import { IconProps } from '@/@types/common';

const Ethereum = ({ className }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 34" fill="none">
      <path
        d="M10.6648 0L10.4317 0.772142V23.1759L10.6648 23.4027L21.3268 17.2555L10.6648 0Z"
        fill="#343434"
      />
      <path d="M10.6623 0L0 17.2555L10.6623 23.4027V12.5285V0Z" fill="#8C8C8C" />
      <path
        d="M10.6649 25.3715L10.5335 25.5277V33.5083L10.6649 33.8823L21.3334 19.2275L10.6649 25.3715Z"
        fill="#3C3C3B"
      />
      <path d="M10.6623 33.8823V25.3715L0 19.2275L10.6623 33.8823Z" fill="#8C8C8C" />
      <path d="M10.6607 23.4022L21.3227 17.2551L10.6607 12.5281V23.4022Z" fill="#141414" />
      <path d="M0 17.2551L10.6623 23.4022V12.5281L0 17.2551Z" fill="#393939" />
    </svg>
  );
};

export default Ethereum;
