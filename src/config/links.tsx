export const HOME_PAGE = "/";
export const SOLUTION_PAGE = "/solutions";
export const ABOUT_US_PAGE = "/about-us";
export const CONTACT_PAGE = "/";
export const SIGN_UP_PAGE = "/";
export const LOGIN_PAGE = "/auth/login";
export const DEMO_PAGE = "/";
export const ACCOUNT_SETTING_DETAILS = "/dashboard/details";
export const ACCOUNT_SETTING_SCHOOLINFO = "/dashboard/school-information";
export const ACCOUNT_SETTING_GENERALSETTING = "/dashboard/general-settings";
export const DASHBOARD_LESSON = "/dashboard/lesson";
export const DASHBOARD_TIMETABLE = "/dashboard/timetable";
export const DASHBOARD_RESULT = "/dashboard/result";
export const STUDENT_BIODATA = "/dashboard/biodata";
export const DASHBOARD_STUDENT = "/dashboard/students";
export const STUDENT_ACADEMIC_INFORMATION = "/dashboard/academic-information";
export const STUDENT_BIODATA_UPDATE = "/dashboard/update-biodata";
export const STUDENT_ACADEMIC_INFORMATION_UPDATE =
  "/dashboard/update-academic-information";

export const DASHBOARD_SUBJECT = "/dashboard/subjects";
export const NEW_SUBJECT = "/dashboard/subjects/new-subject";
export const DASHBOARD_SUBJECT_INFO = (slug: string) =>
  `/dashboard/subjects/${slug}`;

export const DASHBOARD_CLASS = "/dashboard/classes";
export const NEW_CLASS = "/dashboard/classes/new-class";
export const DASHBOARD_CLASS_INFO = (slug: string) =>
  `/dashboard/classes/${slug}`;

export const DASHBOARD_TEACHER = "/dashboard/teachers";
export const NEW_TEACHER_BIODATA = "/dashboard/teachers/new-teacher-biodata";
export const NEW_TEACHER_PERMISSION =
  "/dashboard/teachers/new-teacher-permission";
export const NEW_TEACHER_OFFICIAL_INFO =
  "/dashboard/teachers/new-teacher-official-information";
export const DASHBOARD_TEACHER_INFO_BIODATA = (slug: string) =>
  `/dashboard/teachers/${slug}/biodata`;
export const DASHBOARD_TEACHER_INFO_OFFICIAL_INFO = (slug: string) =>
  `/dashboard/teachers/${slug}/official-information`;
export const DASHBOARD_TEACHER_INFO_PERMISSION = (slug: string) =>
  `/dashboard/teachers/${slug}/permission`;
export const DASHBOARD_TEACHER_SECURITY_INFO = (slug: string) =>
  `/dashboard/teachers/${slug}/security-information`;

// export const BLOG_PAGE = (slug: string) => `/blog/${slug}`;
