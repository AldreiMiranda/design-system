import { cva } from 'class-variance-authority';
import { controlHeightClasses } from '../shared/controlTokens';
import type { ControlSize } from '../shared/controlTokens';

export const buttonVariants = cva(
  'relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-control border border-transparent font-sans font-medium outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:shadow-focus active:translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
      iconOnly: false,
    },
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-hover',
        secondary: 'bg-surface-muted text-content hover:bg-outline',
        outlined: 'border-outline-strong bg-surface text-content hover:bg-surface-muted',
        ghost: 'bg-transparent text-brand hover:bg-brand-subtle',
        danger: 'bg-content-danger text-white hover:brightness-90',
      },
      size: {
        small: `${controlHeightClasses.small} px-3`,
        medium: `${controlHeightClasses.medium} px-4`,
        large: `${controlHeightClasses.large} px-5`,
      },
      fullWidth: {
        true: 'w-full',
        false: null,
      },
      iconOnly: {
        true: null,
        false: null,
      },
    },
    compoundVariants: [
      { size: 'small', iconOnly: true, className: 'w-8 px-0' },
      { size: 'medium', iconOnly: true, className: 'w-10 px-0' },
      { size: 'large', iconOnly: true, className: 'w-12 px-0' },
    ],
  },
);

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'danger';
export type ButtonSize = ControlSize;
