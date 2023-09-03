import React from "react";

import { TextFieldProps } from "@/types";

function TextField({
  id,
  label,
  placeholder,
  required,
  isFullWidth = false,
  ...inputProps
}: TextFieldProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";

  const [value, setValue] = React.useState<string>(inputProps.value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    // Check if the default value has been changed
    if (inputProps.value !== undefined) {
      inputProps.onChange?.(e); // Call the onChange handler if provided
    }
  };

  return (
    <div className={`flex-1 ${containerClassName}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
}

export default TextField;
