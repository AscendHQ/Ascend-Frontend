import { Icon } from "@iconify/react";
import { MenuProps, notification } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
import { TableCell, TableHeader } from "@/components/ui/table";
import { DASHBOARD_LESSON_PLAN_INFO, NEW_LESSON_PLAN } from "@/config/links";
import {
  LessonRecord,
  useAllLessons,
  useUpdateLessonStatus,
} from "@/templates/LessonPlan/hooks";

export default function LessonPlan() {
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading, isError, error } = useAllLessons();
  const { updateLessonStatus } = useUpdateLessonStatus(api);

  const lessons = data?.lessons ?? [];

  const approvedCount = lessons.filter(l => l.status === "approved").length;
  const rejectedCount = lessons.filter(l => l.status === "rejected").length;
  const pendingCount = lessons.filter(
    lesson => !lesson.status || lesson.status === "pending"
  ).length;
  const filteredLessons = lessons.filter(lesson => {
    if (statusFilter === "all") return true;
    if (statusFilter === "pending") {
      return !lesson.status || lesson.status === "pending";
    }
    return lesson.status === statusFilter;
  });
  const filters = [
    { value: "all" as const, label: "All", count: lessons.length },
    { value: "pending" as const, label: "Pending", count: pendingCount },
    { value: "approved" as const, label: "Approved", count: approvedCount },
    { value: "rejected" as const, label: "Rejected", count: rejectedCount },
  ];

  return (
    <Container headerTitle="Lesson Plan">
      <main className="relative min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        {contextHolder}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
              Lesson plans
            </h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Create, review, and approve lesson plans for every class.
            </p>
          </div>
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            isLink
            path={NEW_LESSON_PLAN}
          >
            Add Lesson Plan
          </DashboardButton>
        </div>
        <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
          <ul className="flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border-colour-light bg-neutral-300 p-1 text-sm tracking-tight">
            {filters.map(filter => (
              <li key={filter.value}>
                <button
                  type="button"
                  onClick={() => setStatusFilter(filter.value)}
                  className={`whitespace-nowrap rounded-md px-3 py-2 ${
                    statusFilter === filter.value
                      ? "bg-white font-semibold text-primary-purple-700 shadow-sm"
                      : "font-medium text-Text-meduim-emphasis"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              </li>
            ))}
          </ul>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : isError && isAccessDeniedError(error) ? (
            <PermissionDeniedState message="You don't have permission to view lesson plans." />
          ) : !filteredLessons.length ? (
            <div className="mt-5 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border-colour-light py-16 text-Text-meduim-emphasis">
              <p>
                {lessons.length
                  ? `No ${statusFilter} lesson plans.`
                  : "No lesson plans yet."}
              </p>
              <p className="text-sm">
                Click &quot;Add Lesson Plan&quot; to create the first one.
              </p>
            </div>
          ) : (
            <Table
              lessons={filteredLessons}
              updateLessonStatus={updateLessonStatus}
            />
          )}
        </section>
      </main>
    </Container>
  );
}

function Table({
  lessons,
  updateLessonStatus,
}: {
  lessons: LessonRecord[];
  updateLessonStatus: (vars: {
    id: string;
    status: "approved" | "rejected";
  }) => void;
}) {
  return (
    <div className="relative mt-5 overflow-x-auto rounded-lg border border-border-colour-light">
      <table className="w-full min-w-[880px] text-left text-sm text-Text-meduim-emphasis">
        <TableHeaders />
        <tbody>
          {lessons.map((item, index) => (
            <LessonPlanTableRow
              key={item._id}
              item={item}
              index={index}
              updateLessonStatus={updateLessonStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LessonPlanTableRow({
  item,
  index,
  updateLessonStatus,
}: {
  item: LessonRecord;
  index: number;
  updateLessonStatus: (vars: {
    id: string;
    status: "approved" | "rejected";
  }) => void;
}) {
  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_LESSON_PLAN_INFO(item._id)}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </Link>
      ),
      key: "0",
    },
  ];

  return (
    <tr
      className="items-start border-b border-border-colour-light bg-white last:border-0 hover:bg-neutral-300/40"
      key={item._id}
    >
      <TableCell content={index + 1} styles="text-center" />
      <TableCell content={item.subject} styles="whitespace-nowrap" />
      <TableCell content={item.title} styles="whitespace-nowrap" />
      <TableCell
        content={item.class?.map(c => c.name).join(", ") || "-"}
        styles="whitespace-nowrap"
      />
      <TableCell
        content={new Date(item.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        styles="whitespace-nowrap"
      />
      <TableCell
        content={
          <>
            {(!item.status || item.status === "pending") && (
              <div className="flex gap-1">
                <button
                  className="flex-1 rounded-lg bg-primary-purple-700 px-3 py-2 text-white"
                  onClick={() =>
                    updateLessonStatus({ id: item._id, status: "approved" })
                  }
                >
                  Approve
                </button>
                <button
                  className="flex-1 rounded-lg border border-secondary-red-600 px-3 py-2 text-secondary-red-600"
                  onClick={() =>
                    updateLessonStatus({ id: item._id, status: "rejected" })
                  }
                >
                  Reject
                </button>
              </div>
            )}
            {item.status === "approved" && (
              <span className="block w-full rounded-full bg-secondary-green-100 px-3 py-1.5 text-secondary-green-600">
                Approved
              </span>
            )}
            {item.status === "rejected" && (
              <span className="block w-full rounded-full bg-secondary-red-100 px-3 py-1.5 text-secondary-red-600">
                Rejected
              </span>
            )}
          </>
        }
        styles="whitespace-nowrap px-1"
        isCentered
      />

      <TableCell
        content={
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button
              aria-label={`Actions for ${item.title}`}
              className="rounded-lg p-2 hover:bg-neutral-300"
            >
              <Icon icon="ri:more-2-fill" />
            </button>
          </Dropdown>
        }
        styles="whitespace-nowrap"
      />
    </tr>
  );
}

function TableHeaders() {
  return (
    <thead className="sticky top-0 w-full border-b border-border-colour-light bg-neutral-300 text-xs normal-case text-Text-high-emphasis">
      <tr>
        <TableHeader text="S/N" styles="pl-6 pr-3" />
        <TableHeader text="Subject" />
        <TableHeader text="Title" />
        <TableHeader text="Class" />
        <TableHeader text="Date added" />
        <TableHeader text="Action" />
        <TableHeader text={<Icon icon="ion:filter" />} />
      </tr>
    </thead>
  );
}
