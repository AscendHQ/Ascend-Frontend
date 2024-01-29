import React from "react";

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
    <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <div className="relative h-[400px] overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <TableHeaders />
          <tbody>
            {isFetching && (
              <tr className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center text-black">
                <td>Loading...</td>
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
