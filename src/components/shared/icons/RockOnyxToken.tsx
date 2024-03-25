import { IconProps } from '@/@types/common';

const RockOnyxToken = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ mixBlendMode: 'screen' }} opacity="0.4">
        <rect width="46" height="46" rx="8" fill="#24284B" />
      </g>
      <circle cx="17.7411" cy="34.4584" r="2.74114" fill="#84889A" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0414 15.4024H15.0411V8H15.0412C23.672 8 30.6687 14.9966 30.6689 23.6275L23.2665 23.6275C23.2665 19.0849 19.584 15.4024 15.0414 15.4024ZM23.2662 23.6282H15L24.1531 35.166C25.1517 36.4247 26.6704 37.1585 28.2771 37.1585H34L23.2662 23.6282Z"
        fill="#84889A"
      />
    </svg>
  );
};

export default RockOnyxToken;
