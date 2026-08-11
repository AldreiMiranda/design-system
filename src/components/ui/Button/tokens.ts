import { cva } from 'class-variance-authority';
import { controlHeightClasses } from '../shared/controlTokens';
import type { ControlSize } from '../shared/controlTokens';

export const buttonVariants = cva(
  'relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-control border border-transparent font-sans font-medium outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:shadow-focus active:translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-interaction-disabled-border disabled:bg-interaction-disabled-surface disabled:text-interaction-disabled-content',
  {
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
      iconOnly: false,
    },
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-interaction-brand-hover active:bg-interaction-brand-active',
        secondary: 'bg-surface-muted text-content hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active',
        outlined: 'border-outline-strong bg-surface text-content hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active',
        ghost: 'bg-transparent text-brand hover:bg-interaction-brand-subtle-hover active:bg-interaction-brand-subtle-active',
        danger: 'bg-content-danger text-status-foreground hover:bg-interaction-danger-hover active:bg-interaction-danger-active',
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
