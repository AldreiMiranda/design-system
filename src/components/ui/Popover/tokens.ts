import { cva } from 'class-variance-authority';

export const popoverVariants = cva(
  'fixed z-[105] w-[min(22rem,calc(100vw-2rem))] rounded-[calc(var(--ds-radius-control)+0.125rem)] border border-solid border-outline bg-surface font-sans text-content shadow-[0_18px_48px_-18px_rgb(24_24_27/0.35),0_6px_16px_-10px_rgb(24_24_27/0.18)] outline-none motion-safe:animate-[ds-popover-in_var(--ds-duration-normal)_var(--ds-ease-emphasized)]',
);
