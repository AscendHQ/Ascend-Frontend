import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
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
    initialData: { classes: [] },
    enabled: true,
  });
}
export default function Classes() {
  const [currentStudentLevel, setCurrentStudentLevel] =
    React.useState<LevelOptions>("all");

  const classData = useFetchClassInfo();

  const { filteredData } = useFilterData({
    data: classData.isLoading ? [] : classData.data.classes,
    criteria: currentStudentLevel,
  });

  const tabNumbers = {
    all: classData.data ? classData.data.classes.length : 0,
    junior: classData.data ? classData.data.total_junior_class : 0,
    senior: classData.data ? classData.data.total_senior_class : 0,
  };

  return (
    <Container headerTitle="Classes">
      <main className="px-10 py-5 h-full bg-white">
        {classData.isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : classData.data.classes.length <= 0 ? (
          <div className="flex flex-col items-center gap-4 py-16">
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
            <div className="flex">
              <DashboardButton
                variant="primary"
                isLink
                path={NEW_CLASS}
                leftElement={<Icon icon="tabler:plus" />}
              >
                Add Class
              </DashboardButton>
            </div>
            <ClassList
              tabNumbers={tabNumbers}
              currentCategory={currentStudentLevel}
              setCurrentCategory={setCurrentStudentLevel}
            />
            <Table data={filteredData} />
          </>
        )}
      </main>
    </Container>
  );
}
