import React from "react";
import { twMerge } from "tailwind-merge";

import { SelectFieldProps } from "@/types";

function SelectField({
  id,
  label,
  options,
  isFullWidth = false,
  labelStyle,
  selectStyle,
  wrapperStyle,
  ...selectProps
}: SelectFieldProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";

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
        name={id}
        id={id}
        className={twMerge(
          "border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis",
          selectStyle
        )}
        {...selectProps}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
