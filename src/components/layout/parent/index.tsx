import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { LOGIN_PAGE, PARENT_DASHBOARD } from "@/config/links";
import { getStoredUserInfo } from "@/templates/Settings/hooks";

export default function ParentLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  const user = getStoredUserInfo();
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = LOGIN_PAGE;
  };
  return (
    <div className="min-h-screen bg-neutral-300 font-inter">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
          <div className="flex items-center gap-8">
            <Image src="/Ascend-Logo.svg" alt="Ascend" width={100} height={24} priority />
            <Link
              href={PARENT_DASHBOARD}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                router.pathname === PARENT_DASHBOARD
                  ? "bg-primary-purple-200 text-primary-purple-700"
                  : "text-gray-800"
              }`}
            >
              <Icon icon="material-symbols:home-outline-rounded" /> My children
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <p className="font-semibold">{user ? `${user.first_name} ${user.last_name}` : "Parent"}</p>
              <p className="text-xs text-gray-800">Parent portal</p>
            </div>
            <button type="button" onClick={logOut} className="flex items-center gap-1 rounded-lg border px-3 py-2 font-semibold">
              <Icon icon="solar:logout-linear" /> Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8">
        <h1 className="mb-6 text-2xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
