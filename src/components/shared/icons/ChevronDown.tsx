import { IconProps } from '@/@types/common';

const ChevronDown = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2803 6.21967C13.5732 6.51256 13.5732 6.98744 13.2803 7.28033L9.03033 11.5303C8.73744 11.8232 8.26256 11.8232 7.96967 11.5303L3.71967 7.28033C3.42678 6.98744 3.42678 6.51256 3.71967 6.21967C4.01256 5.92678 4.48744 5.92678 4.78033 6.21967L8.5 9.93934L12.2197 6.21967C12.5126 5.92678 12.9874 5.92678 13.2803 6.21967Z"
        fill="white"
      />
    </svg>
  );
};

export default ChevronDown;
