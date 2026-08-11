import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'overflow-hidden rounded-[calc(var(--ds-radius-control)+0.25rem)] border border-solid font-sans text-content transition-[border-color,box-shadow,transform] duration-[var(--ds-duration-normal)]',
  {
    defaultVariants: { variant: 'elevated' },
    variants: {
      variant: {
        elevated: 'border-transparent bg-surface shadow-[0_10px_28px_-14px_rgb(24_24_27/0.24),0_2px_8px_-4px_rgb(24_24_27/0.12)]',
        outlined: 'border-outline bg-surface shadow-none',
        filled: 'border-transparent bg-surface-muted shadow-none',
      },
    },
  },
);

export const cardSpacingVariants = cva('', {
  defaultVariants: { spacing: 'medium' },
  variants: {
    spacing: {
      small: 'p-3',
      medium: 'p-4',
      large: 'p-6',
    },
  },
});

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardSpacing = 'small' | 'medium' | 'large';
