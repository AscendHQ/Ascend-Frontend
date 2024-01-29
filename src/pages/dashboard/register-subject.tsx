import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import { motion } from "framer-motion";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { ClassInfo } from "@/templates/Database/subject/subject-types";
import RegisterStudentTable from "@/templates/Database/subject-registration/register-student-table";

import { useFetchClassInfo } from "./database/classes";
import { ClassInfoData } from "./register-subject22";

export default function RegisterStudent() {
  const [currentDetailsView, setCurrentDetailsView] = React.useState("All");
  const [currentClassId, setCurrentClassId] = React.useState("");
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);

  const classData: UseQueryResult<ClassInfoData, Error> = useFetchClassInfo();
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
    // if (
    //   isInitialLoad &&
    //   classData.data.classes &&
    //   classData.data.classes.length > 0
    // ) {
    if (
      // isInitialLoad &&
      classData.data.classes &&
      classData.data.classes.length > 0
    ) {
      setCurrentClassId(classData.data.classes[0]._id);
      // setIsInitialLoad(false);
    }
  }, [classData.data.classes]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = event.target.value;
    const selectedClass = classData.data.classes.find(
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
      {classData.data.classes.length <= 0 ? (
        <div className="flex justify-center min-h-full items-center">
          <Spinner />
        </div>
      ) : (
        <main className="bg-white p-10 h-full">
          {contextHolder}
          <section className="flex justify-between items-center">
            <div>
              <dl className="flex border rounded gap-2 p-2">
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
            <select
              name=""
              id=""
              className="p-3 rounded bg-transparent min-w-[140px] border"
              onChange={handleClassChange}
            >
              {classData.data.classes.map(data => (
                <option value={data._id} key={data._id}>
                  {data.level === "junior"
                    ? `${data.name} - ${data.other_section}`
                    : `${data.name} - ${data.section}`}
                </option>
              ))}
            </select>
          </section>
          <nav>
            <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded px-2 py-1 gap-2 mt-10 w-fit">
              {["All", "Completed", "Pending"].map(each => (
                <motion.li
                  className={`relative px-3 text-center rounded ${
                    each === currentDetailsView
                      ? "text-primary-purple-700"
                      : "text-gray-800"
                  }`}
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
                    onClick={() => setCurrentDetailsView(each)}
                    className={`px-3 py-1 font-medium tracking-tight relative`}
                  >
                    {each}
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
          />
        </main>
      )}
    </Container>
  );
}
