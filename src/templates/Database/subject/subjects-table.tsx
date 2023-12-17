import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_SUBJECT_INFO } from "@/config/links";
import truncateAndDisplay from "@/utils/truncateAndDisplay";

import { subjectInfoProp } from "./subject-info";
import TableHeaders from "./table-headers";

function SubjectsTable({ data }: { data: subjectInfoProp[] }) {
  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_SUBJECT_INFO("chemistry")}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <button className="flex gap-2 w-full transition-all py-1 rounded-sm">
          <Icon icon="solar:trash-bin-2-broken" fontSize={20} />
          <span className="text-sm">Remove</span>
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {data.map((item, index) => (
            <tr className="bg-white border-b " key={item.subjectName}>
              <TableCell content={index + 1} isCentered />
              <TableCell content={item.subjectName} />
              <TableCell content={item.subjectCode} />
              <TableCell content={truncateAndDisplay(item.classes, 3)} />
              <TableCell
                isCentered
                content={
                  item.level === "junior" ? (
                    <span
                      className={
                        "border-primary-purple-400 border rounded-lg px-3 py-2 text-primary-purple-700"
                      }
                    >
                      Junior
                    </span>
                  ) : (
                    <span className="bg-white border border-secondary-green-500 rounded-lg px-3 py-2 text-secondary-green-500">
                      Senior
                    </span>
                  )
                }
              />
              <TableCell
                content={
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <button>
                      <Icon icon="ri:more-2-fill" />
                    </button>
                  </Dropdown>
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SubjectsTable;
