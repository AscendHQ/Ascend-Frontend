import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React, { FC, useState } from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_STUDENT_INFO } from "@/config/links";

import { studentInfoProp } from "./student-info";
import TableHeaders from "./table-headers";

function StudentsTable({ data }: { data: studentInfoProp[] }) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="relative overflow-x-auto min-h-[450px] shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {currentData.map(item => {
            const items: MenuProps["items"] = [
              {
                label: (
                  <Link
                    href={DASHBOARD_STUDENT_INFO(
                      "AHS-717-" + item.regNo.slice(0, 4)
                    )}
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
              <tr
                className="bg-white border-grey-300 border-b"
                key={item.regNo}
              >
                <TableCell
                  content={"AHS/717/" + item.regNo.slice(0, 4)}
                  styles="uppercase"
                />
                <TableCell content={item.studentName} />
                <TableCell content={item.class} />
                <TableCell content={item.gender} styles="capitalize" />
                <TableCell content={item.guardianInfo} />
                <TableCell
                  isCentered
                  content={
                    <button className="border-1.5 border-border-colour-light text-gray-800 font-medium rounded px-3 py-2">
                      Download
                    </button>
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
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={false}
      />
    </div>
  );
}
export default StudentsTable;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const [loading, setLoading] = useState(isLoading);
  const handlePageChange = async (page: number) => {
    setLoading(true);
    setTimeout(() => {
      onPageChange(page);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex items-center absolute bottom-0 right-0 justify-end m-4">
      <button
        className="bg-primary-purple-800 text-sm text-white font-semibold py-1 px-4 rounded-l"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        Previous
      </button>
      <span className="px-4 text-sm">
        {loading ? "Loading..." : `Page ${currentPage} of ${totalPages}`}
      </span>
      <button
        className="bg-primary-purple-800 text-sm text-white font-semibold py-1 px-4 rounded-r"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        Next
      </button>
    </div>
  );
};
