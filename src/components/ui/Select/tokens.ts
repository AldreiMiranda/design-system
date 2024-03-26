import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "rounded-md w-28 p-1 font-medium truncate cursor-pointer  border border-gray-400 bg-none select-dropdown focus-within:shadow-lg outline-none bg-transparent appearance-none select-none border-transparent",
  {
    defaultVariants: {
      variant: "primary",
    },
    variants: {
      variant: {
        primary: "text-black",
        ghost: "border-none text-black",
      },
    },
  }
);

export type Variants = VariantProps<typeof variants>;
