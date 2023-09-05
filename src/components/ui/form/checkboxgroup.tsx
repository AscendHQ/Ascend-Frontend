import React from "react";

import { InputGroupProps } from "@/types";

const CheckboxGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  options,
  ...checkboxProps
}) => {
  return (
    <div className="mt-5 space-y-3">
      <h4 className="text-gray-800 font-medium">{label}</h4>
      <div className="flex flex-wrap gap-4 items-center">
        {options.map(option => (
          <label
            key={option.value}
            htmlFor={`${id}_${option.value}`}
            className="space-x-3"
          >
            <input
              type="checkbox"
              name={id}
              id={`${id}_${option.value}`}
              value={option.value}
              defaultChecked={option.checked}
              {...checkboxProps}
            />
            <span className="text-gray-800 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
