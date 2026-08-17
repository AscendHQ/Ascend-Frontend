import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import ParentLayout, { PortalNavItem } from "@/components/layout/parent";
import NoticeFeed from "@/components/portal/notice-feed";
import StudentTimetable from "@/components/portal/student-timetable";
import { Spinner } from "@/components/ui/Loading";
import { STUDENT_DASHBOARD } from "@/config/links";
import {
  AttendanceSection,
  FinanceSection,
  ResultsSection,
} from "@/pages/parent/children/[studentId]";
import { ParentChildDetails } from "@/types/parent";

export type StudentPortalSection =
  | "overview"
  | "announcements"
  | "timetable"
  | "attendance"
  | "results"
  | "fees";

type StudentDashboardResponse = ParentChildDetails & {
  latest_result: null | {
    _id: string;
    session: string;
    term: string;
    average: number;
  };
};

export const STUDENT_PORTAL_SECTIONS: StudentPortalSection[] = [
  "overview",
  "announcements",
  "timetable",
  "attendance",
  "results",
  "fees",
];

const STUDENT_NAV_ITEMS: PortalNavItem[] = [
  {
    title: "Overview",
    href: STUDENT_DASHBOARD,
    icon: "material-symbols:dashboard-outline-rounded",
  },
  {
    title: "Announcements",
    href: `${STUDENT_DASHBOARD}/announcements`,
    icon: "material-symbols:campaign-outline-rounded",
  },
  {
    title: "Timetable",
    href: `${STUDENT_DASHBOARD}/timetable`,
    icon: "material-symbols:calendar-month-outline-rounded",
  },
  {
    title: "Attendance",
    href: `${STUDENT_DASHBOARD}/attendance`,
    icon: "material-symbols:fact-check-outline-rounded",
  },
  {
    title: "Results",
    href: `${STUDENT_DASHBOARD}/results`,
    icon: "material-symbols:school-outline-rounded",
  },
  {
    title: "Fees & Payments",
    href: `${STUDENT_DASHBOARD}/fees`,
    icon: "material-symbols:payments-outline-rounded",
  },
];

const SECTION_TITLES: Record<StudentPortalSection, string> = {
  overview: "Student overview",
  announcements: "Announcements and events",
  timetable: "Class timetable",
  attendance: "Attendance",
  results: "Results",
  fees: "Fees and payments",
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

const getClassName = (details: StudentDashboardResponse) => {
  const classInfo = details.student.academic_details.class;
  if (!classInfo || typeof classInfo === "string") return "Class not assigned";
  const section = classInfo.other_section ?? classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

function Overview({ details }: { details: StudentDashboardResponse }) {
  const info = details.student.personal_information;
  const period = [
    details.student.academic_details.current_session,
    details.student.academic_details.current_term,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-primary-purple-700 p-6 text-white shadow-sm">
        <p className="text-sm text-primary-purple-100">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold">
          {[info.first_name, info.middle_name, info.last_name]
            .filter(Boolean)
            .join(" ")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <span>Registration: {details.student.registration_number}</span>
          <span>Class: {getClassName(details)}</span>
          <span>{period || "Academic period not set"}</span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Attendance"
          value={`${details.attendance.percentage}%`}
          helper={`${details.attendance.total_days} recorded day(s)`}
        />
        <SummaryCard
          label="Outstanding fees"
          value={formatCurrency(details.finances.balance)}
          helper={`${formatCurrency(details.finances.paid)} paid`}
        />
        <SummaryCard
          label="Latest average"
          value={
            details.latest_result
              ? `${details.latest_result.average}%`
              : "Not available"
          }
          helper={
            details.latest_result
              ? `${details.latest_result.session}, ${details.latest_result.term}`
              : "No approved result yet"
          }
        />
        <SummaryCard
          label="Account status"
          value={details.student.is_active ? "Active" : "Inactive"}
          helper="Student record"
        />
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold">Use the sidebar to continue</h2>
        <p className="mt-2 text-sm text-gray-800">
          Open announcements, your timetable, attendance, results, or fees from
          the menu.
        </p>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-800">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-gray-800">{helper}</p>
    </article>
  );
}

function StudentSectionContent({
  section,
  details,
  isLoading,
  isError,
}: {
  section: StudentPortalSection;
  details?: StudentDashboardResponse;
  isLoading: boolean;
  isError: boolean;
}) {
  if (section === "announcements") return <NoticeFeed showEmptyState />;
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }
  if (isError || !details) {
    return (
      <div className="rounded-xl border bg-white p-8 text-secondary-red-600">
        Your student portal could not be loaded. Please contact the school.
      </div>
    );
  }

  switch (section) {
    case "overview":
      return <Overview details={details} />;
    case "timetable":
      return <StudentTimetable studentId={details.student._id} />;
    case "attendance":
      return <AttendanceSection details={details} />;
    case "results":
      return <ResultsSection details={details} />;
    default:
      return <FinanceSection details={details} />;
  }
}

export default function StudentPortalPage({
  section,
}: {
  section: StudentPortalSection;
}) {
  const dashboardQuery = useQuery({
    queryKey: ["studentPortalDashboard"],
    queryFn: () =>
      axiosInstance
        .get("/student-portals/me/dashboard")
        .then(response => response.data as StudentDashboardResponse),
  });
  const details = dashboardQuery.data;

  return (
    <ParentLayout
      title={SECTION_TITLES[section]}
      portalLabel="Student portal"
      homeHref={STUDENT_DASHBOARD}
      navItems={STUDENT_NAV_ITEMS}
    >
      <StudentSectionContent
        section={section}
        details={details}
        isLoading={dashboardQuery.isLoading}
        isError={dashboardQuery.isError}
      />
    </ParentLayout>
  );
}
