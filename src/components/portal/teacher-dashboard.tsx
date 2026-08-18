import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import ParentLayout, { PortalNavItem } from "@/components/layout/parent";
import NoticeFeed from "@/components/portal/notice-feed";
import PortalErrorState from "@/components/portal/portal-error-state";
import TeacherAttendance from "@/components/portal/teacher-attendance";
import TeacherResults from "@/components/portal/teacher-results";
import { Spinner } from "@/components/ui/Loading";
import { TEACHER_DASHBOARD } from "@/config/links";
import { PortalTimetableRecord } from "@/types/portal";

export type TeacherSection =
  | "overview"
  | "announcements"
  | "timetable"
  | "classes"
  | "attendance"
  | "results";

export const TEACHER_SECTIONS: TeacherSection[] = [
  "overview",
  "announcements",
  "timetable",
  "classes",
  "attendance",
  "results",
];

type AssignedClass = {
  _id: string;
  name: string;
  section?: string;
  other_section?: string;
};

type TeacherDashboardData = {
  profile: {
    staff: {
      staff_no: string;
      surname: string;
      other_names: string;
      department?: string;
      post?: string;
    };
    assignments: Array<{
      class: AssignedClass;
      subjects: Array<{ _id: string; name: string; code: string }>;
    }>;
  };
  academic_period: { session?: string; term?: string };
  summary: {
    student_count: number;
    attendance_count: number;
    approved_result_count: number;
  };
  students: Array<{
    _id: string;
    registration_number: string;
    personal_information?: {
      first_name: string;
      middle_name?: string;
      last_name: string;
    };
    academic_details: { class?: AssignedClass | string };
  }>;
  timetables: PortalTimetableRecord[];
};

const NAV_ITEMS: PortalNavItem[] = [
  {
    title: "Overview",
    href: TEACHER_DASHBOARD,
    icon: "material-symbols:dashboard-outline-rounded",
  },
  {
    title: "Announcements",
    href: `${TEACHER_DASHBOARD}/announcements`,
    icon: "material-symbols:campaign-outline-rounded",
  },
  {
    title: "Timetable",
    href: `${TEACHER_DASHBOARD}/timetable`,
    icon: "material-symbols:calendar-month-outline-rounded",
  },
  {
    title: "My Classes",
    href: `${TEACHER_DASHBOARD}/classes`,
    icon: "material-symbols:groups-outline-rounded",
  },
  {
    title: "Attendance",
    href: `${TEACHER_DASHBOARD}/attendance`,
    icon: "material-symbols:fact-check-outline-rounded",
  },
  {
    title: "Results",
    href: `${TEACHER_DASHBOARD}/results`,
    icon: "material-symbols:school-outline-rounded",
  },
];

const TITLES: Record<TeacherSection, string> = {
  overview: "Teacher overview",
  announcements: "Announcements and events",
  timetable: "My timetable",
  classes: "My classes",
  attendance: "Class attendance",
  results: "Enter results",
};

const getClassName = (item: AssignedClass) => {
  const section = item.other_section ?? item.section;
  return section ? `${item.name} - ${section}` : item.name;
};

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-800">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-gray-800">{helper}</p>
    </article>
  );
}

function Overview({ data }: { data: TeacherDashboardData }) {
  const staff = data.profile.staff;
  const subjectCount = new Set(
    data.profile.assignments.flatMap(assignment =>
      assignment.subjects.map(subject => subject._id)
    )
  ).size;
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-primary-purple-700 p-6 text-white shadow-sm">
        <p className="text-sm text-primary-purple-100">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold">
          {staff.surname} {staff.other_names}
        </h2>
        <p className="mt-2 text-sm">
          {staff.staff_no} ·{" "}
          {staff.post || staff.department || "Teaching staff"}
        </p>
        <p className="mt-1 text-sm">
          {data.academic_period.session || "Session not set"},{" "}
          {data.academic_period.term || "Term not set"}
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Assigned classes"
          value={data.profile.assignments.length}
          helper="Classes you can access"
        />
        <SummaryCard
          label="Assigned subjects"
          value={subjectCount}
          helper="Subjects you teach"
        />
        <SummaryCard
          label="Students"
          value={data.summary.student_count}
          helper="Across assigned classes"
        />
        <SummaryCard
          label="Attendance registers"
          value={data.summary.attendance_count}
          helper="Current academic period"
        />
      </section>
    </div>
  );
}

const hasDashboardShape = (
  data?: TeacherDashboardData
): data is TeacherDashboardData =>
  Boolean(
    data?.profile?.staff &&
      Array.isArray(data.profile.assignments) &&
      Array.isArray(data.students) &&
      Array.isArray(data.timetables)
  );

function Classes({ data }: { data: TeacherDashboardData }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {data.profile.assignments.map(assignment => {
        const classInfo = assignment.class;
        const students = data.students.filter(student => {
          const studentClass = student.academic_details.class;
          return (
            typeof studentClass !== "string" &&
            studentClass?._id === classInfo._id
          );
        });
        return (
          <section
            key={classInfo._id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold">{getClassName(classInfo)}</h2>
            <p className="mt-1 text-sm text-primary-purple-700">
              {(assignment.subjects ?? [])
                .map(subject => subject?.name)
                .filter(Boolean)
                .join(", ")}
            </p>
            <p className="mt-1 text-sm text-gray-800">
              {students.length} student(s)
            </p>
            <div className="mt-4 divide-y rounded-lg border">
              {students.length ? (
                students.map(student => (
                  <div
                    key={student._id}
                    className="flex justify-between gap-4 p-3 text-sm"
                  >
                    <span className="font-semibold">
                      {student.personal_information?.last_name ?? "Student"}{" "}
                      {student.personal_information?.first_name ?? ""}
                    </span>
                    <span className="text-gray-800">
                      {student.registration_number}
                    </span>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-gray-800">No active students.</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Timetables({ data }: { data: TeacherDashboardData }) {
  if (!data.timetables.length)
    return (
      <EmptyState message="No timetable has been published for your assigned classes." />
    );
  return (
    <div className="space-y-5">
      {data.timetables.map(timetable => {
        const classInfo =
          typeof timetable.class === "string" ? undefined : timetable.class;
        return (
          <section
            key={timetable._id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold">
              {classInfo ? getClassName(classInfo) : "Assigned class"}
            </h2>
            <p className="text-sm text-gray-800">
              {timetable.session}, {timetable.term}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                day => (
                  <div key={day} className="rounded-lg border p-3">
                    <h3 className="font-semibold">{day}</h3>
                    <div className="mt-2 space-y-2">
                      {(timetable.entries ?? [])
                        .filter(entry => entry.day === day)
                        .map(entry => (
                          <div
                            key={
                              entry._id ??
                              `${entry.start_time}-${entry.subject}`
                            }
                            className="rounded bg-neutral-300 p-2 text-xs"
                          >
                            <p className="font-semibold">{entry.subject}</p>
                            <p>
                              {entry.start_time}–{entry.end_time}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <section className="rounded-2xl border bg-white p-8 text-center text-gray-800 shadow-sm">
      {message}
    </section>
  );
}

function Content({
  section,
  data,
  loading,
  error,
  retry,
}: {
  section: TeacherSection;
  data?: TeacherDashboardData;
  loading: boolean;
  error: boolean;
  retry: () => void;
}) {
  if (section === "announcements") return <NoticeFeed showEmptyState />;
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  if (error || !hasDashboardShape(data))
    return (
      <PortalErrorState
        message="Your teacher portal could not be loaded safely."
        onRetry={retry}
      />
    );
  if (section === "overview") return <Overview data={data} />;
  if (section === "classes") return <Classes data={data} />;
  if (section === "timetable") return <Timetables data={data} />;
  if (section === "attendance")
    return (
      <TeacherAttendance
        classes={data.profile.assignments.map(assignment => assignment.class)}
        session={data.academic_period.session}
        term={data.academic_period.term}
      />
    );
  return (
    <TeacherResults
      assignments={data.profile.assignments}
      session={data.academic_period.session}
      term={data.academic_period.term}
    />
  );
}

export default function TeacherPortalPage({
  section,
}: {
  section: TeacherSection;
}) {
  const dashboardQuery = useQuery({
    queryKey: ["teacherPortalDashboard"],
    queryFn: () =>
      axiosInstance
        .get("/teacher-portals/me/dashboard")
        .then(response => response.data as TeacherDashboardData),
  });
  return (
    <ParentLayout
      title={TITLES[section]}
      portalLabel="Teacher portal"
      homeHref={TEACHER_DASHBOARD}
      navItems={NAV_ITEMS}
    >
      <Content
        section={section}
        data={dashboardQuery.data}
        loading={dashboardQuery.isLoading}
        error={dashboardQuery.isError}
        retry={() => void dashboardQuery.refetch()}
      />
    </ParentLayout>
  );
}
