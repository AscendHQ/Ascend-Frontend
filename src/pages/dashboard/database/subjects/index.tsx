import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_SUBJECT } from "@/config/links";
import { SubjectsTable } from "@/templates/Database/subject";
import {
  useFilterData,
  useSubjectStatistics,
} from "@/templates/Database/subject/hooks";
import { subjectInfo } from "@/templates/Database/subject/subject-info";
import SubjectLevel from "@/templates/Database/subject/tab";

export default function Subjects() {
  const [currentSubjectLevel, setCurrentSubjectLevel] = React.useState<
    "all" | "junior" | "senior"
  >("all");
  const { filteredData } = useFilterData({
    data: subjectInfo,
    criteria: currentSubjectLevel,
  });

  const { totalNumberOfClassLevel, noOfSeniorClass, noOfJuniorClass } =
    useSubjectStatistics({
      data: subjectInfo,
    });

  const tabNumbers = {
    all: totalNumberOfClassLevel,
    junior: noOfJuniorClass,
    senior: noOfSeniorClass,
  };
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
        <SubjectLevel
          tabNumbers={tabNumbers}
          currentCategory={currentSubjectLevel}
          setCurrentCategory={setCurrentSubjectLevel}
        />
        <SubjectsTable data={filteredData} />
      </main>
    </Container>
  );
}
