import { formattedDataArray } from "./data";
import SubjectInfoWrapper from "./subject-info-wrapper";

type StudentSelectionSectionProps = {
  setCurrentStudent: (data: {
    id: string;
    name: string;
    class: string;
  }) => void;
};

export default function StudentSelection({
  setCurrentStudent,
}: StudentSelectionSectionProps) {
  return (
    <SubjectInfoWrapper heading="Choose Student from provided class">
      <div className="bg-grey-300 w-full p-1 h-[250px] overflow-y-scroll cursor-pointer rounded">
        <main>
          {formattedDataArray.map(data => (
            <button
              key={data.id}
              className="grid w-full grid-cols-3 hover:bg-gray-300 px-2 py-1 rounded"
              onClick={() => setCurrentStudent(data)}
            >
              <span>{data.id}</span>
              <p className="col-span-2">{data.name}</p>
            </button>
          ))}
        </main>
      </div>
    </SubjectInfoWrapper>
  );
}
