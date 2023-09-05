import React from "react";

import { InputGroupProps } from "@/types";

const RadioGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  options,
  isFullWidth = false,
  ...radioProps
}) => {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";

  return (
    <div className={`flex-1 ${containerClassName} space-y-1`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        {label}
      </label>
      <div className="space-y-3">
        {options.map(option => (
          <div
            key={option.value}
            className="inline-flex items-center gap-3 mr-5"
          >
            <input
              type="radio"
              name={id}
              id={`${id}_${option.value}`}
              value={option.value}
              defaultChecked={option.checked}
              {...radioProps}
            />
            <label htmlFor={`${id}_${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
