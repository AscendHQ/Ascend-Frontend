import { Icon } from "@iconify/react";
import Link from "next/link";

export default function SideBarItem({
  title,
  icon,
  urlPath,
  isActive,
}: {
  title: string;
  isActive: boolean;
  urlPath: string;
  icon?: string;
}) {
  return (
    <Link
      href={urlPath}
      className={`flex items-center gap-4 w-full ${
        isActive ? "bg-primary-purple-100" : "bg-white"
      } py-3 px-5 rounded-md`}
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
