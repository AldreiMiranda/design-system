import { cva } from 'class-variance-authority';
import { controlHeightClasses, fieldVariantClasses } from '../shared/controlTokens';
import type { ControlSize, FieldVariant } from '../shared/controlTokens';

export const textFieldVariants = cva(
  'w-full rounded-control border font-sans text-content outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-content-muted focus-visible:border-brand focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-content-muted disabled:opacity-70 read-only:cursor-default read-only:bg-surface-muted',
  {
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      invalid: false,
      hasLeadingContent: false,
      hasTrailingContent: false,
    },
    variants: {
      variant: {
        ...fieldVariantClasses,
      },
      size: {
        small: `${controlHeightClasses.small} px-3`,
        medium: `${controlHeightClasses.medium} px-3`,
        large: `${controlHeightClasses.large} px-4`,
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

export type TextFieldVariant = FieldVariant;
export type TextFieldSize = ControlSize;
