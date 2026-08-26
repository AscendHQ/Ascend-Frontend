import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import {
  ACCOUNT_SETTING_DETAILS,
  ACCOUNT_SETTING_GENERALSETTING,
  ACCOUNT_SETTING_SCHOOLINFO,
} from "@/config/links";
import {
  getStoredUserInfo,
  useAccountProfile,
} from "@/templates/Settings/hooks";

type Props = {
  children: JSX.Element;
  headerTitle: string;
};
export default function AccountSettingContainer({
  children,
  headerTitle,
}: Props) {
  const router = useRouter();
  const storedUser = getStoredUserInfo();
  const { data: accountProfile } = useAccountProfile();
  const firstName = accountProfile?.first_name ?? storedUser?.first_name ?? "";
  const lastName = accountProfile?.last_name ?? storedUser?.last_name ?? "";
  const email = accountProfile?.email ?? storedUser?.email ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  return (
    <div className="dashboard-shell min-h-screen overflow-x-hidden font-inter lg:grid lg:grid-cols-9">
      <Sidebar />
      <div className="min-w-0 bg-neutral-300 lg:col-[3/-1] 3xl:col-[2/-1]">
        <DashboardHeader headerTitle={headerTitle} />
        <div className="bg-white p-4 sm:p-6 lg:p-10">
          <div className="flex gap-4">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-purple-700 text-lg font-semibold text-white">
              {initials || "?"}
            </div>
            <div>
              <h3 className="text-Text-high-emphasis text-2xl font-semibold tracking-tight">
                {fullName || "Account administrator"}
              </h3>
              <span className="text-base text-gray-800 font-medium">
                {email}
              </span>
            </div>
          </div>
          <div className="flex pb-5 pt-10">
            <ul className="flex max-w-full items-center gap-2 overflow-x-auto rounded border-1.5 border-border-colour-light bg-neutral-300 px-2 py-1">
              {[
                {
                  title: "My Details",
                  url: ACCOUNT_SETTING_DETAILS,
                },
                {
                  title: "School Information",
                  url: ACCOUNT_SETTING_SCHOOLINFO,
                },
                {
                  title: "General Settings",
                  url: ACCOUNT_SETTING_GENERALSETTING,
                },
              ].map(each => (
                <li key={each.title}>
                  <Link
                    href={each.url}
                    className={`px-3 py-2 ${
                      each.url === router.pathname
                        ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                        : " text-gray-800"
                    } font-medium tracking-tight`}
                  >
                    {each.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
