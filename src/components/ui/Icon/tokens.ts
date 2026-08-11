import { cva } from 'class-variance-authority';

export const iconVariants = cva('inline-block shrink-0', {
  defaultVariants: {
    size: 'medium',
    tone: 'current',
  },
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
      default: 'text-content',
      muted: 'text-content-muted',
      danger: 'text-content-danger',
      inverse: 'text-white',
    },
  },
});

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type IconTone = 'current' | 'brand' | 'default' | 'muted' | 'danger' | 'inverse';
