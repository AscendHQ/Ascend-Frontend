import React from "react";

import { Spinner } from "@/components/ui/Loading";
import { useFormContext } from "@/hooks/useFormContext";
import { AllStudentContext } from "@/pages/dashboard/database/students";

import StudentDetailsModal from "./student-details-modal";
import { studentInfoProp } from "./student-info";
import StudentPagination from "./student-pagination";
import StudentTableRow from "./student-table-row";
import TableHeaders from "./table-headers";

function StudentsTable({
  data,
  isFetching,
}: {
  data: studentInfoProp[];
  isFetching: boolean;
}) {
  const { currentPage, limitOfStudent, setCurrentPage, totalNumberOfStudent } =
    useFormContext(AllStudentContext);
  const [isDetailsModalOpen, setIsDetailsModalOpen] =
    React.useState<boolean>(false);
  const [selectedStudentDetails, setSelectedStudentDetails] = React.useState<
    (studentInfoProp & { fullname: string }) | null
  >(null);

  const openStudentDetailsModal = (item: studentInfoProp) => {
    setSelectedStudentDetails({
      ...item,
      fullname: `${item.personal_information.first_name} ${item.personal_information.middle_name} ${item.personal_information.last_name}`,
    });
    setIsDetailsModalOpen(true);
  };

  const closeStudentDetailsModal = () => {
    setSelectedStudentDetails(null);
    setIsDetailsModalOpen(false);
  };

  const totalPages = Math.ceil(totalNumberOfStudent / limitOfStudent);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-border-colour-light">
      <div className="relative max-h-[440px] overflow-auto">
        <table className="w-full min-w-[950px] text-left text-sm text-Text-meduim-emphasis">
          <TableHeaders />
          <tbody>
            {isFetching && (
              <tr className="absolute inset-0 flex h-[440px] items-center justify-center bg-white/70">
                <td>
                  <Spinner />
                </td>
              </tr>
            )}
            {data &&
              data.map(item => (
                <StudentTableRow
                  key={item.registration_number}
                  item={item}
                  openModal={openStudentDetailsModal}
                />
              ))}
            {!isFetching && (!data || data.length === 0) && (
              <tr>
                <td
                  colSpan={8}
                  className="p-10 text-center text-Text-meduim-emphasis"
                >
                  No students match the current search or status filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StudentDetailsModal
        open={isDetailsModalOpen}
        onClose={closeStudentDetailsModal}
        details={selectedStudentDetails}
      />

      <StudentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default StudentsTable;
