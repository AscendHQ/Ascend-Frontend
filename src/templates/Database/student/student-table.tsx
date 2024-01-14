import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React, { FC } from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_STUDENT_INFO } from "@/config/links";
import { useFormContext } from "@/hooks/useFormContext";
import { AllStudentContext } from "@/pages/dashboard/database/students";

import { studentInfoProp } from "./student-info";
import TableHeaders from "./table-headers";

function StudentsTable({ data }: { data: studentInfoProp[] }) {
  const { currentPage, limitOfStudent, setCurrentPage, totalNumberOfStudent } =
    useFormContext(AllStudentContext);

  const totalPages = Math.ceil(totalNumberOfStudent / limitOfStudent);

  const handlePageChange = (page: number) => {
    // invalidateAllStudentData();
    setCurrentPage(page);
  };

  return (
    <div className="relative overflow-x-auto min-h-[450px] pb-16 shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {data.map(item => {
            const items: MenuProps["items"] = [
              {
                label: (
                  <Link
                    href={DASHBOARD_STUDENT_INFO(
                      "AHS-717-" + item.registration_number.slice(0, 4)
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
                key={item.registration_number}
              >
                <TableCell
                  content={"AHS/717/" + item.registration_number.slice(0, 4)}
                  styles="uppercase"
                />
                <TableCell
                  content={`${item.personal_information.first_name} ${item.personal_information.last_name}`}
                />
                <TableCell
                  content={item.academic_details?.class?.name || "JSS2"}
                />
                <TableCell
                  content={item.personal_information.gender}
                  styles="capitalize"
                />
                <TableCell
                  content={`${item.guardian_information.first_name} ${item.guardian_information.last_name}`}
                />
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

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = async (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center absolute bottom-0 right-0 justify-end m-4">
      <button
        className={`${
          currentPage === 1 ? "bg-primary-purple-300" : "bg-primary-purple-800"
        } text-sm text-white font-semibold py-1 px-4 rounded-l`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 text-sm">
        {`Page ${currentPage} of ${totalPages}`}
      </span>
      <button
        className={`${
          currentPage === totalPages
            ? "bg-primary-purple-300"
            : "bg-primary-purple-800"
        } text-sm text-white font-semibold py-1 px-4 rounded-r`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
