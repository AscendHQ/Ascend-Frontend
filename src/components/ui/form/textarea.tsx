import React, { ChangeEvent } from "react";

import { TextAreaProps } from "@/types";

function TextAreaWithLabelAndCount({
  id,
  label,
  placeholder,
  maxLength,
  showCharacterCount,
  isFullWidth = false,
}: TextAreaProps) {
  const [text, setText] = React.useState<string>("");
  const remainingCharacters = maxLength - text.length;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const containerClassName = isFullWidth ? "lg:min-w-full" : "lg:min-w-[250px]";

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
      />
      {showCharacterCount && (
        <span className="text-gray-800">
          {remainingCharacters}/{maxLength} characters remaining
        </span>
      )}
    </div>
  );
}
export default TextAreaWithLabelAndCount;
