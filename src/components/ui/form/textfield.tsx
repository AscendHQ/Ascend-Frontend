/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { twMerge } from "tailwind-merge";

import { TextFieldProps } from "@/types";

function TextField<T>({
  id,
  label,
  required,
  errorMessage,
  register,
  labelStyle,
  inputStyle,
  isFullWidth = false,
  ...inputProps
}: TextFieldProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";
  const { ...registerValues } = register(id);

  return (
    <div className={`flex-1 ${containerClassName}`}>
      <label
        htmlFor={id}
        className={twMerge(
          "block mb-2 text-sm font-medium text-Text-high-emphasis",
          labelStyle
        )}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={twMerge(
          "border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis p-2 text-Text-high-emphasis",
          inputStyle
        )}
        required={required}
        defaultValue={inputProps.defaultValue}
        {...inputProps}
        {...registerValues}
      />
      <span className="text-red-800 block text-xs lg:text-sm mt-2">
        {errorMessage}
      </span>
    </div>
  );
}

export default TextField;
