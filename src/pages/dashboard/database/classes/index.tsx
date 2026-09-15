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
import { NEW_CLASS } from "@/config/links";
import { useFilterData } from "@/templates/Database/class/hooks";
import { ClassList, LevelOptions } from "@/templates/Database/class/tab";
import Table from "@/templates/Database/class/table";

export const fetchAllClass = () =>
  axiosInstance.get("/classes").then(res => res.data);

export function useFetchClassInfo() {
  return useQuery({
    queryKey: ["allClass"],
    queryFn: fetchAllClass,
    enabled: true,
  });
}
export default function Classes() {
  const [currentStudentLevel, setCurrentStudentLevel] =
    React.useState<LevelOptions>("all");

  const classData = useFetchClassInfo();

  const { filteredData } = useFilterData({
    data: classData.data?.classes ?? [],
    criteria: currentStudentLevel,
  });

  const tabNumbers = {
    all: classData.data ? classData.data.classes.length : 0,
    junior: classData.data ? classData.data.total_junior_class : 0,
    senior: classData.data ? classData.data.total_senior_class : 0,
  };

  return (
    <Container headerTitle="Classes">
      <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        {classData.isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : classData.isError && isAccessDeniedError(classData.error) ? (
          <PermissionDeniedState message="You don't have permission to view classes." />
        ) : (classData.data?.classes.length ?? 0) <= 0 ? (
          <div className="rounded-lg border border-dashed border-border-colour-light bg-white py-16 text-center">
            <p className="text-Text-meduim-emphasis">No classes yet.</p>
            <DashboardButton
              variant="primary"
              isLink
              path={NEW_CLASS}
              leftElement={<Icon icon="tabler:plus" />}
            >
              Add Class
            </DashboardButton>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
                  Classes
                </h1>
                <p className="mt-1 text-sm text-Text-meduim-emphasis">
                  Organize class levels, sections, and assigned subjects.
                </p>
              </div>
              <DashboardButton
                variant="primary"
                isLink
                path={NEW_CLASS}
                leftElement={<Icon icon="tabler:plus" />}
              >
                Add Class
              </DashboardButton>
            </div>
            <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
              <ClassList
                tabNumbers={tabNumbers}
                currentCategory={currentStudentLevel}
                setCurrentCategory={setCurrentStudentLevel}
              />
              <Table data={filteredData} />
            </section>
          </>
        )}
      </main>
    </Container>
  );
}
