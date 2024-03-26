import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "rounded-sm inline-flex font-medium truncate cursor-pointer justify-center items-center  border border-gray-400 p-1",
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
