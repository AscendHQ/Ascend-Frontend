import { motion } from "framer-motion";
export type LevelOptions = keyof typeof subjectCategory;

export default function FilterStudentTab({
  tabNumbers,
  currentCategory,
  setCurrentCategory,
}: {
  tabNumbers: object;
  currentCategory: LevelOptions;
  setCurrentCategory: React.Dispatch<React.SetStateAction<LevelOptions>>;
}) {
  /* 
  
     <motion.li
                  className={`relative px-3 text-center rounded ${
                    each.label === currentStudentStatusFilter
                      ? "text-primary-purple-700"
                      : "text-gray-800"
                  }`}
                  key={each.label}
                >
                  {each.label === currentStudentStatusFilter && (
                    <motion.span
                      layoutId="active pill"
                      className={`absolute inset-0 rounded -z-0 ${
                        each.label === currentStudentStatusFilter
                          ? "bg-white shadow-[0px_2px_12px_0px_#18181B36]"
                          : ""
                      }`}
                    />
                  )}
                  <button
                    onClick={() =>
                      setCurrentStudentStatusFilter(
                        each.label as registrationSubjectType
                      )
                    }
                    className={`px-3 py-1 font-medium tracking-tight relative`}
                  >
                    {each.label} ({each.studentCount})
                  </button>
                </motion.li>
  
  */
  return (
    <ul className="flex w-fit items-center gap-1 rounded-lg border-1.5 border-border-colour-light bg-neutral-300 p-1">
      {classCategoryKeys.map(item => {
        const selectItem = item as LevelOptions;
        const selectedTabIndex =
          selectItem as unknown as keyof typeof tabNumbers;

        const selectedCategory = subjectCategory[selectItem];

        const isCurrentItem = selectItem === currentCategory;

        return (
          <motion.li
            key={selectItem}
            className={`${
              isCurrentItem
                ? "bg-white text-primary-purple-700 shadow-sm"
                : "text-gray-600"
            } whitespace-nowrap rounded-md font-medium tracking-tight`}
          >
            <button
              className="relative px-3 py-2 text-sm font-medium tracking-tight"
              onClick={() => setCurrentCategory(selectItem)}
            >
              {selectedCategory.name} ({tabNumbers[selectedTabIndex]})
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}

export const subjectCategory = {
  all: {
    name: "All",
    number: 0,
  },
  pending: {
    name: "Pending",
    number: 0,
  },
  completed: {
    name: "Completed",
    number: 0,
  },
};

const classCategoryKeys = Object.keys(subjectCategory);
