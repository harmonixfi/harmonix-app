import { ReactNode } from 'react';

type TypographyProps = {
  variant?: 'body' | 'heading' | 'subtitle' | 'subbody' | 'subheading';
  className?: string;
  children: ReactNode;
};

const Typography = (props: TypographyProps) => {
  const { variant = 'body', className = '', children } = props;

  const typoClass = {
    heading: 'text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-semibold uppercase',
    subtitle: 'text-2xl sm:text-4xl font-semibold uppercase',
    body: 'text-base font-light leading-7',
    subbody: 'text-base font-light text-rock-sub-body leading-7',
    subheading: 'text-lg md:text-xl lg:text-3xl 2xl:text-5xl font-semibold uppercase',
  }[variant];

  return <p className={`${typoClass} ${className}`}>{children}</p>;
};

export default Typography;
