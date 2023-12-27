export type GenderOptions = keyof typeof studentGender;

export function StudentTabNav({
  tabNumbers,
  currentCategory,
  setCurrentCategory,
}: {
  tabNumbers: object;
  currentCategory: GenderOptions;
  setCurrentCategory: React.Dispatch<React.SetStateAction<GenderOptions>>;
}) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2">
      {studentGenderKeys.map(item => {
        const selectItem = item as GenderOptions;
        const selectedTabIndex =
          selectItem as unknown as keyof typeof tabNumbers;

        const selectedCategory = studentGender[selectItem];

        const isCurrentItem = selectItem === currentCategory;
        return (
          <li key={selectItem}>
            <button
              className={`px-3 py-2 ${
                isCurrentItem
                  ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                  : " text-gray-800"
              } font-medium tracking-tight`}
              onClick={() => setCurrentCategory(selectItem)}
            >
              {selectedCategory.name} ({tabNumbers[selectedTabIndex]})
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export const studentGender = {
  all: {
    name: "All",
    number: 0,
  },
  male: {
    name: "Male",
    number: 0,
  },
  female: {
    name: "Female",
    number: 0,
  },
};

const studentGenderKeys = Object.keys(studentGender);
