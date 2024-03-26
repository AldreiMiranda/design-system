import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "rounded-md inline-flex font-medium truncate cursor-pointer justify-center items-center text-center",
  {
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
    variants: {
      variant: {
        primary: "bg-primary hover:bg-blue-400 text-blue-900",
        secondary: "bg-secondary hover:bg-blue-400",
        ghost: "text-blue-400 hover:bg-blue-50",
        outlined: "border border-primary text-blue-400 hover:bg-blue-50",
      },
      size: {
        small: " px-2 py-[8px] text-xs ",
        medium: "px-2 py-2 text-md",
        large: "px-2 py-2  text-lg",
      },
    },
  }
);

export type Variants = VariantProps<typeof variants>;
