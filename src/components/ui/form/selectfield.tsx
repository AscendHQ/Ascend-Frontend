import React from "react";

import { SelectFieldProps } from "@/types";

function SelectField({
  id,
  label,
  options,
  isFullWidth = false,
  ...selectProps
}: SelectFieldProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";

  return (
    <div className={`flex-1 ${containerClassName}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        {label}
      </label>
      <select
        name={id}
        id={id}
        className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
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
