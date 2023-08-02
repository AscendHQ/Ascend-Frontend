import { Icon } from "@iconify/react";
import Link from "next/link";

export default function SideBarItem({
  title,
  icon,
  urlPath,
  isActive,
  isSideBarMenu,
}: {
  title: string;
  isActive: boolean;
  urlPath: string;
  icon?: string;
  isSideBarMenu?: boolean;
}) {
  return (
    <Link
      href={urlPath}
      className={`flex items-center gap-3 w-full relative ${
        isActive ? "bg-primary-purple-100" : "bg-white"
      } py-2 px-4 rounded-md ${
        isSideBarMenu
          ? "before:border-l-1 before:border-b before:border-Text-meduim-emphasis before:absolute before:w-7 before:h-7 before:rounded-sm before:-top-2 before:-left-10"
          : ""
      }`}
    >
      {icon ? (
        <Icon
          icon={icon}
          className={`${
            isActive ? "text-primary-purple-800" : "text-Text-high-emphasis"
          }`}
          fontSize={30}
        />
      ) : null}
      <span
        className={`text-base ${
          isActive ? "text-primary-purple-800" : "text-Text-high-emphasis"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
