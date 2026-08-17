import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { LOGIN_PAGE, PARENT_DASHBOARD } from "@/config/links";
import { getStoredUserInfo } from "@/templates/Settings/hooks";

export type PortalNavItem = {
  title: string;
  href: string;
  icon: string;
};

export default function ParentLayout({
  children,
  title,
  portalLabel = "Parent portal",
  homeHref = PARENT_DASHBOARD,
  navItems,
}: {
  children: React.ReactNode;
  title: string;
  portalLabel?: string;
  homeHref?: string;
  navItems?: PortalNavItem[];
}) {
  const router = useRouter();
  const user = getStoredUserInfo();
  const items = navItems ?? [
    {
      title: "Home",
      href: homeHref,
      icon: "material-symbols:home-outline-rounded",
    },
  ];
  const currentPath = router.asPath.split("?")[0];
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = LOGIN_PAGE;
  };

  return (
    <div className="min-h-screen bg-neutral-300 font-inter">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-neutral-200 bg-white px-4 py-7 lg:flex">
        <Image
          src="/Ascend-Logo.svg"
          alt="Ascend"
          width={110}
          height={28}
          priority
          className="mx-3"
        />
        <p className="mx-3 mt-12 text-xs font-semibold uppercase tracking-wider text-gray-800">
          {portalLabel}
        </p>
        <nav className="mt-4 space-y-2">
          {items.map(item => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold ${
                  isActive
                    ? "bg-primary-purple-100 text-primary-purple-800"
                    : "text-Text-high-emphasis hover:bg-grey-50"
                }`}
              >
                <Icon icon={item.icon} className="text-2xl" />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t pt-5">
          <p className="px-3 font-semibold">
            {user ? `${user.first_name} ${user.last_name}` : portalLabel}
          </p>
          <button
            type="button"
            onClick={logOut}
            className="mt-3 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-secondary-red-600 hover:bg-grey-50"
          >
            <Icon icon="solar:logout-linear" className="text-xl" /> Log out
          </button>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="border-b bg-white px-5 py-4 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Image
              src="/Ascend-Logo.svg"
              alt="Ascend"
              width={100}
              height={24}
              priority
              className="lg:hidden"
            />
            <div className="hidden lg:block">
              <p className="text-xs text-gray-800">{portalLabel}</p>
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="ml-auto flex items-center gap-3 text-sm lg:hidden">
              <span className="font-semibold">
                {user?.first_name ?? portalLabel}
              </span>
              <button
                type="button"
                aria-label="Log out"
                onClick={logOut}
                className="rounded border p-2"
              >
                <Icon icon="solar:logout-linear" />
              </button>
            </div>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                  currentPath === item.href
                    ? "bg-primary-purple-100 text-primary-purple-800"
                    : "border bg-white"
                }`}
              >
                <Icon icon={item.icon} /> {item.title}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold lg:hidden">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
