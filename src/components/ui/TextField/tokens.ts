import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "h-10 w-full rounded-control border bg-surface px-3 text-sm text-content outline-none transition-shadow placeholder:text-content-muted focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70 read-only:bg-surface-muted",
  {
    defaultVariants: {
      variant: "primary",
    },
    variants: {
      variant: {
        primary: "border-outline",
        ghost: "border-transparent bg-surface-muted",
      },
    },
  }
);

export type Variants = VariantProps<typeof variants>;
