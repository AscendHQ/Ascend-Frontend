import { Icon } from "@iconify/react";
import React, { useEffect } from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_STUDENT } from "@/config/links";
import StatOverview from "@/templates/Database/stat-overview";
import TabNav from "@/templates/Database/tab-nav";
import StudentTable from "@/templates/Database/table";

export default function DatabaseStudents() {
  const [viewStudent, setviewStudent] = React.useState<
    "All" | "Female students" | "Male students"
  >("All");

  const studentDemographics: {
    name: "All" | "Male students" | "Female students";
    number: number;
  }[] = [
    { name: "All", number: 13010 },
    { name: "Male students", number: 4044 },
    { name: "Female students", number: 8966 },
  ];
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/Eniolayo/Nigeria-s-State-and-LGA/main/nigeria-state-and-lgas.json";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the JSON data
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching JSON:", error);
      });
  }, []);

  return (
    <Container headerTitle="Students">
      <div className="bg-white p-10">
        <StatOverview />
        <div className="relative">
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            isLink
            path={NEW_STUDENT}
          >
            Register student
          </DashboardButton>
        </div>

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
