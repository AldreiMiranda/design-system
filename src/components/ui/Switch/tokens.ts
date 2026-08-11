import { cva } from 'class-variance-authority';
import type { ControlSize } from '../shared/controlTokens';

export const switchTrackVariants = cva(
  'ds-switch relative inline-flex shrink-0 rounded-full transition-[box-shadow,opacity] duration-[var(--ds-duration-normal)] peer-focus-visible:shadow-focus peer-disabled:cursor-not-allowed peer-disabled:opacity-45',
  {
    defaultVariants: { size: 'medium', invalid: false },
    variants: {
      size: {
        small: 'h-6 w-10',
        medium: 'h-7 w-11',
        large: 'h-8 w-[52px]',
      },
      invalid: {
        true: 'peer-focus-visible:shadow-[0_0_0_3px_rgb(185_28_28/0.22)]',
        false: null,
      },
    },
  },
);

export const switchRailVariants = cva(
  'ds-switch-rail absolute left-1 rounded-full border border-solid border-transparent bg-outline-strong opacity-60 transition-[background-color,border-color,opacity] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-emphasized)]',
  {
    defaultVariants: { size: 'medium', invalid: false },
    variants: {
      size: {
        small: 'top-1.5 h-3 w-8',
        medium: 'top-1.5 h-4 w-9',
        large: 'top-2 h-4 w-11',
      },
      invalid: {
        true: 'border-content-danger',
        false: null,
      },
    },
  },
);

export const switchThumbVariants = cva(
  'ds-switch-thumb absolute left-1 top-1 rounded-full bg-surface shadow-[0_2px_5px_rgb(24_24_27/0.35)] transition-[transform,box-shadow] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-emphasized)]',
  {
    defaultVariants: { size: 'medium' },
    variants: {
      size: {
        small: 'size-4',
        medium: 'size-5',
        large: 'size-6',
      },
    },
  },
);

export const switchLabelVariants = cva('font-sans text-content', {
  defaultVariants: { size: 'medium' },
  variants: {
    size: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
    },
  },
});

export type SwitchSize = ControlSize;
