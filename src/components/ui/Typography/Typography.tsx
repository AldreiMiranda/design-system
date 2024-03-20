import React from "react";
import { variants, Variants } from "./tokens";
import { twMerge } from "tailwind-merge";

const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
};

interface Props {
  variant: Variants["variant"];
  className?: string;
  children?: React.ReactNode;
}

function Typography({ variant, className, children, ...props }: Props) {
  const Component = variant ? variantsMapping[variant] : "body1";

  return React.createElement(
    Component,
    {
      ...props,
      className: twMerge(variants({ variant }), className),
    },
    children
  );
}

export default Typography;
