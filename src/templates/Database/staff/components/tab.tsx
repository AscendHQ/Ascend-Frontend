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
    <ul className="my-2 flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border-colour-light bg-neutral-300 p-1">
      {staffCategoryKeys.map(item => {
        const selectItem = item as TeacherOptions;
        const selectedTabIndex =
          selectItem as unknown as keyof typeof tabNumbers;

        const selectedCategory = staffCategory[selectItem];

        const isCurrentItem = selectItem === currentCategory;
        return (
          <li key={selectItem}>
            <button
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm ${
                isCurrentItem
                  ? "bg-white font-semibold text-primary-purple-700 shadow-sm"
                  : "font-medium text-Text-meduim-emphasis"
              } tracking-tight`}
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
