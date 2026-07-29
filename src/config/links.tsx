export const HOME_PAGE = "/";
export const SOLUTION_PAGE = "/solutions";
export const ABOUT_US_PAGE = "/about-us";
export const CONTACT_PAGE = "/contact-us";
export const SIGN_UP_PAGE = "/";
export const LOGIN_PAGE = "/auth/login";

export const ACCOUNT_SETTING_DETAILS = "/dashboard/settings/details";
export const ACCOUNT_SETTING_SCHOOLINFO =
  "/dashboard/settings/school-information";
export const ACCOUNT_SETTING_GENERALSETTING =
  "/dashboard/settings/general-settings";

export const DASHBOARD_OVERVIEW = "/dashboard";

// STUDENT
export const DASHBOARD_STUDENT = "/dashboard/database/students";
export const STUDENT_ACADEMIC_INFORMATION =
  "/dashboard/database/students/update-academic-information";
export const STUDENT_BIODATA = "/dashboard/database/students/update-biodata";
export const NEW_STUDENT = "/dashboard/database/students/new-student";
export const DASHBOARD_STUDENT_INFO = (slug: string) =>
  `/dashboard/database/students/${slug}`;

// SUBJECT
export const DASHBOARD_SUBJECT = "/dashboard/database/subjects";
export const NEW_SUBJECT = "/dashboard/database/subjects/new-subject";
export const DASHBOARD_SUBJECT_INFO = (slug: string) =>
  `/dashboard/database/subjects/${slug}`;

export const SUBJECT_REGISTRATION = "/dashboard/register-subject";

// CLASS
export const DASHBOARD_CLASS = "/dashboard/database/classes";
export const NEW_CLASS = "/dashboard/database/classes/new-class";
export const NEW_BULK_CLASS = "/dashboard/database/classes/new-bulk-class";
export const DASHBOARD_CLASS_INFO = (slug: string) =>
  `/dashboard/database/classes/${slug}`;

// TEACHER
export const DASHBOARD_TEACHER = "/dashboard/database/staff";
export const NEW_TEACHER_BIODATA = "/dashboard/database/staff/new-staff";
export const NEW_TEACHER_PERMISSION =
  "/dashboard/database/staff/new-teacher-permission";
export const DASHBOARD_TEACHER_INFO_BIODATA = (slug: string) =>
  `/dashboard/database/staff/${slug}`;
export const DASHBOARD_TEACHER_INFO_OFFICIAL_INFO = (slug: string) =>
  `/dashboard/database/staff/${slug}/official-information`;
export const DASHBOARD_TEACHER_INFO_PERMISSION = (slug: string) =>
  `/dashboard/database/staff/${slug}/permission`;
export const DASHBOARD_TEACHER_SECURITY_INFO = (slug: string) =>
  `/dashboard/database/staff/${slug}/security-information`;

// HOSTEL
export const DASHBOARD_HOSTEL = "/dashboard/database/hostels";
export const NEW_HOSTEL = "/dashboard/database/hostels/new-hostel";
export const NEW_BULK_HOSTEL = "/dashboard/database/hostels/new-bulk-hostel";
export const DASHBOARD_HOSTEL_INFO = (slug: string) =>
  `/dashboard/database/hostels/${slug}`;

// RESULT
export const DASHBOARD_RESULT = "/dashboard/results";
export const NEW_RESULT = "/dashboard/results/new-result";
export const DASHBOARD_RESULT_INFO = (slug: string) =>
  `/dashboard/results/${slug}`;

// PAYROLL
export const DASHBOARD_PAYROLL = "/dashboard/payroll";
export const GENERATE_PAYROLL = "/dashboard/payroll/generate-payroll";
export const DASHBOARD_PAYROLL_INFO = (slug: string) =>
  `/dashboard/payroll/${slug}`;

// LESSON-PLAN
export const DASHBOARD_LESSON_PLAN = "/dashboard/lesson-plan";
export const NEW_LESSON_PLAN = "/dashboard/lesson-plan/new-lesson-plan";
export const NEW_BULK_LESSON_PLAN =
  "/dashboard/lesson-plan/new-bulk-lesson-plan";
export const DASHBOARD_LESSON_PLAN_INFO = (slug: string) =>
  `/dashboard/lesson-plan/${slug}`;

// TIMETABLES
export const DASHBOARD_TIMETABLE = "/dashboard/timetable";
export const NEW_TIMETABLE = "/dashboard/timetable/new-timetable";

// SCHOOLS (Ascend admin only - onboarding new schools)
export const NEW_SCHOOL = "/dashboard/schools/new-school";

export const BOOK_A_DEMO = "https://calendly.com/ascendafrica/30min";

export const MOCK_API_LINK =
  "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188";
