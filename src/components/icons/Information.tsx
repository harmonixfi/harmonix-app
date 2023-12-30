import { IconProps } from "@/@types/common";

const Information = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <mask id="path-1-inside-1_222_195" fill="white">
        <rect
          x="7.11108"
          y="7.11111"
          width="1.77778"
          height="5.33333"
          rx="0.888857"
        />
      </mask>
      <rect
        x="7.11108"
        y="7.11111"
        width="1.77778"
        height="5.33333"
        rx="0.888857"
        fill="#84889A"
        stroke="#84889A"
        strokeWidth="1.77778"
        mask="url(#path-1-inside-1_222_195)"
      />
      <circle
        cx="7.99997"
        cy="4.44446"
        r="0.888857"
        fill="#84889A"
        stroke="#84889A"
        strokeWidth="6.33001e-05"
      />
      <circle
        cx="8"
        cy="8"
        r="7.55557"
        stroke="#84889A"
        strokeWidth="0.888857"
      />
    </svg>
  );
};

export default Information;
