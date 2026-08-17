import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import ParentLayout from "@/components/layout/parent";
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

type StudentDashboardResponse = ParentChildDetails & {
  latest_result: null | {
    _id: string;
    session: string;
    term: string;
    average: number;
  };
};

export default function StudentDashboard() {
  const dashboardQuery = useQuery({
    queryKey: ["studentPortalDashboard"],
    queryFn: () =>
      axiosInstance
        .get("/student-portals/me/dashboard")
        .then(response => response.data as StudentDashboardResponse),
  });
  const details = dashboardQuery.data;
  const info = details?.student.personal_information;
  const studentName = info
    ? [info.first_name, info.middle_name, info.last_name].filter(Boolean).join(" ")
    : "My school portal";
  return (
    <ParentLayout
      title={studentName}
      portalLabel="Student portal"
      homeHref={STUDENT_DASHBOARD}
    >
      <NoticeFeed />
      {dashboardQuery.isLoading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : dashboardQuery.isError || !details ? (
        <div className="rounded-xl border bg-white p-8 text-secondary-red-600">
          Your student portal could not be loaded. Please contact the school.
        </div>
      ) : (
        <div className="space-y-6">
          <StudentTimetable studentId={details.student._id} />
          <AttendanceSection details={details} />
          <ResultsSection details={details} />
          <FinanceSection details={details} />
        </div>
      )}
    </ParentLayout>
  );
}
