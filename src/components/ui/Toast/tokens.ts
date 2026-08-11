import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  'pointer-events-auto relative flex w-[min(24rem,calc(100vw-2rem))] items-start gap-3 overflow-hidden rounded-[calc(var(--ds-radius-control)+0.125rem)] border border-solid bg-surface p-4 pr-12 font-sans text-content shadow-[0_18px_48px_-18px_rgb(24_24_27/0.35),0_6px_16px_-10px_rgb(24_24_27/0.2)]',
  {
    defaultVariants: { tone: 'info', open: true },
    variants: {
      tone: {
        neutral: 'border-outline',
        info: 'border-[color:var(--ds-color-info)]/25',
        success: 'border-[color:var(--ds-color-success)]/25',
        warning: 'border-[color:var(--ds-color-warning)]/30',
        danger: 'border-[color:var(--ds-color-danger)]/25',
      },
      open: {
        true: 'motion-safe:animate-[ds-toast-in_var(--ds-duration-slow)_var(--ds-ease-emphasized)]',
        false: 'pointer-events-none motion-safe:animate-[ds-toast-out_var(--ds-duration-normal)_ease-in_forwards]',
      },
    },
  },
);

export const toastIconVariants = cva('mt-0.5 flex shrink-0', {
  defaultVariants: { tone: 'info' },
  variants: {
    tone: {
      neutral: 'text-content-muted',
      info: 'text-[var(--ds-color-info)]',
      success: 'text-[var(--ds-color-success)]',
      warning: 'text-[var(--ds-color-warning)]',
      danger: 'text-content-danger',
    },
  },
});

export const toastViewportVariants = cva(
  'pointer-events-none fixed z-[100] flex max-h-screen w-fit flex-col gap-3 p-4',
  {
    defaultVariants: { position: 'bottom-right' },
    variants: {
      position: {
        'top-left': 'left-0 top-0',
        'top-center': 'left-1/2 top-0 -translate-x-1/2',
        'top-right': 'right-0 top-0',
        'bottom-left': 'bottom-0 left-0 flex-col-reverse',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
        'bottom-right': 'bottom-0 right-0 flex-col-reverse',
      },
    },
  },
);

export type ToastTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
