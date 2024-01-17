import { Icon } from "@iconify/react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/router";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import StudentSelection from "@/templates/Database/subject/student-selection";
import SubjectInfo from "@/templates/Database/subject/subject-info-section";
import SubjectInfoWrapper from "@/templates/Database/subject/subject-info-wrapper";
import {
  ClassInfo,
  Student,
  studentRegistrationType,
  SubjectRegisterContextType,
} from "@/templates/Database/subject/subject-types";

import { useFetchClassInfo } from "../classes";

type ClassInfoData = {
  classes: classInfoProp[];
};

function SubjectRegistration() {
  const [currentClass, setCurrentClass] = React.useState<classInfoProp>({
    _id: "",
    level: "junior",
    name: "",
    section: "",
    other_section: "",
  });

  const [currentStudent, setCurrentStudent] = React.useState<
    Student & { currentClass: string }
  >({
    _id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    registration_number: "",
    currentClass: currentClass.name,
  });

  const router = useRouter();

  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);

  const classData: UseQueryResult<ClassInfoData, Error> = useFetchClassInfo();

  const handleCheckboxChange = (subject: string): void => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(
        selectedSubjects.filter(selected => selected !== subject)
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const fetchStudentsQuery: UseQueryResult<ClassInfo[], Error> = useQuery({
    queryKey: ["fetchStudents", currentClass._id],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, currentClass] = queryKey;
      return axiosInstance
        .get(`/registrations?class_id=${currentClass}`)
        .then(res => res.data);
    },
    enabled: currentClass._id !== "",
  });
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const fetchStudentRegistrationQuery: UseQueryResult<
    studentRegistrationType,
    Error
  > = useQuery({
    queryKey: [
      "fetchStudentRegistration",
      currentStudent._id,
      currentClass._id,
    ],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, student_id, class_id] = queryKey;

      return axiosInstance
        .get(`/registrations/${student_id}?class_id=${class_id}`)
        .then(res => res.data);
    },
    enabled: currentStudent._id !== "",
  });

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = event.target.value;
    const selectedClass = classData.data.classes.find(
      data => data._id === selectedClassId
    );
    if (selectedClass) {
      setCurrentClass(selectedClass);
      fetchStudentsQuery.refetch();
      setCurrentStudent({
        _id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        registration_number: "",
        currentClass: "",
      });
    }
  };

  return (
    <SubjectRegister.Provider
      value={{ students: fetchStudentsQuery.data || [] }}
    >
      {contextHolder}
      <Container headerTitle="Subject Registration">
        {classData.isLoading ? (
          <div className="flex justify-center min-h-full items-center">
            <Spinner />
          </div>
        ) : (
          <main className="px-10 py-5 bg-white">
            <button
              className="flex items-center gap-3 text-sm mb-10"
              onClick={() => router.back()}
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </button>

            <SubjectInfoWrapper heading="Select Class">
              <select
                name=""
                id=""
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis p-2 text-Text-high-emphasis"
                onChange={handleClassChange}
              >
                <option value="" className="capitalize">
                  Please choose an option
                </option>
                {classData.data.classes.map(data => (
                  <option value={data._id} key={data._id}>
                    {data.level === "junior"
                      ? `${data.name} - ${data.other_section}`
                      : `${data.name} - ${data.section}`}
                  </option>
                ))}
              </select>
            </SubjectInfoWrapper>
            <StudentSelection
              setCurrentStudent={setCurrentStudent}
              currentClass={currentClass.name}
              loading={fetchStudentsQuery.isFetching}
              fetchStudentRegistrationQuery={fetchStudentRegistrationQuery}
            />
            {fetchStudentRegistrationQuery.isFetching ? (
              <div className="flex justify-center items-center relative min-h-[200px]">
                <Spinner />
              </div>
            ) : (
              fetchStudentRegistrationQuery.data && (
                <SubjectInfo
                  currentStudent={currentStudent}
                  selectedSubjects={selectedSubjects}
                  handleCheckboxChange={handleCheckboxChange}
                  currentStudentSubjects={
                    fetchStudentRegistrationQuery.data?.subjects
                  }
                  currentClass={currentClass}
                  toast={toast}
                />
              )
            )}
          </main>
        )}
      </Container>
    </SubjectRegister.Provider>
  );
}
export default SubjectRegistration;

export const SubjectRegister = React.createContext<
  SubjectRegisterContextType | undefined
>(undefined);
