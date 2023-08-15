/* eslint-disable sonarjs/no-duplicate-string */
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import databaseNavSection from "@/config/databaseNavSection";
import {
  DASHBOARD_LESSON,
  DASHBOARD_OVERVIEW,
  DASHBOARD_RESULT,
  DASHBOARD_TIMETABLE,
} from "@/config/links";

import SideBarItem from "./sidebar-item";
import SidebarMenu from "./sidebar-menu";

export default function Sidebar() {
  const router = useRouter();

  const [showCollapsibleSideNav, setshowCollapsibleSideNav] =
    React.useState(false);

  return (
    <aside className="col-span-2 3xl:col-span-1 border-r border-neutral-200 py-6 px-4 bg-white relative">
      <Image
        src="/Ascend-Logo.svg"
        alt="Ascend Logo"
        width={100}
        height={24}
        priority
        className="relative z-50 mt-3"
      />
      <div className="mt-16 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-gray-800">MAIN</h3>
        <SideBarItem
          title={"Overview"}
          icon="iconamoon:category-light"
          isActive={router.pathname === DASHBOARD_OVERVIEW}
          urlPath={DASHBOARD_OVERVIEW}
        />
        <SidebarMenu
          heading={"Database"}
          collapse={Boolean(
            !databaseNavSection.find(each =>
              each.isActivepath.some(path => router.pathname === path)
            )
          )}
          collapseAction={showCollapsibleSideNav}
          setCollapse={setshowCollapsibleSideNav}
        >
          {databaseNavSection.map(each => (
            <SideBarItem
              title={each.title}
              isActive={each.isActivepath.some(
                path => router.pathname === path
              )}
              urlPath={each.path}
              isSideBarMenu
              key={each.title}
            />
          ))}
        </SidebarMenu>
        <SideBarItem
          title={"Lesson plan"}
          icon="material-symbols:menu-book-outline"
          isActive={router.pathname === DASHBOARD_LESSON}
          urlPath={DASHBOARD_LESSON}
        />
        <SideBarItem
          title={"Timetable"}
          icon="solar:calendar-linear"
          isActive={router.pathname === DASHBOARD_TIMETABLE}
          urlPath={DASHBOARD_TIMETABLE}
        />
        <SideBarItem
          title={"Results"}
          icon="fluent:trophy-16-regular"
          isActive={router.pathname === DASHBOARD_RESULT}
          urlPath={DASHBOARD_RESULT}
        />
      </div>
      <div className="mt-10 mb-5 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-gray-800">ADMINISTRATION</h3>
        <SideBarItem
          title={"Payroll"}
          icon="icon-park-outline:transaction-order"
          isActive={router.pathname === "/dashboard/payroll"}
          urlPath="/dashboard/payroll"
        />
        <SideBarItem
          title={"Roles"}
          icon="la:award"
          isActive={router.pathname === "/dashboard/roles"}
          urlPath="/dashboard/roles"
        />
        <SideBarItem
          title={"Staff"}
          icon="healthicons:people-outline"
          isActive={router.pathname === "/dashboard/staff"}
          urlPath="/dashboard/staff"
        />
      </div>
      <span className="text-primary-purple-200 absolute bottom-0">
        ©product of Ascend
      </span>
    </aside>
  );
}
