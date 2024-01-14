import { Icon } from "@iconify/react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
  SubjectRegisterContextType,
} from "@/templates/Database/subject/subject-types";

import { useFetchClassInfo } from "../classes";

type ClassInfoData = {
  classes: classInfoProp[];
};

function SubjectRegistration() {
  const [currentClass, setCurrentClass] = useState("");

  const [currentStudent, setCurrentStudent] = useState<
    Student & { currentClass: string }
  >({
    _id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    registration_number: "",
    currentClass,
  });

  const router = useRouter();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

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
    queryKey: ["fetchStudents"],
    queryFn: () =>
      axiosInstance
        .get(`/registrations?class_name=${currentClass}`)
        .then(res => res.data),
    enabled: currentClass !== "",
  });

  useEffect(() => {
    if (currentClass !== "") {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass]);

  return (
    <SubjectRegister.Provider
      value={{ students: fetchStudentsQuery.data || [] }}
    >
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
              <select name="" id="" className="w-full rounded p-2">
                <option value="" className="capitalize">
                  Please choose an option
                </option>
                {classData.data.classes.map(data => (
                  <option
                    value={data._id}
                    key={data._id}
                    onClick={() => setCurrentClass(data.name)}
                  >
                    {data.level === "junior"
                      ? `${data.name} - ${data.other_section}`
                      : `${data.name} - ${data.section}`}
                  </option>
                ))}
              </select>
            </SubjectInfoWrapper>

            {fetchStudentsQuery.data && currentClass !== "" && (
              <StudentSelection
                setCurrentStudent={setCurrentStudent}
                currentClass={currentClass}
              />
            )}

            {fetchStudentsQuery.isLoading && currentClass !== "" && (
              <div className="flex justify-center items-center mt-4">
                <Spinner />
              </div>
            )}

            {currentStudent.first_name !== "" && (
              <SubjectInfo
                currentStudent={currentStudent}
                selectedSubjects={selectedSubjects}
                handleCheckboxChange={handleCheckboxChange}
              />
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
