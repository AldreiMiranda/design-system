import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative flex w-full items-start gap-3 rounded-control border border-solid p-4 font-sans text-sm shadow-[0_1px_2px_rgb(24_24_27/0.04)]',
  {
    defaultVariants: { tone: 'info' },
    variants: {
      tone: {
        info: 'border-[color:var(--ds-color-info)]/20 bg-[var(--ds-color-info-subtle)] text-[var(--ds-color-info)]',
        success: 'border-[color:var(--ds-color-success)]/20 bg-[var(--ds-color-success-subtle)] text-[var(--ds-color-success)]',
        warning: 'border-[color:var(--ds-color-warning)]/25 bg-[var(--ds-color-warning-subtle)] text-[var(--ds-color-warning)]',
        danger: 'border-[color:var(--ds-color-danger)]/20 bg-[var(--ds-color-danger-subtle)] text-content-danger',
        neutral: 'border-outline bg-surface-muted text-content',
      },
    },
  },
);

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
