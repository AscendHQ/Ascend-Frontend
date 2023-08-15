/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { STUDENT_BIODATA } from "@/config/links";
import StatOverview from "@/templates/Database/stat-overview";
import TabNav from "@/templates/Database/tab-nav";
import StudentTable from "@/templates/Database/table";

export default function DatabaseStudents() {
  const [viewStudent, setviewStudent] = React.useState<
    "All" | "Female students" | "Male students"
  >("All");

  const [studentDemographics, setstudentDemographics] = React.useState<
    {
      name: "All" | "Male students" | "Female students";
      number: number;
    }[]
  >([
    { name: "All", number: 13010 },
    { name: "Male students", number: 4044 },
    { name: "Female students", number: 8966 },
  ]);

  return (
    <Container headerTitle="Students">
      <div className="bg-white p-10">
        <StatOverview />
        <DashboardButton
          variant="primary"
          leftElement={<Icon icon="tabler:plus" />}
          isLink={true}
          path={STUDENT_BIODATA}
        >
          Register student
        </DashboardButton>
        <TabNav
          studentDemographics={studentDemographics}
          viewStudent={viewStudent}
          setviewStudent={setviewStudent}
        />
        <StudentTable />
      </div>
    </Container>
  );
}
