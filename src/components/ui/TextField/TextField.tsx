import React from "react";
import { variants, Variants } from "./tokens";
import { twMerge } from "tailwind-merge";

export interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Variants {
  className?: string;
  variant?: Variants["variant"];
}

function TextField({ variant, className, ...props }: Props) {
  return (
    <input
      className={twMerge(variants({ variant }), className)}
      {...props}
    ></input>
  );
}

export default TextField;
