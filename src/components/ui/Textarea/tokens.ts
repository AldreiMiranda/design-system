import { cva } from 'class-variance-authority';
import { fieldVariantClasses } from '../shared/controlTokens';
import type { ControlSize, FieldVariant } from '../shared/controlTokens';

export const textareaVariants = cva(
  'w-full rounded-control border border-solid font-sans text-content outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-content-muted focus-visible:border-brand focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-content-muted disabled:opacity-70 read-only:cursor-default read-only:bg-surface-muted',
  {
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      resize: 'vertical',
      invalid: false,
      hasLeadingContent: false,
      hasTrailingContent: false,
    },
    variants: {
      variant: {
        ...fieldVariantClasses,
      },
      size: {
        small: 'min-h-20 px-3 py-2 text-xs',
        medium: 'min-h-24 px-3 py-2.5 text-sm',
        large: 'min-h-28 px-4 py-3 text-base',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
      invalid: {
        true: 'border-content-danger focus-visible:border-content-danger',
        false: null,
      },
      hasLeadingContent: {
        true: 'pl-10',
        false: null,
      },
      hasTrailingContent: {
        true: 'pr-10',
        false: null,
      },
    },
  },
);

export type TextareaVariant = FieldVariant;
export type TextareaSize = ControlSize;
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
