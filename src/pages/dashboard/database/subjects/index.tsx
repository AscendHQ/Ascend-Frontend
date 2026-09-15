import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
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
  });
}

export default function Subjects() {
  const [currentSubjectLevel, setCurrentSubjectLevel] =
    React.useState<subjectLevelType>("all");

  const subjectData = useFetchSubjectInfo();

  const { filteredData } = useFilterData({
    data: subjectData.data?.subjects ?? [],
    criteria: currentSubjectLevel,
  });

  const tabNumbers = {
    all: subjectData.data ? subjectData.data.subjects.length : 0,
    junior: subjectData.data ? subjectData.data.total_junior_subject : 0,
    senior: subjectData.data ? subjectData.data.total_senior_subject : 0,
  };

  return (
    <Container headerTitle="Subjects">
      <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        {subjectData.isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : subjectData.isError && isAccessDeniedError(subjectData.error) ? (
          <PermissionDeniedState message="You don't have permission to view subjects." />
        ) : (subjectData.data?.subjects.length ?? 0) <= 0 ? (
          <div className="rounded-lg border border-dashed border-border-colour-light bg-white py-16 text-center">
            <p className="text-Text-meduim-emphasis">No subjects yet.</p>
            <DashboardButton
              isLink
              variant="primary"
              path={NEW_SUBJECT}
              leftElement={<Icon icon="tabler:plus" />}
            >
              Add Subject
            </DashboardButton>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
                  Subjects
                </h1>
                <p className="mt-1 text-sm text-Text-meduim-emphasis">
                  Manage the subjects available across junior and senior
                  classes.
                </p>
              </div>
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
            <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
              <SubjectLevel
                tabNumbers={tabNumbers}
                currentCategory={currentSubjectLevel}
                setCurrentCategory={setCurrentSubjectLevel}
              />
              <SubjectsTable data={filteredData} />
            </section>
          </>
        )}
      </main>
    </Container>
  );
}
