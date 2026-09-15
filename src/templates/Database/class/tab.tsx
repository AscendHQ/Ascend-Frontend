export type LevelOptions = keyof typeof classCategory;

export function ClassList({
  tabNumbers,
  currentCategory,
  setCurrentCategory,
}: {
  tabNumbers: object;
  currentCategory: LevelOptions;
  setCurrentCategory: React.Dispatch<React.SetStateAction<LevelOptions>>;
}) {
  return (
    <ul className="my-2 flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border-colour-light bg-neutral-300 p-1">
      {classCategoryKeys.map(item => {
        const selectItem = item as LevelOptions;
        const selectedTabIndex =
          selectItem as unknown as keyof typeof tabNumbers;

        const selectedCategory = classCategory[selectItem];

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

export const classCategory = {
  all: {
    name: "All",
    number: 0,
  },
  junior: {
    name: "Junior",
    number: 0,
  },
  senior: {
    name: "Senior",
    number: 0,
  },
};

const classCategoryKeys = Object.keys(classCategory);
