/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { twMerge } from "tailwind-merge";

import { SelectFieldProps } from "@/types";

function SelectField<T>({
  id,
  label,
  options,
  isFullWidth = false,
  labelStyle,
  selectStyle,
  errorMessage,
  wrapperStyle,
  register,
  ...selectProps
}: SelectFieldProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";
  const { ...restRegister } = register(id);
  return (
    <div className={twMerge(`flex-1 ${containerClassName}`, wrapperStyle)}>
      <label
        htmlFor={id}
        className={twMerge(
          "block mb-2 text-sm font-medium text-Text-high-emphasis",
          labelStyle
        )}
      >
        {label}
      </label>
      <select
        id={id}
        className={twMerge(
          "border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis p-2 text-Text-high-emphasis",
          selectStyle
        )}
        {...restRegister}
        {...selectProps}
        required
      >
        <option value="" className="capitalize">
          Please choose an option
        </option>
        {options?.map(option => {
          let value = "";
          let label = "";
          const isObject = typeof option === "string";
          if (isObject) {
            value = option;

            const optionFormatted = option.replace("_", " ");
            const firstLetter = optionFormatted.substring(0, 1).toUpperCase();
            const remainingLetters = optionFormatted.substring(1);
            label = firstLetter + remainingLetters;
          } else {
            value = option.value;
            label = option.label;
          }

          return (
            <option key={value} value={value} className="capitalize">
              {label}
            </option>
          );
        })}
      </select>
      <span className="text-red-800 block text-xs lg:text-sm mt-2">
        {errorMessage}
      </span>
    </div>
  );
}

export default SelectField;
