import Link from "next/link";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  leftElement,
  rightElement,
  children,
  variant,
  className,
  styles,
}: {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  styles?: string;
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
    <button className={`${twMerge(variantClasses, className)} ${styles}`}>
      {leftElement}
      {children}
      {rightElement}
    </button>
  );
}

export function DashboardButton({
  isLink = false,
  leftElement,
  rightElement,
  path,
  variant,
  className,
  children,
  onClick,
}: {
  isLink?: boolean;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  path?: string;
  className?: string;
  children: ReactNode;
  variant: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  if (isLink && !path) {
    throw new Error("Path is required when isLink is set to true");
  }
  if (isLink && path) {
    return (
      <Link
        href={path}
        className={`${twMerge(variantStyle[variant], className)}`}
      >
        {leftElement}
        {children}
        {rightElement}
      </Link>
    );
  }
  if (!isLink) {
    return (
      <button
        className={`${twMerge(variantStyle[variant], className)}`}
        onClick={onClick}
      >
        {leftElement}
        {children}
        {rightElement}
      </button>
    );
  }
}

const variantStyle = {
  primary:
    "ml-auto w-fit text-sm flex gap-2 items-center bg-primary-purple-700 text-white px-5 py-3 rounded-lg",
  secondary:
    "text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm",
};
