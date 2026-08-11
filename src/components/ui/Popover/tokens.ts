import { cva } from 'class-variance-authority';

export const popoverVariants = cva(
  'fixed z-popover w-[min(22rem,calc(100vw-2rem))] rounded-[calc(var(--ds-radius-control)+0.125rem)] border border-solid border-outline bg-surface font-sans text-content shadow-overlay outline-none motion-safe:animate-[ds-popover-in_var(--ds-duration-normal)_var(--ds-ease-emphasized)]',
);
