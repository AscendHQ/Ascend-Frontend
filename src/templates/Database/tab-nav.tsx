type StudentDemographic = {
  name: "All" | "Male students" | "Female students";
  number: number;
};

type TabNavProps = {
  studentDemographics: StudentDemographic[];
  viewStudent: "All" | "Female students" | "Male students";
  setviewStudent: React.Dispatch<
    React.SetStateAction<"All" | "Female students" | "Male students">
  >;
};

const TabNav: React.FC<TabNavProps> = ({
  studentDemographics,
  viewStudent,
  setviewStudent,
}) => {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit mb-3 mt-6 border-border-colour-light rounded px-2 py-1 gap-2">
      {studentDemographics.map(each => (
        <li key={each.name}>
          <button
            className={`px-3 py-2 ${
              each.name === viewStudent
                ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                : " text-gray-800"
            } font-medium tracking-tight`}
            onClick={() => setviewStudent(each.name)}
          >
            {each.name} ({each.number.toLocaleString()})
          </button>
        </li>
      ))}
    </ul>
  );
};
export default TabNav;
