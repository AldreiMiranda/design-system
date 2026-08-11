import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  'pointer-events-none fixed z-[110] max-w-64 rounded-control border border-solid px-2.5 py-1.5 font-sans text-xs leading-relaxed shadow-[0_10px_28px_-12px_rgb(24_24_27/0.3),0_2px_8px_-4px_rgb(24_24_27/0.16)] motion-safe:animate-[ds-tooltip-in_var(--ds-duration-fast)_ease-out]',
  {
    defaultVariants: { appearance: 'light' },
    variants: {
      appearance: {
        light: 'border-outline bg-surface text-content',
        dark: 'border-content bg-content text-white',
      },
    },
  },
);

export type TooltipAppearance = 'light' | 'dark';
