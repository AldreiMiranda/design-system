import { cva } from 'class-variance-authority';

export const skeletonVariants = cva(
  'relative block overflow-hidden bg-surface-muted motion-reduce:animate-none motion-reduce:before:hidden',
  {
    defaultVariants: { variant: 'rectangular', animation: 'wave' },
    variants: {
      variant: {
        text: 'h-4 rounded',
        circular: 'aspect-square rounded-full',
        rectangular: 'rounded-control',
      },
      animation: {
        pulse: 'animate-pulse',
        wave: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[ds-skeleton-wave_1.6s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:content-[\'\']',
        none: null,
      },
    },
  },
);

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';
