import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "h-10 w-full appearance-none rounded-control border bg-surface px-3 pr-10 text-sm text-content outline-none transition-shadow focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70",
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
