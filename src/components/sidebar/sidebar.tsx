import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import {
  DASHBOARD_CLASS,
  DASHBOARD_CLASS_INFO,
  DASHBOARD_LESSON,
  DASHBOARD_RESULT,
  DASHBOARD_STUDENT,
  DASHBOARD_SUBJECT,
  DASHBOARD_SUBJECT_INFO,
  DASHBOARD_TEACHER,
  DASHBOARD_TIMETABLE,
  NEW_CLASS,
  NEW_SUBJECT,
  NEW_TEACHER_BIODATA,
  NEW_TEACHER_OFFICIAL_INFO,
  NEW_TEACHER_PERMISSION,
  STUDENT_ACADEMIC_INFORMATION,
  STUDENT_ACADEMIC_INFORMATION_UPDATE,
  STUDENT_BIODATA,
  STUDENT_BIODATA_UPDATE,
} from "@/config/links";

import SideBarItem from "./sidebar-item";
import SidebarMenu from "./sidebar-menu";

export default function Sidebar() {
  const router = useRouter();
  const [showCollapsibleSideNav, setshowCollapsibleSideNav] =
    React.useState(true);

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
          isActive={router.pathname === "/dashboard"}
          urlPath="/dashboard"
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

const databaseNavSection = [
  {
    title: "Students",
    path: DASHBOARD_STUDENT,
    isActivepath: [
      DASHBOARD_STUDENT,
      STUDENT_BIODATA,
      STUDENT_ACADEMIC_INFORMATION,
      STUDENT_ACADEMIC_INFORMATION_UPDATE,
      STUDENT_BIODATA_UPDATE,
    ],
  },
  {
    title: "Subjects",
    path: DASHBOARD_SUBJECT,
    isActivepath: [
      DASHBOARD_SUBJECT,
      NEW_SUBJECT,
      DASHBOARD_SUBJECT_INFO("[subjectInfo]"),
    ],
  },
  {
    title: "Classes",
    path: DASHBOARD_CLASS,
    isActivepath: [
      DASHBOARD_CLASS,
      NEW_CLASS,
      DASHBOARD_CLASS_INFO("[classInfo]"),
    ],
  },
  {
    title: "Teachers",
    path: DASHBOARD_TEACHER,
    isActivepath: [
      DASHBOARD_TEACHER,
      NEW_TEACHER_BIODATA,
      NEW_TEACHER_PERMISSION,
      NEW_TEACHER_OFFICIAL_INFO,
    ],
  },
  {
    title: "Hostels",
    path: "/dashboard/hostels",
    isActivepath: ["/dashboard/hostels"],
  },
];
