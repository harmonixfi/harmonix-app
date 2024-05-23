import { IconProps } from '@/@types/common';

const RoUsdCircle = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
    >
      <rect width="46" height="46" rx="23" fill="#292A3C" />
      <circle cx="19.2531" cy="32.7467" r="2.25305" fill="#84889A" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.7944 23.8443C23.7942 20.1109 20.7678 17.0844 17.0344 17.0842V11C24.1282 11.0001 29.8788 16.7506 29.8792 23.8443H23.7944ZM23.7943 23.8453H17L24.5233 33.3287C25.344 34.3633 26.5923 34.9664 27.9129 34.9664H32.6168L23.7943 23.8453Z"
        fill="#84889A"
      />
    </svg>
  );
};

export default RoUsdCircle;
