export const HOME_PAGE = "/";
export const SOLUTION_PAGE = "/solutions";
export const ABOUT_US_PAGE = "/about-us";
export const CONTACT_PAGE = "/";
export const SIGN_UP_PAGE = "/";
export const LOGIN_PAGE = "/auth/login";

export const ACCOUNT_SETTING_DETAILS = "/dashboard/settings/details";
export const ACCOUNT_SETTING_SCHOOLINFO =
  "/dashboard/settings/school-information";
export const ACCOUNT_SETTING_GENERALSETTING =
  "/dashboard/settings/general-settings";

export const DASHBOARD_OVERVIEW = "/dashboard";

export const DASHBOARD_STUDENT = "/dashboard/students";
export const STUDENT_ACADEMIC_INFORMATION =
  "/dashboard/students/academic-information";
export const STUDENT_BIODATA = "/dashboard/students/biodata";
export const STUDENT_BIODATA_UPDATE = "/dashboard/students/update-biodata";
export const STUDENT_ACADEMIC_INFORMATION_UPDATE =
  "/dashboard/students/update-academic-information";

export const DASHBOARD_SUBJECT = "/dashboard/subjects";
export const NEW_SUBJECT = "/dashboard/subjects/new-subject";
export const DASHBOARD_SUBJECT_INFO = (slug: string) =>
  `/dashboard/subjects/${slug}`;

export const DASHBOARD_CLASS = "/dashboard/classes";
export const NEW_CLASS = "/dashboard/classes/new-class";
export const NEW_BULK_CLASS = "/dashboard/classes/new-bulk-class";
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

export const DASHBOARD_HOSTEL = "/dashboard/hostels";
export const NEW_HOSTEL = "/dashboard/hostels/new-hostel";
export const NEW_BULK_HOSTEL = "/dashboard/hostels/new-bulk-hostel";
export const DASHBOARD_HOSTEL_INFO = (slug: string) =>
  `/dashboard/hostels/${slug}`;

export const DASHBOARD_RESULT = "/dashboard/results";
export const NEW_RESULT = "/dashboard/results/new-result";
export const DASHBOARD_RESULT_INFO = (slug: string) =>
  `/dashboard/results/${slug}`;

export const DASHBOARD_PAYROLL = "/dashboard/payroll";
export const GENERATE_PAYROLL = "/dashboard/payroll/generate-payroll";
export const DASHBOARD_PAYROLL_INFO = (slug: string) =>
  `/dashboard/payroll/${slug}`;

export const DASHBOARD_LESSON_PLAN = "/dashboard/lesson-plan";
export const NEW_LESSON_PLAN = "/dashboard/lesson-plan/new-lesson-plan";
export const NEW_BULK_LESSON_PLAN =
  "/dashboard/lesson-plan/new-bulk-lesson-plan";
export const DASHBOARD_LESSON_PLAN_INFO = (slug: string) =>
  `/dashboard/lesson-plan/${slug}`;

export const DASHBOARD_TIMETABLE = "/dashboard/timetable";
export const NEW_TIMETABLE = "/dashboard/timetable/new-timetable";

export const BOOK_A_DEMO = "https://calendly.com/ascendafrica/30min";

export const MOCK_API_LINK =
  "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188";
