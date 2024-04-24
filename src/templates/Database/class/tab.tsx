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
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2">
      {classCategoryKeys.map(item => {
        const selectItem = item as LevelOptions;
        const selectedTabIndex =
          selectItem as unknown as keyof typeof tabNumbers;

        const selectedCategory = classCategory[selectItem];

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
