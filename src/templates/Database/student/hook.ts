import { useMemo } from "react";

import { studentInfoProp } from "./student-info";

export const useStudentStatistics = ({ data }: { data: studentInfoProp[] }) => {
  const totalNumberOfStudent = data.length;
  const femaleStudent = data.filter(item => item.gender === "female");
  const noOfFemaleStudent = femaleStudent.length;
  const noOfMaleStudent = totalNumberOfStudent - noOfFemaleStudent;

  return {
    totalNumberOfStudent,
    noOfMaleStudent,
    noOfFemaleStudent,
  };
};
export const useFilterData = ({
  data,
  criteria,
}: {
  data: studentInfoProp[];
  criteria: "all" | studentInfoProp["gender"];
}) => {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (criteria === "all") {
        return true;
      } else if (criteria === "female") {
        return item.gender === "female";
      } else if (criteria === "male") {
        return item.gender === "male";
      }
    });
  }, [data, criteria]);

  return {
    filteredData: filteredData.reverse(),
  };
};
