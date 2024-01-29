import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { NEW_SUBJECT } from "@/config/links";
import { SubjectsTable } from "@/templates/Database/subject";
import { useFilterData } from "@/templates/Database/subject/hooks";
import { subjectLevelType } from "@/templates/Database/subject/subject-info";
import SubjectLevel from "@/templates/Database/subject/tab";

const fetchAllSubject = () =>
  axiosInstance.get("/subjects").then(res => res.data);

export function useFetchSubjectInfo() {
  return useQuery({
    queryKey: ["allSubject"],
    queryFn: fetchAllSubject,
    initialData: { subjects: [] },
  });
}

export default function Subjects() {
  const [currentSubjectLevel, setCurrentSubjectLevel] =
    React.useState<subjectLevelType>("all");

  const subjectData = useFetchSubjectInfo();

  const { filteredData } = useFilterData({
    data: subjectData.isLoading ? [] : subjectData.data.subjects,
    criteria: currentSubjectLevel,
  });

  const tabNumbers = {
    all: subjectData.data ? subjectData.data.subjects.length : 0,
    junior: subjectData.data ? subjectData.data.total_junior_subject : 0,
    senior: subjectData.data ? subjectData.data.total_senior_subject : 0,
  };

  return (
    <Container headerTitle="Subjects">
      <main className="px-10 py-5 h-full bg-white">
        {subjectData.isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex gap-2 justify-end">
              <DashboardButton
                isLink
                variant="primary"
                path={NEW_SUBJECT}
                leftElement={<Icon icon="tabler:plus" />}
                className="ml-0"
              >
                Add Subject
              </DashboardButton>
            </div>
            <SubjectLevel
              tabNumbers={tabNumbers}
              currentCategory={currentSubjectLevel}
              setCurrentCategory={setCurrentSubjectLevel}
            />
            <SubjectsTable data={filteredData} />
          </>
        )}
      </main>
    </Container>
  );
}
