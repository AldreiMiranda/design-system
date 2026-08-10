import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { typographyVariants } from './tokens';
import type {
  TypographyAlign,
  TypographyTone,
  TypographyVariant,
  TypographyWeight,
} from './tokens';

const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  subheading1: 'p', subheading2: 'p', body1: 'p', body2: 'p',
  caption: 'span', overline: 'span',
};

const lineClampClass = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
} as const;

interface TypographyOwnProps<T extends ElementType> {
  variant?: TypographyVariant;
  as?: T;
  tone?: TypographyTone;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  italic?: boolean;
  maxLines?: 1 | 2 | 3 | 4;
}

export type TypographyProps<T extends ElementType = 'p'> = TypographyOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];
type TypographyComponent = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & { ref?: PolymorphicRef<T> },
) => ReactElement | null;

function TypographyInner<T extends ElementType = 'p'>(
  {
    variant = 'body1',
    as,
    tone,
    align,
    weight,
    italic,
    maxLines,
    className,
    children,
    ...props
  }: TypographyProps<T>,
  ref: PolymorphicRef<T>,
) {
  const Component = as ?? defaultElement[variant];

  return (
    <Component
      ref={ref}
      className={twMerge(
        typographyVariants({ variant, tone, align, weight, italic }),
        maxLines && lineClampClass[maxLines],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

const Typography = forwardRef(TypographyInner) as TypographyComponent;

export default Typography;
