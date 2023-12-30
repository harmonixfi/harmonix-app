import { IconProps } from "@/@types/common";

const Twitter = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
        fill="#1C1C22"
      />
      <g clipPath="url(#clip0_62_1536)">
        <path
          d="M22.1173 19.1946L28.4459 12H26.9463L21.4511 18.247L17.0621 12H12L18.637 21.4466L12 28.9913H13.4998L19.3028 22.3942L23.9379 28.9913H29L22.1169 19.1946H22.1173ZM20.0632 21.5298L19.3907 20.5891L14.0402 13.1042H16.3437L20.6617 19.1448L21.3341 20.0854L26.947 27.9373H24.6434L20.0632 21.5302V21.5298Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_62_1536">
          <rect
            width="17"
            height="17"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Twitter;
