import { NotificationInstance } from "antd/es/notification/interface";

import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";

import { classInfoProp } from "../class/class-types";
import SubjectInfoWrapper from "./subject-info-wrapper";
import useMutateSubjectRegistration from "./subject-registeration.hook";
import { Student, studentRegistrationType } from "./subject-types";

type SubjectInfoSectionProps = {
  currentStudent: Student & { currentClass: string };
  selectedSubjects: string[];
  handleCheckboxChange: (subject: string) => void;
  currentStudentSubjects: studentRegistrationType["subjects"];
  currentClass: classInfoProp;
  toast: NotificationInstance;
};

export default function SubjectInfo({
  currentStudent,
  selectedSubjects,
  handleCheckboxChange,
  currentStudentSubjects,
  currentClass,
  toast,
}: SubjectInfoSectionProps) {
  const coreSubjects = currentStudentSubjects?.filter(
    item => item.type === "core"
  );
  const electiveSubjects = currentStudentSubjects?.filter(
    item => item.type === "elective"
  );

  const { isPendingAddSubjectRegistration, mutateSubjectRegistration } =
    useMutateSubjectRegistration(toast);

  const submitSubjectRegistration = () => {
    console.log(selectedSubjects, "selectedSubjects");
    mutateSubjectRegistration({
      class_id: currentClass._id,
      student: currentStudent._id,
      additional_subjects: selectedSubjects,
    });
  };

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
        <ul className="border border-grey-300 w-full p-3 h-[250px] overflow-y-scroll rounded">
          {coreSubjects.map(item => (
            <li className="block border-b border-grey-300 pb-1" key={item._id}>
              {item.name}
            </li>
          ))}
        </ul>
      </SubjectInfoWrapper>
      <SubjectInfoWrapper heading="Choose Additional Subjects">
        <div className="bg-grey-300 w-full p-3 h-[250px] overflow-y-scroll rounded">
          {electiveSubjects.map(subject => (
            <button
              key={subject._id}
              className="flex items-center"
              onClick={() => handleCheckboxChange(subject._id)}
            >
              <input
                type="checkbox"
                id={subject._id}
                checked={selectedSubjects.includes(subject._id)}
                className="mr-3"
                readOnly
              />
              <label htmlFor={subject.name} className="block cursor-pointer">
                {subject.name}
              </label>
            </button>
          ))}
        </div>
      </SubjectInfoWrapper>
      <DashboardButton
        variant="primary"
        className="px-10"
        onClick={submitSubjectRegistration}
      >
        <LoadingState
          label="Save"
          isSubmitting={isPendingAddSubjectRegistration}
        />
      </DashboardButton>
    </main>
  );
}
