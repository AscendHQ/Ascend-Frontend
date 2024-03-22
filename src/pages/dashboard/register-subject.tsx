import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import { motion } from "framer-motion";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { ClassInfo } from "@/templates/Database/subject/subject-types";
import RegisterStudentTable from "@/templates/Database/subject-registration/register-student-table";

import { useFetchClassInfo } from "./database/classes";

export type ClassInfoData = {
  classes: classInfoProp[];
};

export default function RegisterStudent() {
  const [currentStudentStatusFilter, setCurrentStudentStatusFilter] =
    React.useState("All");
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
            <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded px-2 py-1 gap-2 mt-10 w-fit">
              {[
                { label: "All", studentCount: 3 },
                { label: "Pending", studentCount: 3 },
                { label: "Completed", studentCount: 3 },
              ].map(each => (
                <motion.li
                  className={`relative px-3 text-center rounded ${
                    each.label === currentStudentStatusFilter
                      ? "text-primary-purple-700"
                      : "text-gray-800"
                  }`}
                  key={each.label}
                >
                  {each.label === currentStudentStatusFilter && (
                    <motion.span
                      layoutId="active pill"
                      className={`absolute inset-0 rounded -z-0 ${
                        each.label === currentStudentStatusFilter
                          ? "bg-white shadow-[0px_2px_12px_0px_#18181B36]"
                          : ""
                      }`}
                    />
                  )}
                  <button
                    onClick={() => setCurrentStudentStatusFilter(each.label)}
                    className={`px-3 py-1 font-medium tracking-tight relative`}
                  >
                    {each.label} ({each.studentCount})
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <RegisterStudentTable
            data={fetchStudentsQuery.data}
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
