import { cva, VariantProps } from "class-variance-authority";

export const variants = cva("m-0 text-left text-content", {
  defaultVariants: {
    variant: "body1",
  },
  variants: {
    variant: {
      h1: "text-5xl font-bold leading-tight tracking-tight",
      h2: "text-4xl font-bold leading-tight tracking-tight",
      h3: "text-3xl font-semibold leading-tight",
      h4: "text-2xl font-semibold leading-snug",
      h5: "text-xl font-semibold leading-snug",
      h6: "text-lg font-semibold leading-normal",
      subheading1: "text-lg font-medium leading-normal",
      subheading2: "text-base font-medium leading-normal",
      body1: "text-base font-normal leading-relaxed",
      body2: "text-sm font-normal leading-relaxed",
    },
  },
});

export type Variants = VariantProps<typeof variants>;
