import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import React from "react";

import { axiosInstance } from "@/api";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";

import ViewDetailsModal from "../staff/components/view-details";
import SubjectInfoWrapper from "../subject/subject-info-wrapper";
import useMutateSubjectRegistration from "../subject/subject-registeration.hook";
import { ClassInfo, studentRegistrationType } from "../subject/subject-types";
import RegisterStudentTableHeader from "./register-student-table-header";
import RegisterStudentTableRow from "./register-student-table-row";

export default function RegisterStudentTable({
  data,
  currentClassId,
  toast,
  selectedSubjects,
  handleCheckboxChange,
  setSelectedSubjects,
  fetchStudentsQuery,
}: {
  data?: ClassInfo[];
  selectedSubjects: string[];
  currentClassId: string;
  toast: NotificationInstance;
  handleCheckboxChange: (subject: string) => void;
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  fetchStudentsQuery: UseQueryResult<ClassInfo[], Error>;
}) {
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);
  const [currentStudentId, setCurrentStudentId] = React.useState("");
  console.log(data, "datadatadatadata");

  const openDetailsModal = async (id: string) => {
    setCurrentStudentId(id);
    // TODO: Give user feedback
    console.log("Loading...");

    // if (fetchStudentRegistrationQuery.data) {
    //   setIsOpenDetails(true);
    // }
    // Fetch data if it's not available yet
    if (!fetchStudentRegistrationQuery.data) {
      try {
        await fetchStudentRegistrationQuery.refetch();
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
        return;
      }
    }

    // Now that data is available, open the modal
    setIsOpenDetails(true);
  };
  const closeDetailsModal = () => {
    fetchStudentsQuery.refetch();
    setIsOpenDetails(false);
    setSelectedSubjects([]);
  };

  const fetchStudentRegistrationQuery: UseQueryResult<
    studentRegistrationType,
    Error
  > = useQuery({
    queryKey: ["fetchStudentRegistration", currentStudentId, currentClassId],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, currentStudentId, currentClassId] = queryKey;

      return axiosInstance
        .get(`/registrations/${currentStudentId}?class_id=${currentClassId}`)
        .then(res => res.data);
    },
    enabled: currentStudentId !== "",
  });
  const currentStudentSubjects = fetchStudentRegistrationQuery.data?.subjects;

  const coreSubjects = currentStudentSubjects?.filter(
    item => item.type === "core"
  );
  const electiveSubjects = currentStudentSubjects?.filter(
    item => item.type === "elective"
  );

  const { isPendingAddSubjectRegistration, mutateSubjectRegistration } =
    useMutateSubjectRegistration(
      toast,
      currentClassId,
      currentStudentId,
      closeDetailsModal
    );

  const submitSubjectRegistration = () => {
    mutateSubjectRegistration({
      class_id: currentClassId,
      student: currentStudentId,
      additional_subjects: selectedSubjects,
    });
  };
  const NoStudentFound = () => (
    <tr className="absolute flex justify-center mt-20 items-center w-full h-full">
      <td>
        <div className="text-center">
          <div className="animate-bounce text-gray-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-16 w-16 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <p className="text-gray-600">No Student Found</p>
        </div>
      </td>
    </tr>
  );
  const RenderStudentRows = () => {
    if (!data) {
      return (
        <tr className="absolute flex justify-center mt-5 items-center w-full h-full">
          <td>
            <Spinner />
          </td>
        </tr>
      );
    }

    if (!data || data.length === 0) {
      return <NoStudentFound />;
    }
    if (data?.[0].students.length === 0) {
      return <NoStudentFound />;
    }
    return data?.[0].students.map(item => (
      <RegisterStudentTableRow
        item={item}
        key={item._id}
        className={data[0].name}
        registerModal={openDetailsModal}
      />
    ));
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <div className="relative h-[400px] overflow-y-auto">
        <table className={`w-full relative text-sm text-left  text-gray-500`}>
          <RegisterStudentTableHeader />
          <tbody>
            {/* {data ? (
              data[0].students.length > 0 ? (
                data[0].students.map((item, index) => (
                  <RegisterStudentTableRow
                    item={item}
                    key={item._id}
                    index={index}
                    className={data[0].name}
                    registerModal={openDetailsModal}
                  />
                ))
              ) : (
                <NoStudentFound />
              )
            ) : (
              <tr className="absolute flex justify-center mt-5 items-center w-full h-full">
                <td>
                  <Spinner />
                </td>
              </tr>
            )} */}
            <RenderStudentRows />
          </tbody>
        </table>
      </div>

      <ViewDetailsModal open={isOpenDetails} onClose={closeDetailsModal}>
        <div className="">
          <h3 className="text-center text-xl font-semibold">Choose Subjects</h3>
          <div className="overflow-y-auto h-[70vh]">
            {fetchStudentRegistrationQuery.data ? (
              <>
                <SubjectInfoWrapper heading="General Subjects">
                  <ul className="border border-grey-300 w-full p-3 h-[190px] overflow-y-scroll rounded">
                    {coreSubjects?.map(item => (
                      <li
                        className="block border-b border-grey-300 pb-1"
                        key={item._id}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </SubjectInfoWrapper>
                <SubjectInfoWrapper heading="Choose Additional Subjects">
                  <div className="bg-grey-300 w-full p-3 h-[190px] overflow-y-scroll rounded">
                    {electiveSubjects?.map(subject => (
                      <button
                        key={subject._id}
                        className="flex items-center"
                        onClick={() => handleCheckboxChange(subject._id)}
                      >
                        <input
                          type="checkbox"
                          id={subject._id}
                          checked={selectedSubjects.includes(subject._id)}
                          className="mr-3"
                          readOnly
                        />
                        <label
                          htmlFor={subject.name}
                          className="block cursor-pointer"
                        >
                          {subject.name}
                        </label>
                      </button>
                    ))}
                  </div>
                </SubjectInfoWrapper>
                <DashboardButton
                  variant="primary"
                  className="px-10"
                  onClick={submitSubjectRegistration}
                >
                  <LoadingState
                    label="Save"
                    isSubmitting={isPendingAddSubjectRegistration}
                  />
                </DashboardButton>
              </>
            ) : (
              <div className="flex justify-center min-h-full items-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </ViewDetailsModal>
    </div>
  );
}
