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
      className={`flex items-center gap-4 w-full relative ${
        isActive ? "bg-primary-purple-100" : "bg-white"
      } py-3 px-5 rounded-md ${
        isSideBarMenu
          ? "before:border-l-2 before:border-b-3 before:border-Text-meduim-emphasis before:absolute before:w-7 before:h-7 before:rounded-sm before:top-0 before:-left-10"
          : ""
      }`}
    >
      {icon ? (
        <Icon
          icon={icon}
          className={`${
            isActive ? "text-primary-purple-500" : "text-Text-meduim-emphasis"
          }`}
          fontSize={30}
        />
      ) : null}
      <span
        className={`text-lg ${
          isActive ? "text-primary-purple-500" : "text-Text-meduim-emphasis"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
