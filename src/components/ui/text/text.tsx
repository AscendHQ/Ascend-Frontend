import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TextVariant = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TextProps extends React.HTMLProps<HTMLElement> {
  value?: string;
  as?: "paragraph" | "span" | "heading";
  level?: HeadingLevel;
  variant?: TextVariant;
  className?: string;
  children?: ReactNode;
  html?: boolean;
}
export default function Text({
  value,
  as,
  variant,
  className,
  children,
  html,
  level,
  ...rest
}: TextProps) {
  const Tag = as === "span" ? "span" : as === "heading" ? `h${level}` : "p";

  let variantClasses = "";

  switch (variant) {
    case "2xl":
      variantClasses = "text-2xl";
      break;
    case "xl":
      variantClasses = "text-lg";
      break;
    case "lg":
      variantClasses = "text-lg";
      break;
    case "md":
      variantClasses = "text-md";
      break;
    case "sm":
      variantClasses = "text-sm";
      break;
    case "xs":
      variantClasses = "text-xs";
      break;
    default:
      variantClasses = "text-md";
      break;
  }

  const textElementProps = {
    className: twMerge(`${variantClasses}`, `${className ?? ""}`),
  };
  return html ? (
    <Tag
      {...textElementProps}
      dangerouslySetInnerHTML={html ? { __html: value ?? "" } : undefined}
      {...rest}
    />
  ) : (
    <Tag {...textElementProps} {...rest}>
      {children}
    </Tag>
  );
}
