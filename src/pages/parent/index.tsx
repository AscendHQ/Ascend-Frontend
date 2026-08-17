import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { axiosInstance } from "@/api";
import ParentLayout from "@/components/layout/parent";
import NoticeFeed from "@/components/portal/notice-feed";
import { Spinner } from "@/components/ui/Loading";
import { PARENT_CHILD } from "@/config/links";
import { ParentDashboardChild } from "@/types/parent";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

const getStudentName = (child: ParentDashboardChild) => {
  const info = child.student.personal_information;
  return [info.first_name, info.middle_name, info.last_name]
    .filter(Boolean)
    .join(" ");
};

const getClassName = (child: ParentDashboardChild) => {
  const classInfo = child.student.academic_details.class;
  if (!classInfo || typeof classInfo === "string") return "Class not assigned";
  const section = classInfo.other_section ?? classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

function ChildCard({ child }: { child: ParentDashboardChild }) {
  return (
    <article className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold">{getStudentName(child)}</p>
          <p className="text-sm text-gray-800">
            {child.student.registration_number} · {getClassName(child)}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${child.student.is_active ? "bg-secondary-green-100 text-secondary-green-700" : "bg-grey-100 text-gray-800"}`}>
          {child.student.is_active ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-neutral-300 p-3">
          <p className="text-xs text-gray-800">Attendance</p>
          <p className="text-lg font-bold">{child.attendance.percentage}%</p>
        </div>
        <div className="rounded-lg bg-neutral-300 p-3">
          <p className="text-xs text-gray-800">Fee balance</p>
          <p className="text-lg font-bold">{formatCurrency(child.finances.balance)}</p>
        </div>
        <div className="rounded-lg bg-neutral-300 p-3">
          <p className="text-xs text-gray-800">Latest average</p>
          <p className="text-lg font-bold">{child.latest_result ? `${child.latest_result.average}%` : "—"}</p>
        </div>
      </div>
      <Link
        href={PARENT_CHILD(child.student._id)}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-4 py-3 font-semibold text-white"
      >
        View school information <Icon icon="material-symbols:arrow-forward-rounded" />
      </Link>
    </article>
  );
}

export default function ParentDashboard() {
  const dashboardQuery = useQuery({
    queryKey: ["parentDashboard"],
    queryFn: () =>
      axiosInstance
        .get("/parents/me/dashboard")
        .then(response => response.data as { children: ParentDashboardChild[] }),
  });

  return (
    <ParentLayout title="My children">
      <NoticeFeed />
      {dashboardQuery.isLoading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : dashboardQuery.isError ? (
        <div className="rounded-xl border bg-white p-8 text-secondary-red-600">
          Your parent dashboard could not be loaded. Please contact the school.
        </div>
      ) : !dashboardQuery.data?.children.length ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-800">
          No students are linked to this account yet. Please contact the school administrator.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {dashboardQuery.data.children.map(child => (
            <ChildCard key={child.student._id} child={child} />
          ))}
        </div>
      )}
    </ParentLayout>
  );
}
