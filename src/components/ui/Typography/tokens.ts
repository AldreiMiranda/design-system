import { cva } from 'class-variance-authority';

export const typographyVariants = cva('m-0 font-sans', {
  defaultVariants: {
    variant: 'body1',
    tone: 'default',
    align: 'inherit',
  },
  variants: {
    variant: {
      h1: 'text-[length:var(--ds-font-size-heading-1)] leading-[var(--ds-line-height-tight)] font-bold tracking-[var(--ds-letter-spacing-tight)]',
      h2: 'text-[length:var(--ds-font-size-heading-2)] leading-[var(--ds-line-height-heading)] font-bold tracking-[var(--ds-letter-spacing-tight)]',
      h3: 'text-[length:var(--ds-font-size-heading-3)] leading-[var(--ds-line-height-heading)] font-semibold tracking-[var(--ds-letter-spacing-tight)]',
      h4: 'text-[length:var(--ds-font-size-heading-4)] leading-[var(--ds-line-height-heading)] font-semibold tracking-[var(--ds-letter-spacing-tight)]',
      h5: 'text-[length:var(--ds-font-size-heading-5)] leading-[var(--ds-line-height-heading)] font-semibold',
      h6: 'text-[length:var(--ds-font-size-heading-6)] leading-[var(--ds-line-height-normal)] font-semibold',
      subheading1: 'text-[length:var(--ds-font-size-heading-6)] leading-[var(--ds-line-height-normal)] font-medium',
      subheading2: 'text-[length:var(--ds-font-size-body)] leading-[var(--ds-line-height-normal)] font-medium',
      body1: 'text-[length:var(--ds-font-size-body)] leading-[var(--ds-line-height-relaxed)] font-normal',
      body2: 'text-[length:var(--ds-font-size-body-small)] leading-[var(--ds-line-height-relaxed)] font-normal',
      caption: 'text-[length:var(--ds-font-size-caption)] leading-[var(--ds-line-height-normal)] font-normal',
      overline: 'text-[length:var(--ds-font-size-caption)] leading-[var(--ds-line-height-normal)] font-semibold uppercase tracking-[var(--ds-letter-spacing-wide)]',
    },
    tone: {
      default: 'text-content',
      muted: 'text-content-muted',
      brand: 'text-brand',
      danger: 'text-content-danger',
      inverse: 'text-white',
      inherit: 'text-inherit',
    },
    align: {
      inherit: null,
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    italic: {
      true: 'italic',
    },
  },
});

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subheading1'
  | 'subheading2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographyTone = 'default' | 'muted' | 'brand' | 'danger' | 'inverse' | 'inherit';
export type TypographyAlign = 'inherit' | 'left' | 'center' | 'right';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
