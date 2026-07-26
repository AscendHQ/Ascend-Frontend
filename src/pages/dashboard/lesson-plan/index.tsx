import { Icon } from "@iconify/react";
import { MenuProps, notification } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { TableCell, TableHeader } from "@/components/ui/table";
import {
  DASHBOARD_LESSON_PLAN_INFO,
  NEW_BULK_LESSON_PLAN,
  NEW_LESSON_PLAN,
} from "@/config/links";
import {
  LessonRecord,
  useAllLessons,
  useUpdateLessonStatus,
} from "@/templates/LessonPlan/hooks";

export default function LessonPlan() {
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading } = useAllLessons();
  const { updateLessonStatus } = useUpdateLessonStatus(api);

  const lessons = data?.lessons ?? [];

  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={NEW_BULK_LESSON_PLAN}
          className="flex gap-1 w-full transition-all py-1 rounded-sm"
        >
          <Icon icon="bx:data" fontSize={25} />
          <span>Bulk Upload</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          href={NEW_LESSON_PLAN}
          className="flex gap-1 w-full transition-all py-1 rounded-sm"
        >
          <Icon icon="grommet-icons:form-edit" fontSize={25} />
          <span>Single Upload</span>
        </Link>
      ),
      key: "1",
    },
  ];

  const approvedCount = lessons.filter(l => l.status === "approved").length;
  const rejectedCount = lessons.filter(l => l.status === "rejected").length;

  return (
    <Container headerTitle="Lesson Plan">
      <main className="px-10 py-5 bg-white relative">
        {contextHolder}
        <div className="flex">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <DashboardButton
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
              onClick={e => e.preventDefault()}
            >
              Add Lesson Plan
            </DashboardButton>
          </Dropdown>
        </div>
        <div className="flex justify-between mt-6">
          <h3 className="text-Text-high-emphasis font-semibold text-xl">
            All lesson plans
          </h3>
        </div>
        <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10 text-sm text-gray-800 font-medium tracking-tight">
          <li className="px-3 py-2">All ({lessons.length})</li>
          <li className="px-3 py-2">Approved ({approvedCount})</li>
          <li className="px-3 py-2">Rejected ({rejectedCount})</li>
        </ul>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : !lessons.length ? (
          <div className="flex flex-col items-center gap-2 py-16 text-Text-meduim-emphasis">
            <p>No lesson plans yet.</p>
            <p className="text-sm">
              Click &quot;Add Lesson Plan&quot; to create the first one.
            </p>
          </div>
        ) : (
          <Table lessons={lessons} updateLessonStatus={updateLessonStatus} />
        )}
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
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
    <tr className="bg-white items-start border-grey-300 border-b" key={item._id}>
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
                  className="bg-primary-purple-700 text-white flex-1 rounded-full px-3 py-2 "
                  onClick={() =>
                    updateLessonStatus({ id: item._id, status: "approved" })
                  }
                >
                  Approve
                </button>
                <button
                  className="bg-secondary-red-600 text-white flex-1 rounded-full px-3 py-2 "
                  onClick={() =>
                    updateLessonStatus({ id: item._id, status: "rejected" })
                  }
                >
                  Reject
                </button>
              </div>
            )}
            {item.status === "approved" && (
              <span className="bg-transparent border-Text-high-emphasis border block w-full rounded-full px-3 py-2 text-Text-meduim-emphasis">
                Approved
              </span>
            )}
            {item.status === "rejected" && (
              <span className="bg-transparent border border-red-700 block w-full rounded-full px-3 py-2 text-red-400">
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
            <button>
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
    <thead className="text-xs text-gray-700 sticky top-0 w-full normal-case border-b border-grey-300 bg-neutral-300">
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
