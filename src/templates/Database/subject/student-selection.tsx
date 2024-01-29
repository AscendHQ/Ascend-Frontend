import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

import { Spinner } from "@/components/ui/Loading";
import { useFormContext } from "@/hooks/useFormContext";
import { SubjectRegister } from "@/pages/dashboard/register-subject22";

// import { formattedDataArray } from "./data";
import SubjectInfoWrapper from "./subject-info-wrapper";
import { Student, SubjectRegisterContextType } from "./subject-types";

type setCurrentStudentType = (
  data: Student & {
    currentClass: string;
  }
) => void;

type StudentSelectionSectionProps = {
  setCurrentStudent: setCurrentStudentType;
  currentClass: string;
  loading: boolean;
  fetchStudentRegistrationQuery: UseQueryResult<unknown, Error>;
};

export default function StudentSelection({
  setCurrentStudent,
  currentClass,
  loading,
  fetchStudentRegistrationQuery,
}: StudentSelectionSectionProps) {
  const { students } = useFormContext(SubjectRegister);

  const renderStates = {
    loading: <LoadingComponent />,
    hasStudents: (
      <StudentListComponent
        students={students}
        setCurrentStudent={setCurrentStudent}
        currentClass={currentClass}
        fetchStudentRegistrationQuery={fetchStudentRegistrationQuery}
      />
    ),
    noStudents: <NoStudentFound />,
  };
  return (
    <SubjectInfoWrapper heading="Choose Student from provided class">
      <div className="border border-grey-300 w-full p-1 h-[250px] overflow-y-scroll cursor-pointer rounded">
        <main className="h-full">
          <>
            {
              renderStates[
                loading
                  ? "loading"
                  : students[0]?.students.length > 0
                  ? "hasStudents"
                  : "noStudents"
              ]
            }
          </>
        </main>
      </div>
    </SubjectInfoWrapper>
  );
}

const NoStudentFound = () => (
  <div className="flex items-center justify-center h-full">
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
  </div>
);

function StudentListComponent({
  students,
  setCurrentStudent,
  currentClass,
  fetchStudentRegistrationQuery,
}: {
  students: SubjectRegisterContextType["students"];
  setCurrentStudent: setCurrentStudentType;
  currentClass: string;
  fetchStudentRegistrationQuery: UseQueryResult<unknown, Error>;
}) {
  const newLocal = (data: Student) => {
    setCurrentStudent({ ...data, currentClass });
    fetchStudentRegistrationQuery.refetch();
  };
  return (
    <>
      {students[0].students.map(data => (
        <button
          key={data._id}
          className="grid w-full grid-cols-3 border-b border-grey-300 px-2 py-1"
          onClick={() => newLocal(data)}
        >
          <span>{data.registration_number}</span>
          <p className="col-span-2">{`${data.first_name} ${data.last_name}`}</p>
        </button>
      ))}
    </>
  );
}

const LoadingComponent = () => (
  <div className="flex justify-center items-center relative min-h-full">
    <Spinner />
  </div>
);
