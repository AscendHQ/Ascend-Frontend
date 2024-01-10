import { useMemo } from "react";

import { studentInfoProp } from "./student-info";

export const useFilterData = ({
  data,
  criteria,
}: {
  data: studentInfoProp[];
  criteria: "all" | studentInfoProp["personal_information"]["gender"];
}) => {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (criteria === "all") {
        return true;
      } else if (criteria === "female") {
        return item.personal_information.gender === "female";
      } else if (criteria === "male") {
        return item.personal_information.gender === "male";
      }
    });
  }, [data, criteria]);

  return {
    filteredData: filteredData.reverse(),
  };
};
