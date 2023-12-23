import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Container } from "@/components/layout/dashboard";
import StudentSelection from "@/templates/Database/subject/student-selection";
import SubjectInfo from "@/templates/Database/subject/subject-info-section";
import SubjectInfoWrapper from "@/templates/Database/subject/subject-info-wrapper";

function SubjectRegistration() {
  const [currentStudent, setCurrentStudent] = useState({
    id: "",
    name: "",
    class: "",
  });
  const router = useRouter();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleCheckboxChange = (subject: string): void => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(
        selectedSubjects.filter(selected => selected !== subject)
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  return (
    <Container headerTitle="Subject Registration">
      <main className="px-10 py-5 bg-white">
        <button
          className="flex items-center gap-3 text-sm mb-10"
          onClick={() => router.back()}
        >
          <Icon icon="teenyicons:arrow-left-solid" />
          <span>Back</span>
        </button>
        <SubjectInfoWrapper heading="Select Class">
          <select name="" id="" className="w-full rounded">
            <option value="JSS1A">JSS1A</option>
            <option value="JSS1B">JSS1B</option>
            <option value="JSS2A">JSS2A</option>
            <option value="JSS2B">JSS2B</option>
            <option value="JSS3A">JSS3A</option>
          </select>
        </SubjectInfoWrapper>
        <StudentSelection setCurrentStudent={setCurrentStudent} />
        {currentStudent.name !== "" && (
          <SubjectInfo
            currentStudent={currentStudent}
            selectedSubjects={selectedSubjects}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
      </main>
    </Container>
  );
}

export default SubjectRegistration;
