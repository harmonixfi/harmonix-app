import { ReactNode } from 'react';

type TypographyProps = {
  variant?: 'body' | 'heading' | 'subtitle';
  className?: string;
  children: ReactNode;
};

const Typography = (props: TypographyProps) => {
  const { variant = 'body', className = '', children } = props;

  const typoClass = {
    heading: 'text-xl md:text-2xl lg:text-4xl font-normal uppercase',
    subtitle: 'uppercase text-gray-200',
    body: 'text-base font-light text-gray-400',
  }[variant];

  return <p className={`${typoClass} ${className}`}>{children}</p>;
};

export default Typography;
