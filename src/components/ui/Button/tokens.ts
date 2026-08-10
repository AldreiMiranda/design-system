import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "inline-flex select-none items-center justify-center gap-2 rounded-control font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground hover:bg-brand-hover",
        secondary: "bg-content text-white hover:bg-content-muted",
        ghost: "text-brand hover:bg-surface-muted",
        outlined: "border border-outline-strong bg-transparent text-brand hover:bg-surface-muted",
      },
      size: {
        small: "h-8 px-3 text-xs",
        medium: "h-10 px-4 text-sm",
        large: "h-12 px-5 text-base",
      },
    },
  }
);

export type Variants = VariantProps<typeof variants>;
