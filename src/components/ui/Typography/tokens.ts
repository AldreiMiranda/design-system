import { cva, VariantProps } from "class-variance-authority";

export const variants = cva("text-left", {
  defaultVariants: {
    variant: "body1",
  },
  variants: {
    variant: {
      h1: "h1 text-6xl",
      h2: "h2 text-5xl",
      h3: "h3 text-4xl",
      h4: "h4 text-3xl",
      h5: "h5 text-2xl",
      h6: "h6 text-xl",
      body1: "p text-lg",
      body2: "p text-base",
    },
  },
});

export type Variants = VariantProps<typeof variants>;
