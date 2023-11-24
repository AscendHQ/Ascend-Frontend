import { useMemo } from "react";

import { subjectInfoProp } from "./subject-info";

export const useSubjectStatistics = ({ data }: { data: subjectInfoProp[] }) => {
  const totalNumberOfClassLevel = data.length;
  const juniorClass = data.filter(item => item.level === "Junior");
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
  data: subjectInfoProp[];
  criteria: "All" | "Junior" | "Senior";
}) => {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (criteria === "All") {
        return true;
      } else if (criteria === "Junior") {
        return item.level === "Junior";
      } else if (criteria === "Senior") {
        return item.level === "Senior";
      }
    });
  }, [data, criteria]);

  return {
    filteredData: filteredData.reverse(),
  };
};
