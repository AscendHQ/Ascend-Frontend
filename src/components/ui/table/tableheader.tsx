import { twMerge } from "tailwind-merge";

import { TableHeaderProps } from "@/types";

export default function TableHeader({
  text,
  styles,
  isCentered = false,
}: TableHeaderProps) {
  const cellClassName = twMerge(
    `px-6 py-3 text-sm ${isCentered ? "text-center" : ""}`,
    styles
  );

  return (
    <th scope="col" className={cellClassName}>
      {text}
    </th>
  );
}
