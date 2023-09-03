import { twMerge } from "tailwind-merge";

import { TableCellProps } from "@/types";

export default function TableCell({
  content,
  isCentered = false,
  styles,
  leftElement,
}: TableCellProps) {
  const cellClassName = twMerge(
    `px-6 py-4 text-sm font-medium normal-case ${
      isCentered ? "text-center" : ""
    }`,
    styles
  );

  return (
    <td className={cellClassName}>
      {leftElement}
      {content}
    </td>
  );
}
