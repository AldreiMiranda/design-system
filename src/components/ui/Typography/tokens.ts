import { cva } from 'class-variance-authority';

export const typographyVariants = cva('m-0 font-sans', {
  defaultVariants: {
    variant: 'body1',
    tone: 'default',
    align: 'inherit',
  },
  variants: {
    variant: {
      h1: 'text-5xl font-bold leading-[1.1] tracking-[-0.035em]',
      h2: 'text-4xl font-bold leading-[1.15] tracking-[-0.03em]',
      h3: 'text-3xl font-semibold leading-tight tracking-[-0.02em]',
      h4: 'text-2xl font-semibold leading-snug tracking-[-0.015em]',
      h5: 'text-xl font-semibold leading-snug',
      h6: 'text-lg font-semibold leading-normal',
      subheading1: 'text-lg font-medium leading-normal',
      subheading2: 'text-base font-medium leading-normal',
      body1: 'text-base font-normal leading-relaxed',
      body2: 'text-sm font-normal leading-relaxed',
      caption: 'text-xs font-normal leading-normal',
      overline: 'text-xs font-semibold uppercase leading-normal tracking-[0.12em]',
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
