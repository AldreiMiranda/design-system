import { cva } from 'class-variance-authority';

export const badgeIndicatorVariants = cva(
  'pointer-events-none absolute z-10 inline-flex items-center justify-center rounded-full font-sans font-medium leading-none transition-[opacity,transform] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-emphasized)] motion-reduce:transition-none',
  {
    defaultVariants: { tone: 'brand', variant: 'standard', invisible: false },
    variants: {
      tone: {
        neutral: 'bg-content text-white',
        brand: 'bg-brand text-brand-foreground',
        info: 'bg-[var(--ds-color-info)] text-white',
        success: 'bg-[var(--ds-color-success)] text-white',
        warning: 'bg-[var(--ds-color-warning)] text-white',
        danger: 'bg-content-danger text-white',
      },
      variant: {
        standard: 'h-5 min-w-5 px-1.5 text-xs',
        dot: 'size-2 min-w-0 p-0',
      },
      invisible: {
        true: 'opacity-0',
        false: 'opacity-100',
      },
    },
  },
);

export type BadgeTone = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeVariant = 'standard' | 'dot';
export type BadgeOverlap = 'rectangular' | 'circular';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
