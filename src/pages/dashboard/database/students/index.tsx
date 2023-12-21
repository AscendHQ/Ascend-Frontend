/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_STUDENT } from "@/config/links";
// import StatOverview from "@/templates/Database/stat-overview";
import {
  studentInfo,
  studentInfoProp,
  StudentsTable,
  StudentTabNav,
} from "@/templates/Database/student";
import {
  useFilterData,
  useStudentStatistics,
} from "@/templates/Database/student/hook";

export default function DatabaseStudents() {
  // useEffect(() => {
  //   const url =
  //     "https://raw.githubusercontent.com/Eniolayo/Nigeria-s-State-and-LGA/main/nigeria-state-and-lgas.json";

  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle the JSON data
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching JSON:", error);
  //     });
  // }, []);
  const [currentStudentGender, setCurrentStudentGender] = React.useState<
    "all" | studentInfoProp["gender"]
  >("all");

  const { filteredData } = useFilterData({
    data: studentInfo,
    criteria: currentStudentGender,
  });

  const { totalNumberOfStudent, noOfFemaleStudent, noOfMaleStudent } =
    useStudentStatistics({
      data: studentInfo,
    });

  const tabNumbers = {
    all: totalNumberOfStudent,
    male: noOfMaleStudent,
    female: noOfFemaleStudent,
  };
  return (
    <Container headerTitle="Students">
      <div className="bg-white p-10">
        {/* <StatOverview /> */}
        <div className="relative flex">
          <input
            type="search"
            placeholder="Search Student"
            className="rounded text-sm"
          />
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            isLink
            path={NEW_STUDENT}
          >
            Register student
          </DashboardButton>
        </div>

        {/* <StudentTabNav
          tabNumbers={tabNumbers}
          currentCategory={currentStudentGender}
          setCurrentCategory={setCurrentStudentGender}
        /> */}
        <StudentsTable data={filteredData} />
      </div>
    </Container>
  );
}
