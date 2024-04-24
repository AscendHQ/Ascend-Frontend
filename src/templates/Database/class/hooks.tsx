import { useMemo } from "react";

import { classInfoProp } from "./class-types";

export const useClassStatistics = ({ data }: { data: classInfoProp[] }) => {
  const totalNumberOfClassLevel = data.length;
  const juniorClass = data.filter(item => item.level === "junior");
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
        return item.level === "junior";
      } else if (criteria === "senior") {
        return item.level === "senior";
      }
    });
  }, [data, criteria]);
  return {
    filteredData: filteredData.reverse(),
  };
};
