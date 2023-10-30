/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { teacherInfo } from "@/config/dummyInfo";
import { NEW_TEACHER_BIODATA } from "@/config/links";
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
        <StaffStatistics data={statisticsData} />
        <div className="flex justify-between items-center mt-10">
          <Tab
            tabNumbers={tabNumbers}
            currentCategory={currentStaffCategory}
            setCurrentCategory={setCurrentStaffCategory}
          />
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
        {staffData.isLoading && <p>loading...</p>}
        <Table data={filteredData} />
      </main>
    </Container>
  );
}
/* 

 {
    name: "Name",
  },
  {
    name: "Staff Id",
  },
  {
    name: "Sex",
  },
  {
    name: "Status",
  },
  {
    name: "Type",
  },
{
            "_id": "6539813303513718f15f56e5",
            "organization": "653978e6277a07a04af91983",
            "staff_no": "S175649",
            "surname": "Dee",
            "other_names": "Tolu",
            "sex": "female",
            "status": "none_teaching",
            "type": "permanent",
            "denomination": "islam",
            "department": "agriculture",
            "qualifications": [
                "BSc. Copy Sciences"
            ],
            "post": "HOD",
            "address": "N5B/343, Street A1, Ifeoluwa, Akure Ibadan",
            "phone_number": "+2348142375116",
            "loan_received": 0,
            "loan_refunded": 0,
            "loan_debt": 0,
            "employment_date": "2023-01-25T00:00:00.000Z",
            "exit_date": null,
            "exit_reason": "",
            "createdAt": "2023-10-25T20:57:23.251Z",
            "updatedAt": "2023-10-25T20:57:23.251Z",
            "__v": 0
*/
