import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
import { NEW_CLASS } from "@/config/links";
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

type RegistrationStateProps = {
  classInfoQueryResult: UseQueryResult<ClassInfoData, Error>;
  children: React.ReactNode;
};

function RegistrationState({
  classInfoQueryResult,
  children,
}: RegistrationStateProps) {
  if (classInfoQueryResult.isLoading) {
    return (
      <div className="flex justify-center min-h-full items-center">
        <Spinner />
      </div>
    );
  }

  if (
    classInfoQueryResult.isError &&
    isAccessDeniedError(classInfoQueryResult.error)
  ) {
    return (
      <PermissionDeniedState message="You don't have permission to register subjects." />
    );
  }

  if ((classInfoQueryResult.data?.classes.length ?? 0) === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 min-h-full">
        <p className="text-Text-meduim-emphasis">
          You need at least one class before you can register subjects.
        </p>
        <Link
          href={NEW_CLASS}
          className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm"
        >
          Add a class first
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

type StudentTableStateProps = {
  query: UseQueryResult<ClassInfo[], Error>;
  table: React.ReactNode;
};

function StudentTableState({ query, table }: StudentTableStateProps) {
  if (query.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="mt-10 rounded bg-grey-50 p-8 text-center text-secondary-red-600">
        Students could not be loaded for this class, session and term. Please
        try again.
      </div>
    );
  }

  return <>{table}</>;
}

const getClassLabel = (classInfo: classInfoProp) =>
  classInfo.level === "junior"
    ? `${classInfo.name} - ${classInfo.other_section}`
    : `${classInfo.name} - ${classInfo.section}`;

const getAcademicSessions = () => {
  const today = new Date();
  const startingYear =
    today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1;

  return Array.from({ length: 4 }, (_, index) => {
    const year = startingYear - index;
    return `${year}/${year + 1}`;
  });
};

export default function RegisterStudent() {
  const [currentStudentStatusFilter, setCurrentStudentStatusFilter] =
    React.useState<registrationSubjectType>("all");
  const [currentClassId, setCurrentClassId] = React.useState("");
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);
  const academicSessions = React.useMemo(getAcademicSessions, []);
  const [session, setSession] = React.useState(academicSessions[0]);
  const [term, setTerm] = React.useState("1st Term");

  const classInfoQueryResult: UseQueryResult<ClassInfoData, Error> =
    useFetchClassInfo();
  const [api, contextHolder] = notification.useNotification();

  const toast = api;

  const fetchStudentsQuery: UseQueryResult<ClassInfo[], Error> = useQuery({
    queryKey: ["fetchStudents", currentClassId, session, term],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, currentClass, currentSession, currentTerm] = queryKey;
      const params = new URLSearchParams({
        class_id: String(currentClass),
        session: String(currentSession),
        term: String(currentTerm),
      });
      return axiosInstance
        .get(`/registrations?${params.toString()}`)
        .then(res => res.data);
    },
    enabled: currentClassId !== "",
  });

  React.useEffect(() => {
    if (
      classInfoQueryResult.data?.classes &&
      classInfoQueryResult.data.classes.length > 0
    ) {
      setCurrentClassId(classInfoQueryResult.data.classes[0]._id);
    }
  }, [classInfoQueryResult.data?.classes]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = event.target.value;
    const selectedClass = classInfoQueryResult.data?.classes.find(
      data => data._id === selectedClassId
    );
    if (selectedClass) {
      setCurrentClassId(selectedClass._id);
      setSelectedSubjects([]);
      setCurrentStudentStatusFilter("all");
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
    all: fetchStudentsQuery.data?.[0]?.students.length ?? 0,
    completed: fetchStudentsQuery.data?.[0]
      ? fetchStudentsQuery.data[0].students.filter(
          student => student.is_registered === true
        ).length
      : 0,
    pending: fetchStudentsQuery.data?.[0]
      ? fetchStudentsQuery.data[0].students.filter(
          student => !student.is_registered
        ).length
      : 0,
  };

  return (
    <Container headerTitle="Subject Registration">
      <RegistrationState classInfoQueryResult={classInfoQueryResult}>
        <main className="bg-white p-10 h-full">
          {contextHolder}
          <section className="flex justify-between items-start">
            <div className="flex gap-3">
              <div>
                <label htmlFor="session" className="block font-semibold mb-1">
                  Session
                </label>
                <select
                  id="session"
                  value={session}
                  onChange={e => setSession(e.target.value)}
                  className="p-2 rounded bg-transparent min-w-[130px] border"
                >
                  {academicSessions.map(academicSession => (
                    <option value={academicSession} key={academicSession}>
                      {academicSession}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="term" className="block font-semibold mb-1">
                  Term
                </label>
                <select
                  id="term"
                  value={term}
                  onChange={e => setTerm(e.target.value)}
                  className="p-2 rounded bg-transparent min-w-[130px] border"
                >
                  <option value="1st Term">1st Term</option>
                  <option value="2nd Term">2nd Term</option>
                  <option value="3rd Term">3rd Term</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label htmlFor="classSelect" className="block font-semibold">
                Choose Class
              </label>
              <select
                id="classSelect"
                value={currentClassId}
                className="p-3 rounded bg-transparent min-w-[140px] border"
                onChange={handleClassChange}
              >
                {(classInfoQueryResult.data?.classes ?? []).map(data => (
                  <option value={data._id} key={data._id}>
                    {getClassLabel(data)}
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
          <StudentTableState
            query={fetchStudentsQuery}
            table={
              <RegisterStudentTable
                data={filteredData}
                currentClassId={currentClassId}
                session={session}
                term={term}
                handleCheckboxChange={handleCheckboxChange}
                selectedSubjects={selectedSubjects}
                toast={toast}
                setSelectedSubjects={setSelectedSubjects}
              />
            }
          />
        </main>
      </RegistrationState>
    </Container>
  );
}
