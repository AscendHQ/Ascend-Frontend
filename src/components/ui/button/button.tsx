import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  leftElement,
  rightElement,
  children,
  variant,
  className,
  styles,

  ...rest

}: {
  isLink?: boolean;
  path?: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  styles?: string;

} & React.ButtonHTMLAttributes<HTMLButtonElement>): React.JSX.Element {
  let variantClasses = "";


  const variantStyle = {
    primary:
      "bg-primary-purple-500 text-step--2 text-grey-100 border-2 px-24 py-2 border-accent-300 rounded-md hover:shadow-[4px_4px_0px_0px_#000000]  transition-all",
    secondary:
      "bg-grey-100 text-accent-300 border-2 text-step--2 px-4 py-2 border-border-colour-light rounded-md hover:shadow-[4px_4px_0px_0px_#000000]  transition-all flex items-center gap-2 ",
  };
  if (variant !== undefined) {
    variantClasses = variantStyle[variant];
  }
  if (isLink && path) {
    return (
      <Link href={path} className={`${twMerge(variantClasses, className)}`}>
        {leftElement}
        {children}
        {rightElement}
      </Link>
    );
  }
  return (
    <button
      className={`${twMerge(variantClasses, className)} ${styles}`}
      {...rest}
    >
      {leftElement}
      {children}
      {rightElement}
    </button>
  );
}

type BaseProps = {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  className?: string;
  children: ReactNode;
  variant: "primary" | "secondary";
};

type LinkProps = BaseProps & {
  isLink: true;
  path: string;
  onClick?: never;
};

type ButtonProps = BaseProps & {
  isLink?: false;
  path?: never;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type Props = LinkProps | ButtonProps;

export function DashboardButton({
  isLink,
  leftElement,
  rightElement,
  path,
  variant,
  className,
  children,
  onClick,
  ...rest
}: Props) {
  if (isLink && !path) {
    throw new Error("Path is required when isLink is set to true");
  }

  const CommonProps = {
    className: `${variantStyle[variant]} ${className}`,
    ...rest,
  };

  if (isLink) {
    return (
      <Link href={path} {...CommonProps}>
        {leftElement}
        {children}
        {rightElement}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} {...CommonProps}>
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
