import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { FC } from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_STUDENT_INFO } from "@/config/links";
import { useFormContext } from "@/hooks/useFormContext";
import { AllStudentContext } from "@/pages/dashboard/database/students";
import { formatDateToYYYYMMDD } from "@/pages/dashboard/database/students/[studentInfo]";

import ViewDetailsModal from "../staff/components/view-details";
import { studentInfoProp } from "./student-info";
import TableHeaders from "./table-headers";

type currentDetailsViewT = "Biodata" | "Academic information";

function StudentsTable({
  data,
  isFetching,
}: {
  data: studentInfoProp[];
  isFetching: boolean;
}) {
  const { currentPage, limitOfStudent, setCurrentPage, totalNumberOfStudent } =
    useFormContext(AllStudentContext);
  const [isOpenDetails, setIsOpenDetails] = React.useState<boolean>(false);
  const [currentDetailsView, setCurrentDetailsView] =
    React.useState<currentDetailsViewT>("Biodata");

  const [modalDetails, setModalDetails] = React.useState<
    (studentInfoProp & { fullname: string }) | null
  >(null);

  const openDetailsModal = (item: studentInfoProp) => {
    setModalDetails({
      ...item,
      fullname: `${item.personal_information.first_name} ${item.personal_information.middle_name} ${item.personal_information.last_name}`,
    });
    setIsOpenDetails(true);
  };

  const closeDetailsModal = () => {
    setModalDetails(null);
    setIsOpenDetails(false);
  };
  const totalPages = Math.ceil(totalNumberOfStudent / limitOfStudent);

  const handlePageChange = (page: number) => {
    // invalidateAllStudentData();
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
      </table>

      <div className="relative h-[400px] overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            {isFetching && (
              <tr className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center text-black">
                <td>Loading...</td>
              </tr>
            )}
            {data.map(item => {
              const items: MenuProps["items"] = [
                {
                  label: (
                    <button
                      className="flex gap-2 w-full transition-all py-1 rounded-sm"
                      onClick={() => openDetailsModal(item)}
                    >
                      <Icon icon="ep:more" fontSize={20} />
                      <span className="text-sm">View details</span>
                    </button>
                  ),
                  key: "0",
                },
                {
                  label: (
                    <Link
                      href={DASHBOARD_STUDENT_INFO(item.registration_number)}
                      className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
                    >
                      <Icon icon="ep:edit" fontSize={20} />
                      <span className="text-sm">Edit details</span>
                    </Link>
                  ),
                  key: "1",
                },
              ];
              return (
                <tr
                  className="bg-white items-start border-grey-300 border-b"
                  key={item.registration_number}
                >
                  <TableCell
                    content={item.registration_number}
                    styles="uppercase"
                  />
                  <TableCell
                    content={`${item.personal_information.first_name} ${item.personal_information.last_name}`}
                  />
                  <TableCell
                    content={item.academic_details?.class?.name || "JSS 2"}
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
      </div>

      <ViewDetailsModal open={isOpenDetails} onClose={closeDetailsModal}>
        <div>
          <h2 className="font-bold text-center text-2xl mb-1">
            {modalDetails?.fullname}
          </h2>
          <p className="text-center mb-3">
            {modalDetails?.registration_number}
          </p>
          <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded px-2 py-1 gap-2 w-fit mx-auto">
            {["Biodata", "Academic information"].map(each => (
              <motion.li
                className={`relative px-3 text-center rounded ${
                  each === currentDetailsView
                    ? "text-primary-purple-700"
                    : "text-gray-800"
                }`}
                animate={
                  {
                    // If you need to animate other properties, add them here
                  }
                }
                transition={{ delay: 0.01, duration: 0.5 }}
                key={each}
              >
                {each === currentDetailsView && (
                  <motion.span
                    layoutId="active pill"
                    className={`absolute inset-0 rounded -z-0 ${
                      each === currentDetailsView
                        ? "bg-white shadow-[0px_2px_12px_0px_#18181B36]"
                        : ""
                    }`}
                  />
                )}
                <button
                  onClick={() =>
                    setCurrentDetailsView(each as currentDetailsViewT)
                  }
                  className={`px-3 py-1 font-medium tracking-tight relative`}
                >
                  {each}
                </button>
              </motion.li>
            ))}
          </ul>
          {currentDetailsView === "Biodata" ? (
            <div className="mt-2 overflow-y-auto h-[55vh]">
              {Object.entries(createDetailsObject(modalDetails)).map(
                ([key, value]) => {
                  if (value && value.trim() !== "") {
                    return (
                      <li
                        className="flex gap-2 py-3 odd:bg-grey-200 px-4"
                        key={key}
                      >
                        <p className="font-bold flex-1">{key}</p>
                        <p className="capitalize w-3/5">{value}</p>
                      </li>
                    );
                  }
                  return null; // Skip rendering if value is empty
                }
              )}
            </div>
          ) : (
            <div className="mt-2 overflow-y-auto h-[55vh]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut
              ullam culpa iste magni temporibus, doloremque minus sint ipsum,
              autem reiciendis fugit. Eos labore, reprehenderit mollitia vitae
              error ipsum eaque?
            </div>
          )}

          <Link
            href={DASHBOARD_STUDENT_INFO(
              modalDetails?.registration_number ?? ""
            )}
            className="flex gap-2 w-full transition-all justify-center mt-5 py-1 rounded-sm items-center"
          >
            <Icon icon="ep:edit" fontSize={20} />
            <span className="text-sm">Edit details</span>
          </Link>
        </div>
      </ViewDetailsModal>
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
    <div className="flex items-center justify-end m-4">
      {/* <div className="flex items-center absolute bottom-0 right-0 justify-end m-4"> */}
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

const createDetailsObject = (
  details: (studentInfoProp & { fullname: string }) | null
) => {
  if (!details) return {};

  return {
    "Full Name": details.fullname,
    "Registration Number": details.registration_number,
    Gender: details.personal_information?.gender,
    "Date of Birth": formatDateToYYYYMMDD(
      details.personal_information?.dob || ""
    ),
    "Contact Number": details.contact_information?.contact_number,
    "Residential Address": details.contact_information?.residential_address,
    Religion: details.personal_information?.religion,
    "Guardian's Name": `${details.guardian_information?.first_name} ${details.guardian_information?.last_name}`,
    "Guardian's Relationship":
      details.guardian_information?.relationship_with_student,
    "Guardian's Contact Number": details.guardian_information?.contact_number,
    "Guardian's Email Address": details.guardian_information?.email,
    Allergies: details.medical_information?.allergies,
    Medication: details.medical_information?.medication,
    "Medical Emergency Contact": details.medical_information?.emergency_contact,
    "Student Block": details.accommodation?.block,
    "Student Hostel": details.accommodation?.hostel,
    "Student Room": details.accommodation?.room,
    Disability: details.additional_information?.disabilities,
    "Nature of Disability":
      details.additional_information?.nature_of_disability,
  };
};
