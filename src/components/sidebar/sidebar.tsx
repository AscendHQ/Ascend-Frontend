import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import SideBarItem from "./sidebar-item";
import SidebarMenu from "./sidebar-menu";

export default function Sidebar() {
  const router = useRouter();
  const [showCollapsibleSideNav, setshowCollapsibleSideNav] =
    React.useState(true);

  return (
    <aside className="w-[20%] max-w-[350px] min-w-[300px] border-r border-neutral-200 p-6 bg-white relative">
      <Image
        src="/Ascend-Logo.svg"
        alt="Ascend Logo"
        width={100}
        height={24}
        priority
        className="relative z-50 mt-3"
      />
      <div className="mt-16 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-Text-meduim-emphasis">MAIN</h3>
        <SideBarItem
          title={"Overview"}
          icon="iconamoon:category-light"
          isActive={router.pathname === "/dashboard"}
          urlPath="/dashboard"
        />
        <SidebarMenu
          heading={"Database"}
          collapse={showCollapsibleSideNav}
          setCollapse={setshowCollapsibleSideNav}
        >
          {databaseNavSection.map(each => (
            <SideBarItem
              title={each.title}
              isActive={router.pathname === each.path}
              urlPath={each.path}
              key={each.title}
            />
          ))}
        </SidebarMenu>
        <SideBarItem
          title={"Lesson plan"}
          icon="material-symbols:menu-book-outline"
          isActive={router.pathname === "/dashboard/lesson"}
          urlPath="/dashboard/lesson"
        />
        <SideBarItem
          title={"Timetable"}
          icon="solar:calendar-linear"
          isActive={router.pathname === "/dashboard/timetable"}
          urlPath="/dashboard/timetable"
        />
        <SideBarItem
          title={"Results"}
          icon="fluent:trophy-16-regular"
          isActive={router.pathname === "/dashboard/result"}
          urlPath="/dashboard/result"
        />
      </div>
      <div className="mt-10 mb-5 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-Text-meduim-emphasis">
          ADMINISTRATION
        </h3>
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

const databaseNavSection = [
  {
    title: "Students",
    path: "/dashboard/students",
  },
  {
    title: "Subjects",
    path: "/dashboard/subjects",
  },
  {
    title: "Classes",
    path: "/dashboard/classes",
  },
  {
    title: "Teachers",
    path: "/dashboard/teachers",
  },
  {
    title: "Hostels",
    path: "/dashboard/hostels",
  },
];
