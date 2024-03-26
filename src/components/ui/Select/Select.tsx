import React, { useState } from "react";
import { variants, Variants } from "./tokens";
import { twMerge } from "tailwind-merge";
import Icon from "./../Icon/Icon";

export interface Props
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    Variants {
  className?: string;
  variant?: Variants["variant"];
  children?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

function Select({
  variant,
  className,
  children,
  placeholder,

  ...props
}: Props) {
  const [disabled, setDisabled] = useState(Boolean);

  return (
    <div className="m-20">
      <div className="relative inline-block text-left">
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="items-center inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            id="options-menu"
            onClick={() => setDisabled(!disabled)}
          >
            {placeholder && <option value="">{placeholder}</option>}
            <span className="pl-2">
              <Icon
                name={disabled ? "ChevronDown" : "ChevronUp"}
                size={15}
                color="black"
              />
            </span>
          </button>
        </div>
        {disabled && (
          <div
            className=" absolute center-0 mt-0 min-w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-2 py-2" role="options-menu">
              {children}
            </div>
          </div>
        )}
      </div>

      {/* <p> teste aqui </p>
      <select className={twMerge(variants({ variant }), className)} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select> */}
    </div>
  );
}

export default Select;
