import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_CLASS } from "@/config/links";
import { classInfo } from "@/templates/Database/class/classInfo.data";
import {
  useClassStatistics,
  useFilterData,
} from "@/templates/Database/class/hooks";
import { ClassList } from "@/templates/Database/class/tab";
import Table from "@/templates/Database/class/table";

export default function Classes() {
  const initialState: { viewStudent: "all" | "junior" | "senior" } = {
    viewStudent: "all",
  };

  const [viewStudent, setViewStudent] = React.useState(
    initialState.viewStudent
  );
  const { filteredData } = useFilterData({
    data: classInfo,
    criteria: viewStudent,
  });

  const { totalNumberOfClassLevel, noOfSeniorClass, noOfJuniorClass } =
    useClassStatistics({
      data: classInfo,
    });

  const tabNumbers = {
    all: totalNumberOfClassLevel,
    junior: noOfJuniorClass,
    senior: noOfSeniorClass,
  };
  return (
    <Container headerTitle="Classes">
      <main className="px-10 py-5 h-full bg-white">
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
          currentCategory={viewStudent}
          setCurrentCategory={setViewStudent}
        />
        <Table data={filteredData} />
      </main>
    </Container>
  );
}
