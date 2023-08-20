/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import Link from "next/link";
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

  const [showRegisterStudent, setShowRegisterStudent] = React.useState(false);

  const toggleRegisterStudent = () => {
    setShowRegisterStudent(prev => !prev);
  };
  return (
    <Container headerTitle="Students">
      <div className="bg-white p-10">
        <StatOverview />
        <div className="relative">
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            onClick={toggleRegisterStudent}
          >
            Register student
          </DashboardButton>
          {showRegisterStudent && (
            <ul className="absolute top-full right-0 shadow-md bg-white rounded p-3 z-50">
              <li>
                <button className="flex gap-1 hover:bg-primary-purple-100 w-full transition-all p-1 rounded-sm">
                  <Icon icon="bx:data" fontSize={25} />
                  <span>CSV Upload</span>
                </button>
              </li>
              <li>
                <Link
                  href={STUDENT_BIODATA}
                  className="flex gap-1 hover:bg-primary-purple-100 w-full transition-all p-1 rounded-sm"
                >
                  <Icon icon="grommet-icons:form-edit" fontSize={25} />
                  <span>Manual Upload</span>
                </Link>
              </li>
            </ul>
          )}
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
