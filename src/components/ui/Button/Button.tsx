import React from "react";
import { variants, Variants } from "./tokens";
import { twMerge } from "tailwind-merge";

export interface SimpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Variants {
  className?: string;
  children: React.ReactNode;
  variant?: Variants["variant"];
  size?: Variants["size"];
}

export default function Button({
  children,
  variant,
  size,
  className,
  ...props
}: SimpleButtonProps) {
  return (
    <button
      className={twMerge(variants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
