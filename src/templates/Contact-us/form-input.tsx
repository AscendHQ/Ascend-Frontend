/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Icon } from "@iconify/react";

// @ts-ignore
type NewType = UseFormRegister<T>;

export function InputWithIcon({
  icon,
  placeholder,
  id,
  register,
  errorMessage,
}: {
  icon: string;
  placeholder: string;
  id: string;
  errorMessage: string;
  register: NewType;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { ...registerValues } = register(id);
  return (
    <>
      <div className="relative">
        <Icon
          icon={icon}
          width={25}
          height={25}
          className="absolute top-3 left-2 text-Text-high-emphasis"
        />
        <input
          type="text"
          placeholder={placeholder}
          className="pl-11 border-t-transparent text-sm md:text-base border-x-transparent border-secondary-color-1 placeholder:text-Text-meduim-emphasis py-3 border-b w-full"
          id={id}
          {...registerValues}
        />
      </div>
      <span className="text-red-500">{errorMessage}</span>
    </>
  );
}

export function TextAreaWithIcon({
  icon,
  placeholder,
  id,
  register,
  errorMessage,
}: {
  icon: string;
  placeholder: string;
  id: string;
  errorMessage: string;
  register: NewType;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { ...registerValues } = register(id);

  return (
    <>
      <div className="relative">
        <Icon
          icon={icon}
          width={25}
          height={25}
          className="absolute top-3 left-2 text-Text-high-emphasis"
        />
        <textarea
          rows={5}
          placeholder={placeholder}
          className="pl-11 border-t-transparent text-sm md:text-base border-x-transparent border-secondary-color-1 placeholder:text-Text-meduim-emphasis py-3 border-b w-full"
          id={id}
          {...registerValues}
        />
      </div>
      <span className="text-red-500">{errorMessage}</span>
    </>
  );
}
