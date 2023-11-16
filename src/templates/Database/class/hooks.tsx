import { useMemo } from "react";

import { classInfoProp } from "./classInfo.data";
// import { classCategory } from "./tab";

export const useClassStatistics = ({ data }: { data: classInfoProp[] }) => {
  const totalNumberOfClassLevel = data.length;
  console.log(totalNumberOfClassLevel, "totalNumberOfClassLevel");

  //   classCategory.all?.number = totalNumberOfClassLevel;

  const juniorClass = data.filter(item => item.level === "jnr");
  const noOfJuniorClass = juniorClass.length;
  const noOfSeniorClass = totalNumberOfClassLevel - noOfJuniorClass;

  return {
    totalNumberOfClassLevel,
    noOfSeniorClass,
    noOfJuniorClass,
  };
};

export const useFilterData = ({
  data,
  criteria,
}: {
  data: classInfoProp[];
  criteria: "all" | "junior" | "senior";
}) => {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (criteria === "all") {
        return true;
      } else if (criteria === "junior") {
        return item.level === "jnr";
      } else if (criteria === "senior") {
        return item.level === "snr";
      }
    });
  }, [data, criteria]);

  return {
    filteredData: filteredData.reverse(),
  };
};
