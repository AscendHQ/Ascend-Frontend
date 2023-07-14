import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  leftElement,
  rightElement,
  children,
  variant,
  className,
}: {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}): React.JSX.Element {
  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses =
        "bg-primary-purple-500 text-step--2 text-grey-100 border-2 px-24 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all";
      break;
    case "secondary":
      variantClasses =
        "bg-grey-100 text-accent-300 border-2 text-step--2 px-4 py-2 border-border-colour-light rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all flex items-center gap-2 ";
      break;
    default:
      variantClasses =
        "bg-grey-100 border-border-colour-light px-6 py-2 rounded-md text-step--2";
      break;
  }
  return (
    <button className={twMerge(variantClasses, className)}>
      {leftElement}
      {children}
      {rightElement}
    </button>
  );
}
