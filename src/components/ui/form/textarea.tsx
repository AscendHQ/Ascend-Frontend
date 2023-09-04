import React from "react";

import { TextAreaProps } from "@/types";

function TextAreaWithLabelAndCount({
  id,
  label,
  placeholder,
  maxLength,
  showCharacterCount,
  isFullWidth = false,
  ...textareaProps
}: TextAreaProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";

  const [text, setText] = React.useState<string>(textareaProps.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);

    if (textareaProps.value !== undefined) {
      textareaProps.onChange?.(event);
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
      <textarea
        name={id}
        id={id}
        className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        {...textareaProps}
      />
      {showCharacterCount && (
        <span className="text-gray-800">
          {text.length}/{maxLength} characters remaining
        </span>
      )}
    </div>
  );
}

export default TextAreaWithLabelAndCount;
