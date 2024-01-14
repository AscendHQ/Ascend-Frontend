import { useFormContext } from "@/hooks/useFormContext";
import { SubjectRegister } from "@/pages/dashboard/database/subjects/register-subject";

// import { formattedDataArray } from "./data";
import SubjectInfoWrapper from "./subject-info-wrapper";
import { Student } from "./subject-types";

type StudentSelectionSectionProps = {
  setCurrentStudent: (data: Student & { currentClass: string }) => void;
  currentClass: string;
};

export default function StudentSelection({
  setCurrentStudent,
  currentClass,
}: StudentSelectionSectionProps) {
  const { students } = useFormContext(SubjectRegister);

  return (
    <SubjectInfoWrapper heading="Choose Student from provided class">
      <div className="bg-grey-300 w-full p-1 h-[250px] overflow-y-scroll cursor-pointer rounded">
        <main>
          {students[0].students.map(data => (
            <button
              key={data._id}
              className="grid w-full grid-cols-3 hover:bg-gray-300 px-2 py-1 rounded"
              onClick={() => setCurrentStudent({ ...data, currentClass })}
            >
              <span>{data.registration_number}</span>
              <p className="col-span-2">{`${data.first_name} ${data.last_name}`}</p>
            </button>
          ))}
        </main>
      </div>
    </SubjectInfoWrapper>
  );
}
