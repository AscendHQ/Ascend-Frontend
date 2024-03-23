import { useMemo } from "react";

import { registrationSubjectType } from "@/pages/dashboard/register-subject";

import { ClassInfo } from "../subject/subject-types";

export const useFilterData = ({
  data,
  criteria,
}: {
  data: ClassInfo[];
  criteria: registrationSubjectType;
}) => {
  const filteredData = useMemo(() => {
    if (data.length === 0) {
      return data; // Return the original data if it's an empty array
    }

    const updatedData = [...data]; // Create a copy of the original data array

    // Update the students array in the first element of updatedData if it exists
    if (data[0]) {
      updatedData[0] = {
        ...data[0],
        students: data[0].students.filter(item => {
          if (criteria === "all") {
            return true;
          } else if (criteria === "pending") {
            return !item.is_registered;
          } else if (criteria === "completed") {
            return item.is_registered === true;
          }
          return false; // Add a default case to handle unexpected criteria values
        }),
      };
    }

    return updatedData;
  }, [data, criteria]);

  return {
    filteredData,
  };
};
