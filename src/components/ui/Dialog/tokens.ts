import { cva } from 'class-variance-authority';

export const dialogSurfaceVariants = cva(
  'flex max-h-[min(85vh,720px)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[calc(var(--ds-radius-control)+0.375rem)] border border-solid border-outline bg-surface font-sans text-content shadow-dialog will-change-[transform,opacity] motion-safe:animate-[ds-dialog-in_var(--ds-duration-slow)_var(--ds-ease-emphasized)]',
  {
    defaultVariants: { size: 'medium' },
    variants: {
      size: {
        small: 'max-w-overlay-small',
        medium: 'max-w-overlay-medium',
        large: 'max-w-overlay-large',
        full: 'h-[calc(100vh-2rem)] max-h-none max-w-none',
      },
    },
  },
);

export type DialogSize = 'small' | 'medium' | 'large' | 'full';
