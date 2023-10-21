/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { teacherInfo } from "@/config/dummyInfo";
import { NEW_TEACHER_BIODATA } from "@/config/links";
import {
  Tab,
  Table,
  TeacherOptions,
} from "@/templates/Database/staff/components";
import {
  useFilterData,
  useStaffStatistics,
} from "@/templates/Database/staff/hooks";
import { StaffStatistics } from "@/templates/Database/staff/stats.staff";

export default function StaffDatabase() {
  const [currentStaffCategory, setCurrentStaffCategory] =
    React.useState<TeacherOptions>("all");

  const { filteredData } = useFilterData({
    data: teacherInfo,
    criteria: currentStaffCategory,
  });

  const {
    noOfTeachingStaff,
    noOfNoneTeachingStaff,
    noOfFullTimeStaff,
    noOfPartTimeStaff,
    totalNumberOfStaff,
  } = useStaffStatistics({
    data: teacherInfo,
  });

  const tabNumbers = {
    all: totalNumberOfStaff,
    teaching: noOfTeachingStaff,
    "non-teaching": noOfNoneTeachingStaff,
    permanent: noOfFullTimeStaff,
    "part-time": noOfPartTimeStaff,
  };

  return (
    <Container headerTitle="Staff">
      <main className="px-10 py-5 h-full bg-white">
        <StaffStatistics data={teacherInfo} />
        <div className="flex justify-between items-center ">
          <Tab
            tabNumbers={tabNumbers}
            currentCategory={currentStaffCategory}
            setCurrentCategory={setCurrentStaffCategory}
          />
          <div>
            <DashboardButton
              isLink
              path={NEW_TEACHER_BIODATA}
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
            >
              Add Staff
            </DashboardButton>
          </div>
        </div>

        <Table data={filteredData} />
      </main>
    </Container>
  );
}
