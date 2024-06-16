import { IconProps } from '@/@types/common';

const ReferralMenu = ({ className }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <path
        d="M17.561 4H11.9989C9.4847 4 8.22762 4 7.44658 4.78105C6.66553 5.5621 6.66553 6.81918 6.66553 9.33333V22.6667C6.66553 25.1808 6.66553 26.4379 7.44658 27.219C8.22762 28 9.4847 28 11.9989 28H19.9989C22.513 28 23.7701 28 24.5511 27.219C25.3322 26.4379 25.3322 25.1808 25.3322 22.6667V11.7712C25.3322 11.2262 25.3322 10.9537 25.2307 10.7087C25.1292 10.4637 24.9365 10.271 24.5511 9.88562L19.4466 4.78105C19.0612 4.39567 18.8685 4.20299 18.6235 4.10149C18.3785 4 18.106 4 17.561 4Z"
        stroke="currentColor"
        strokeWidth="2.66667"
      />
      <path
        d="M12 17.3325L20 17.3325"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
      <path
        d="M12 22.6675L17.3333 22.6675"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
      <path
        d="M17.3345 4V9.33333C17.3345 10.5904 17.3345 11.219 17.725 11.6095C18.1155 12 18.7441 12 20.0011 12H25.3345"
        stroke="currentColor"
        strokeWidth="2.66667"
      />
    </svg>
  );
};

export default ReferralMenu;
