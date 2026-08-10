import type { ElementType, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { variants } from './tokens';
import type { Variants } from './tokens';

const variantElement = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheading1: 'h6',
  subheading2: 'h6',
  body1: 'p',
  body2: 'p',
} as const;

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: NonNullable<Variants['variant']>;
  as?: ElementType;
}

function Typography({
  variant = 'body1',
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? variantElement[variant];

  return (
    <Component className={twMerge(variants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
}

export default Typography;
