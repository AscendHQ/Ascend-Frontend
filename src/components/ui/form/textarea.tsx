/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { TextAreaProps } from "@/types";

function TextAreaWithLabelAndCount<T>({
  id,
  label,
  errorMessage,
  register,
  maxLength,
  showCharacterCount,
  isFullWidth = false,
  ...textareaProps
}: TextAreaProps) {
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";
  const { ...registerValues } = register(id);
  const [text, setText] = React.useState<string>(textareaProps.value || "");

  return (
    <div className={`flex-1 ${containerClassName}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-Text-high-emphasis"
      >
        {label}
      </label>
      <textarea
        id={id}
        className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis p-2 text-Text-high-emphasis h-28"
        defaultValue={textareaProps.value}
        maxLength={maxLength}
        required
        // @ts-ignore
        onChangeCapture={e => setText(e.target.value)}
        {...registerValues}
        {...textareaProps}
      />
      {showCharacterCount && (
        <span className="text-gray-800">
          {text.length}/{maxLength} characters remaining
        </span>
      )}
      <span className="text-red-800 block text-xs lg:text-sm mt-2">
        {errorMessage}
      </span>
    </div>
  );
}

export default TextAreaWithLabelAndCount;
