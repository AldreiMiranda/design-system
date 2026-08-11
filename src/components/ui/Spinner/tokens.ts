import { cva } from 'class-variance-authority';

export const spinnerVariants = cva(
  'inline-block shrink-0 animate-spin motion-reduce:animate-none',
  {
    defaultVariants: { size: 'medium', tone: 'brand' },
    variants: {
      size: {
        xsmall: 'size-icon-xsmall',
        small: 'size-icon-small',
        medium: 'size-icon-medium',
        large: 'size-icon-large',
        xlarge: 'size-icon-xlarge',
      },
      tone: {
        current: 'text-current',
        brand: 'text-brand',
        muted: 'text-content-muted',
        danger: 'text-content-danger',
        success: 'text-[var(--ds-color-success)]',
        inverse: 'text-white',
      },
    },
  },
);

export type SpinnerSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type SpinnerTone = 'current' | 'brand' | 'muted' | 'danger' | 'success' | 'inverse';
