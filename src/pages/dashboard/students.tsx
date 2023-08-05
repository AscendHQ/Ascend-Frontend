/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
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
    <Container>
      <div className="bg-white p-10">
        <button className="flex items-center gap-3 text-sm">
          <Icon icon="teenyicons:arrow-left-solid" />
          <span>Back to dashboard</span>
        </button>
        <StatOverview />
        <button className="ml-auto flex gap-3 items-center bg-primary-purple-700 text-white px-4 py-3 rounded-lg">
          <Icon icon="tabler:plus" />
          <span>Register student</span>
        </button>
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
