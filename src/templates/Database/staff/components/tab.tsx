export type TeacherOptions = keyof typeof staffCategory;

export function Tab({
  tabNumbers,
  currentCategory,
  setCurrentCategory,
}: {
  tabNumbers: object;
  currentCategory: TeacherOptions;
  setCurrentCategory: React.Dispatch<React.SetStateAction<TeacherOptions>>;
}) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2">
      {staffCategoryKeys.map(item => {
        const selectItem = item as TeacherOptions;
        const selectedTabIndex =
          selectItem as unknown as keyof typeof tabNumbers;

        const selectedCategory = staffCategory[selectItem];

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

export const staffCategory = {
  all: {
    name: "All",
    number: 0,
  },
  teaching: {
    name: "Teaching",
    number: 0,
  },
  "non-teaching": {
    name: "Non Teaching",
    number: 0,
  },
  permanent: {
    name: "Permanent",
    number: 0,
  },
  "part-time": {
    name: "Part-Time",
    number: 0,
  },
};

const staffCategoryKeys = Object.keys(staffCategory);
