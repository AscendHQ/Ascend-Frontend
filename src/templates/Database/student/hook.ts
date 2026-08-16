import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { axiosInstance } from "@/api";

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
const fetchStudent = (regNo: string) =>
  axiosInstance
    .get(`/students?registration_number=${regNo}`)
    .then(res => res.data);

export const useStudentData = (studentRegId: string) => {
  return useQuery({
    queryKey: ["currentStudentInfo", studentRegId],
    queryFn: () => fetchStudent(studentRegId),
    enabled: Boolean(studentRegId),
    placeholderData: { students: [] },
  });
};
