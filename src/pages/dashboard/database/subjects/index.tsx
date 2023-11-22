/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_SUBJECT } from "@/config/links";
import Table from "@/templates/Database/subject/table";

const subjectTabs = Object.freeze({
  all: "All",
  active: "Active",
  inactive: "Inactive",
});
type SubjectTabs = keyof typeof subjectTabs;
type SubjectDemography = { name: SubjectTabs; number: number };

export default function Subjects() {
  const [currentTab, setCurrentTab] = React.useState<SubjectTabs>("all");

  const studentDemographics: SubjectDemography[] = [
    { name: "all", number: 80 },
    { name: "inactive", number: 1 },
    { name: "active", number: 79 },
  ];

  return (
    <Container headerTitle="Subjects">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <DashboardButton
            isLink
            variant="primary"
            path={NEW_SUBJECT}
            leftElement={<Icon icon="tabler:plus" />}
          >
            Add Subject
          </DashboardButton>
        </div>
        <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
          {studentDemographics.map(each => (
            <li key={each.name}>
              <button
                className={`px-3 py-2 ${
                  each.name === currentTab
                    ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                    : " text-gray-800"
                } font-medium tracking-tight`}
                onClick={() => setCurrentTab(each.name)}
              >
                {subjectTabs[each.name]} ({each.number.toLocaleString()})
              </button>
            </li>
          ))}
        </ul>
        <Table />
      </main>
    </Container>
  );
}
