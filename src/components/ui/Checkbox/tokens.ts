import { cva } from 'class-variance-authority';
import type { ControlSize } from '../shared/controlTokens';

export const checkboxControlVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded border-[1.5px] border-solid bg-surface text-transparent transition-[background-color,border-color,color,box-shadow,transform] duration-150 peer-hover:border-brand peer-focus-visible:border-brand peer-focus-visible:shadow-focus peer-active:scale-95 peer-disabled:cursor-not-allowed peer-disabled:border-outline-strong peer-disabled:bg-surface-muted peer-disabled:opacity-60 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground',
  {
    defaultVariants: { size: 'medium', invalid: false },
    variants: {
      size: {
        small: 'size-4',
        medium: 'size-5',
        large: 'size-6',
      },
      invalid: {
        true: 'border-content-danger peer-focus-visible:border-content-danger',
        false: 'border-outline-strong',
      },
      indeterminate: {
        true: 'border-brand bg-brand text-brand-foreground',
        false: null,
      },
    },
  },
);

export const checkboxLabelVariants = cva('font-sans text-content', {
  defaultVariants: { size: 'medium' },
  variants: {
    size: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
    },
  },
});

export type CheckboxSize = ControlSize;
