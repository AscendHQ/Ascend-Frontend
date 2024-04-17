import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { ClassInfo } from "@/templates/Database/subject/subject-types";
import FilterStudentTab from "@/templates/Database/subject-registration/filter-student-tab";
import { useFilterData } from "@/templates/Database/subject-registration/hooks";
import RegisterStudentTable from "@/templates/Database/subject-registration/register-student-table";

import { useFetchClassInfo } from "./database/classes";

export type ClassInfoData = {
  classes: classInfoProp[];
};
export type registrationSubjectType = "pending" | "completed" | "all";
export default function RegisterStudent() {
  const [currentStudentStatusFilter, setCurrentStudentStatusFilter] =
    React.useState<registrationSubjectType>("all");
  const [currentClassId, setCurrentClassId] = React.useState("");
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);

  const classInfoQueryResult: UseQueryResult<ClassInfoData, Error> =
    useFetchClassInfo();
  const [api, contextHolder] = notification.useNotification();

  const toast = api;

  const fetchStudentsQuery: UseQueryResult<ClassInfo[], Error> = useQuery({
    queryKey: ["fetchStudents", currentClassId],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, currentClass] = queryKey;
      return axiosInstance
        .get(`/registrations?class_id=${currentClass}`)
        .then(res => res.data);
    },
    enabled: currentClassId !== "",
  });

  React.useEffect(() => {
    if (
      classInfoQueryResult.data.classes &&
      classInfoQueryResult.data.classes.length > 0
    ) {
      setCurrentClassId(classInfoQueryResult.data.classes[0]._id);
    }
  }, [classInfoQueryResult.data.classes]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = event.target.value;
    const selectedClass = classInfoQueryResult.data.classes.find(
      data => data._id === selectedClassId
    );
    if (selectedClass) {
      setCurrentClassId(selectedClass._id);
    }
  };

  const handleCheckboxChange = (subject: string): void => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(
        selectedSubjects.filter(selected => selected !== subject)
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  /* 
  
  */
  const { filteredData } = useFilterData({
    data: fetchStudentsQuery.isLoading ? [] : fetchStudentsQuery.data ?? [],
    criteria: currentStudentStatusFilter,
  });
  const tabNumbers = {
    all: fetchStudentsQuery.data
      ? fetchStudentsQuery.data[0].students.length
      : 0,
    completed: fetchStudentsQuery.data
      ? fetchStudentsQuery.data[0].students.filter(
          student => student.is_registered === true
        ).length
      : 0,
    pending: fetchStudentsQuery.data
      ? fetchStudentsQuery.data[0].students.filter(
          student => !student.is_registered
        ).length
      : 0,
  };

  return (
    <Container headerTitle="Subject Registration">
      {classInfoQueryResult.data.classes.length <= 0 ? (
        <div className="flex justify-center min-h-full items-center">
          <Spinner />
        </div>
      ) : (
        <main className="bg-white p-10 h-full">
          {contextHolder}
          <section className="flex justify-between items-start">
            <div>
              <dl className="space-y-2 p-2">
                <div className="flex gap-1">
                  <dt className="font-semibold">Session:</dt>
                  <dd>2023/2024</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="font-semibold">Term:</dt>
                  <dd>First Term</dd>
                </div>
              </dl>
            </div>
            <div className="space-y-3">
              <label htmlFor="classSelect" className="block font-semibold">
                Choose Class
              </label>
              <select
                id="classSelect"
                className="p-3 rounded bg-transparent min-w-[140px] border"
                onChange={handleClassChange}
              >
                {classInfoQueryResult.data.classes.map(data => (
                  <option value={data._id} key={data._id}>
                    {data.level === "junior"
                      ? `${data.name} - ${data.other_section}`
                      : `${data.name} - ${data.section}`}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <nav>
            <FilterStudentTab
              tabNumbers={tabNumbers}
              currentCategory={currentStudentStatusFilter}
              setCurrentCategory={setCurrentStudentStatusFilter}
            />
          </nav>
          <RegisterStudentTable
            data={filteredData}
            currentClassId={currentClassId}
            handleCheckboxChange={handleCheckboxChange}
            selectedSubjects={selectedSubjects}
            toast={toast}
            setSelectedSubjects={setSelectedSubjects}
            fetchStudentsQuery={fetchStudentsQuery}
          />
        </main>
      )}
    </Container>
  );
}
