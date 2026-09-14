import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { axiosInstance } from "@/api";
import ParentLayout from "@/components/layout/parent";
import NoticeFeed from "@/components/portal/notice-feed";
import PortalErrorState from "@/components/portal/portal-error-state";
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
    <article className="flex h-full flex-col rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-purple-100 font-semibold text-primary-purple-700">
            {getStudentName(child).charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{getStudentName(child)}</p>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              {child.student.registration_number} · {getClassName(child)}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            child.student.is_active
              ? "bg-success-light text-success-dark"
              : "bg-neutral-300 text-gray-600"
          }`}
        >
          {child.student.is_active ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-neutral-300 p-3">
          <p className="text-xs text-Text-meduim-emphasis">Attendance</p>
          <p className="mt-1 text-lg font-semibold">
            {child.attendance.percentage}%
          </p>
        </div>
        <div className="rounded-lg bg-neutral-300 p-3">
          <p className="text-xs text-Text-meduim-emphasis">Fee balance</p>
          <p className="mt-1 break-words text-lg font-semibold">
            {formatCurrency(child.finances.balance)}
          </p>
        </div>
        <div className="col-span-2 rounded-lg bg-neutral-300 p-3 sm:col-span-1">
          <p className="text-xs text-Text-meduim-emphasis">Latest average</p>
          <p className="mt-1 text-lg font-semibold">
            {child.latest_result ? `${child.latest_result.average}%` : "—"}
          </p>
        </div>
      </div>
      <Link
        href={PARENT_CHILD(child.student._id)}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg border-1.5 border-primary-purple-700 px-4 py-2.5 text-sm font-semibold text-primary-purple-700 transition hover:bg-primary-purple-700 hover:text-white"
      >
        View school information{" "}
        <Icon icon="material-symbols:arrow-forward-rounded" />
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
        .then(
          response => response.data as { children: ParentDashboardChild[] }
        ),
  });

  return (
    <ParentLayout title="My children">
      <NoticeFeed />
      {dashboardQuery.isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : dashboardQuery.isError ? (
        <PortalErrorState
          message="Your parent dashboard could not be loaded safely."
          onRetry={() => void dashboardQuery.refetch()}
        />
      ) : !dashboardQuery.data?.children.length ? (
        <div className="rounded-lg border border-dashed border-border-colour-light bg-white p-8 text-center text-Text-meduim-emphasis">
          No students are linked to this account yet. Please contact the school
          administrator.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {dashboardQuery.data.children.map(child => (
            <ChildCard key={child.student._id} child={child} />
          ))}
        </div>
      )}
    </ParentLayout>
  );
}
