import {
  DASHBOARD_LESSON_PLAN,
  DASHBOARD_LESSON_PLAN_INFO,
  DASHBOARD_OVERVIEW,
  DASHBOARD_PAYROLL,
  DASHBOARD_PAYROLL_INFO,
  DASHBOARD_RESULT,
  DASHBOARD_RESULT_INFO,
  DASHBOARD_TIMETABLE,
  GENERATE_PAYROLL,
  NEW_LESSON_PLAN,
  NEW_TIMETABLE,
  STUDENT_PROGRESSION,
  SUBJECT_REGISTRATION,
  TERM_CLOSING,
} from "./links";

type SideBarItemType = {
  title: string;
  icon: string;
  isActivePaths: string[];
  urlPath: string;
  isDatabaseNav?: false;
};

type DatabaseNavType = {
  title: string;
  isDatabaseNav: true;
};

type SidebarItemType = SideBarItemType | DatabaseNavType;

export const mainSidebarItems: SidebarItemType[] = [
  {
    title: "Overview",
    icon: "iconamoon:category-light",
    isActivePaths: [DASHBOARD_OVERVIEW],
    isDatabaseNav: false,
    urlPath: DASHBOARD_OVERVIEW,
  },
  {
    title: "DatabaseNav",
    isDatabaseNav: true,
  },
  {
    title: "Lesson plan",
    icon: "material-symbols:menu-book-outline",
    isActivePaths: [
      DASHBOARD_LESSON_PLAN,
      NEW_LESSON_PLAN,
      DASHBOARD_LESSON_PLAN_INFO("[lessonPlanInfo]"),
    ],
    urlPath: DASHBOARD_LESSON_PLAN,
    isDatabaseNav: false,
  },
  {
    title: "Subject Registration",
    icon: "material-symbols-light:app-registration-outline-sharp",
    isActivePaths: [SUBJECT_REGISTRATION],
    urlPath: SUBJECT_REGISTRATION,
    isDatabaseNav: false,
  },
  {
    title: "Student Progression",
    icon: "material-symbols:move-up-rounded",
    isActivePaths: [STUDENT_PROGRESSION],
    urlPath: STUDENT_PROGRESSION,
    isDatabaseNav: false,
  },
  {
    title: "Term Closing",
    icon: "material-symbols:event-available-outline-rounded",
    isActivePaths: [TERM_CLOSING],
    urlPath: TERM_CLOSING,
    isDatabaseNav: false,
  },
  {
    title: "Learning",
    icon: "material-symbols:school-outline",
    isActivePaths: ["/dashboard/learning"],
    isDatabaseNav: false,
    urlPath: "/dashboard/learning",
  },
  {
    title: "Timetable",
    icon: "solar:calendar-linear",
    isActivePaths: [NEW_TIMETABLE, DASHBOARD_TIMETABLE],
    isDatabaseNav: false,
    urlPath: DASHBOARD_TIMETABLE,
  },
  {
    title: "Results",
    icon: "fluent:trophy-16-regular",
    isActivePaths: [DASHBOARD_RESULT, DASHBOARD_RESULT_INFO("[resultInfo]")],
    isDatabaseNav: false,
    urlPath: DASHBOARD_RESULT,
  },
];

export const adminSidebarItems = [
  {
    title: "Payroll",
    icon: "icon-park-outline:transaction-order",
    isActivePaths: [
      DASHBOARD_PAYROLL,
      GENERATE_PAYROLL,
      DASHBOARD_PAYROLL_INFO("[payrollInfo]"),
    ],
    urlPath: DASHBOARD_PAYROLL,
  },
  {
    title: "Roles",
    icon: "la:award",
    isActivePaths: ["/dashboard/roles"],
    urlPath: "/dashboard/roles",
  },
];
