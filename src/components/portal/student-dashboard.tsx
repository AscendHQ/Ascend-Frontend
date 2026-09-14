import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import StudentCbt from "@/components/cbt/student-cbt";
import ParentLayout, { PortalNavItem } from "@/components/layout/parent";
import NoticeFeed from "@/components/portal/notice-feed";
import PortalErrorState from "@/components/portal/portal-error-state";
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
  | "cbt"
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
  "cbt",
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
    title: "CBT Exams",
    href: `${STUDENT_DASHBOARD}/cbt`,
    icon: "material-symbols:quiz-outline-rounded",
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
  cbt: "CBT examinations",
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
      <section className="relative overflow-hidden rounded-lg bg-primary-purple-700 p-5 text-white sm:p-6">
        <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-primary-purple-600 opacity-60" />
        <div className="relative">
          <p className="text-sm text-primary-purple-100">Welcome back</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {[info.first_name, info.middle_name, info.last_name]
              .filter(Boolean)
              .join(" ")}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-purple-100">
            <span className="rounded-md bg-white/10 px-2.5 py-1">
              Registration: {details.student.registration_number}
            </span>
            <span className="rounded-md bg-white/10 px-2.5 py-1">
              Class: {getClassName(details)}
            </span>
            <span className="rounded-md bg-white/10 px-2.5 py-1">
              {period || "Academic period not set"}
            </span>
          </div>
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

      <section className="rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
        <h2 className="font-semibold">Everything in one place</h2>
        <p className="mt-2 text-sm text-Text-meduim-emphasis">
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
    <article className="rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
      <p className="text-sm text-Text-meduim-emphasis">{label}</p>
      <p className="mt-2 text-xl font-semibold text-Text-high-emphasis">
        {value}
      </p>
      <p className="mt-1 text-xs text-Text-meduim-emphasis">{helper}</p>
    </article>
  );
}

function StudentSectionContent({
  section,
  details,
  isLoading,
  isError,
  retry,
}: {
  section: StudentPortalSection;
  details?: StudentDashboardResponse;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
}) {
  if (section === "announcements") return <NoticeFeed showEmptyState />;
  if (section === "cbt") return <StudentCbt />;
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }
  if (isError || !details) {
    return (
      <PortalErrorState
        message="Your student portal could not be loaded safely."
        onRetry={retry}
      />
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
        retry={() => void dashboardQuery.refetch()}
      />
    </ParentLayout>
  );
}
