import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  'pointer-events-none fixed z-tooltip max-w-64 rounded-control border border-solid px-2.5 py-1.5 font-sans text-caption shadow-tooltip motion-safe:animate-[ds-tooltip-in_var(--ds-duration-fast)_ease-out]',
  {
    defaultVariants: { appearance: 'light' },
    variants: {
      appearance: {
        light: 'border-outline bg-surface text-content',
        dark: 'border-content bg-content text-surface',
      },
    },
  },
);

export type TooltipAppearance = 'light' | 'dark';
