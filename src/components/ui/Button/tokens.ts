import { cva, VariantProps } from "class-variance-authority";

export const variants = cva(
  "rounded-full inline-flex font-medium truncate cursor-pointer justify-center items-center text-center",
  {
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
    variants: {
      variant: {
        primary: "bg-primary text-white",
        ghost: "bg-gray-100 text-black",
      },
      size: {
        default: "px-5 py-4 ",
        small: "px-3 py-2",
      },
    },
  }
);

export type Variants = VariantProps<typeof variants>;
