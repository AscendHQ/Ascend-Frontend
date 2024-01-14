import { DashboardButton } from "@/components/ui/button/button";

import { juniorSecondaryElectives, juniorSecondarySubjects } from "./data";
import SubjectInfoWrapper from "./subject-info-wrapper";
import { Student } from "./subject-types";

type SubjectInfoSectionProps = {
  currentStudent: Student & { currentClass: string };
  selectedSubjects: string[];
  handleCheckboxChange: (subject: string) => void;
};

export default function SubjectInfo({
  currentStudent,
  selectedSubjects,
  handleCheckboxChange,
}: SubjectInfoSectionProps) {
  return (
    <main>
      <div className="flex justify-between my-9">
        <span className="font-semibold text-lg">
          {currentStudent.registration_number}
        </span>
        <h3 className="font-bold text-2xl">{`${currentStudent.last_name} ${currentStudent.middle_name} ${currentStudent.first_name}`}</h3>
        <span className="font-semibold text-lg">
          {currentStudent.currentClass}
        </span>
      </div>
      <SubjectInfoWrapper heading="General Subjects">
        <div className="bg-grey-300 w-full p-3 h-[250px] overflow-y-scroll cursor-pointer rounded">
          {juniorSecondarySubjects.map(item => (
            <span className="block" key={item}>
              {item}
            </span>
          ))}
        </div>
      </SubjectInfoWrapper>
      <SubjectInfoWrapper heading="Choose Additional Subjects">
        <div className="bg-grey-300 w-full p-3 h-[250px] overflow-y-scroll rounded">
          {juniorSecondaryElectives.map(subject => (
            <div key={subject} className="flex items-center">
              <input
                type="checkbox"
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onChange={() => handleCheckboxChange(subject)}
                className="mr-3"
              />
              <label htmlFor={subject} className="block cursor-pointer">
                {subject}
              </label>
            </div>
          ))}
        </div>
      </SubjectInfoWrapper>
      <DashboardButton variant="primary" className="px-10">
        Save
      </DashboardButton>
    </main>
  );
}
