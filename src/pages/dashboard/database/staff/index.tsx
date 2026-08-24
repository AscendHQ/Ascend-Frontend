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
import { NEW_BULK_STAFF, NEW_TEACHER_BIODATA } from "@/config/links";
import {
  Tab,
  Table,
  TeacherOptions,
} from "@/templates/Database/staff/components";
import { useFilterData } from "@/templates/Database/staff/hooks";
import { StaffStatistics } from "@/templates/Database/staff/stats.staff";

export default function StaffDatabase() {
  const [currentStaffCategory, setCurrentStaffCategory] =
    React.useState<TeacherOptions>("all");

  const fetchAllStaff = () =>
    axiosInstance.get("/staffs").then(res => res.data);

  const staffData = useQuery({
    queryKey: ["allStaff"],
    queryFn: fetchAllStaff,
  });

  const { filteredData } = useFilterData({
    data: staffData.isLoading ? [] : staffData.data.staffs,
    criteria: currentStaffCategory,
  });

  const tabNumbers = {
    all: staffData.data ? staffData.data.staffs.length : 0,
    teaching: staffData.data ? staffData.data.teaching_staff_count : 0,
    "non-teaching": staffData.data
      ? staffData.data.none_teaching_staff_count
      : 0,
    permanent: staffData.data ? staffData.data.permanent_staff_count : 0,
    "part-time": staffData.data ? staffData.data.part_time_staff_count : 0,
  };
  const statisticsData = {
    noOfMaleStaff: staffData.data ? staffData.data.male_staff_count : 0,
    noOfFemaleStaff: staffData.data ? staffData.data.female_staff_count : 0,
    noOfAdventistStaff: staffData.data
      ? staffData.data.adventist_staff_count
      : 0,
    noOfNonAdventistStaff: staffData.data
      ? staffData.data.non_adventist_staff_count
      : 0,
    noOfIslamStaff: staffData.data ? staffData.data.islam_staff_count : 0,
  };

  return (
    <Container headerTitle="Staff">
      <main className="px-10 py-5 h-full bg-white">
        {staffData.isLoading ? (
          <Spinner />
        ) : staffData.isError && isAccessDeniedError(staffData.error) ? (
          <PermissionDeniedState message="You don't have permission to view staff." />
        ) : (
          <>
            <StaffStatistics data={statisticsData} />
            <div className="mt-10 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <Tab
                tabNumbers={tabNumbers}
                currentCategory={currentStaffCategory}
                setCurrentCategory={setCurrentStaffCategory}
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <DashboardButton
                  isLink
                  path={NEW_BULK_STAFF}
                  variant="secondary"
                  leftElement={<Icon icon="material-symbols:upload-file-outline" />}
                  className="mb-0"
                >
                  Import CSV
                </DashboardButton>
                <DashboardButton
                  isLink
                  path={NEW_TEACHER_BIODATA}
                  variant="primary"
                  leftElement={<Icon icon="tabler:plus" />}
                  className="mb-0"
                >
                  Add Staff
                </DashboardButton>
              </div>
            </div>
            <Table data={filteredData} />
          </>
        )}
      </main>
    </Container>
  );
}
