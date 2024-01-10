import { useMemo } from "react";

import { subjectInfoProp, subjectLevelType } from "./subject-info";

export const useFilterData = ({
  data,
  criteria,
}: {
  data: subjectInfoProp[];
  criteria: subjectLevelType;
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
