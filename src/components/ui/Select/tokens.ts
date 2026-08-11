import { cva } from 'class-variance-authority';
import { controlHeightClasses, fieldVariantClasses } from '../shared/controlTokens';
import type { ControlSize, FieldVariant } from '../shared/controlTokens';

export const selectTriggerVariants = cva(
  'flex w-full items-center rounded-control border font-sans text-left text-content outline-none transition-[border-color,box-shadow,background-color] duration-150 focus-visible:border-brand focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-content-muted disabled:opacity-70',
  {
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      invalid: false,
      hasLeadingContent: false,
    },
    variants: {
      variant: {
        ...fieldVariantClasses,
      },
      size: {
        small: `${controlHeightClasses.small} px-3 pr-9`,
        medium: `${controlHeightClasses.medium} px-3 pr-10`,
        large: `${controlHeightClasses.large} px-4 pr-11`,
      },
      invalid: {
        true: 'border-content-danger focus-visible:border-content-danger',
        false: null,
      },
      hasLeadingContent: {
        true: 'pl-10',
        false: null,
      },
    },
  },
);

export const selectMenuVariants = cva(
  'absolute left-0 top-full z-dropdown mt-ds-1 max-h-60 w-full origin-top overflow-y-auto rounded-control border border-outline p-ds-1 font-sans shadow-dropdown transition-[opacity,transform,filter] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-emphasized)] motion-reduce:transition-none',
  {
    defaultVariants: { variant: 'primary' },
    variants: {
      variant: {
        primary: 'bg-surface',
        filled: 'bg-surface-muted',
        ghost: 'bg-surface',
      },
    },
  },
);

export const selectOptionVariants = cva(
  'flex w-full cursor-default items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-content outline-none transition-colors',
  {
    defaultVariants: { selected: false, active: false },
    variants: {
      selected: {
        true: 'bg-brand-subtle font-medium text-brand',
        false: null,
      },
      active: {
        true: 'bg-brand-subtle',
        false: null,
      },
      disabled: {
        true: 'pointer-events-none opacity-45',
        false: null,
      },
    },
  },
);

export type SelectVariant = FieldVariant;
export type SelectSize = ControlSize;
