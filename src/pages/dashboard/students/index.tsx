/* eslint-disable @typescript-eslint/no-unused-vars */

import { Icon } from "@iconify/react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { STUDENT_BIODATA_UPDATE } from "@/config/links";
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
        <div className="relative">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <DashboardButton
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
              onClick={e => e.preventDefault()}
            >
              Register student
            </DashboardButton>
          </Dropdown>
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

const items: MenuProps["items"] = [
  {
    label: (
      <button className="flex gap-1 w-full transition-all p-1 rounded-sm">
        <Icon icon="bx:data" fontSize={25} />
        <span>Bulk Upload</span>
      </button>
    ),
    key: "0",
  },
  {
    label: (
      <Link
        href={STUDENT_BIODATA_UPDATE}
        className="flex gap-1 w-full transition-all p-1 rounded-sm"
      >
        <Icon icon="grommet-icons:form-edit" fontSize={25} />
        <span>Single Upload</span>
      </Link>
    ),
    key: "1",
  },
];
