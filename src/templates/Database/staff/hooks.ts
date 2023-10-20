import { useMemo } from "react";

import { staffCategory, TableData } from "./components";

export const useStaffStatistics = ({ data }: { data: TableData }) => {
  const totalNumberOfStaff = data.length;

  staffCategory.all.number = totalNumberOfStaff;

  const partTimeStaff = data.filter(item => item.type === "prt");
  const noOfPartTimeStaff = partTimeStaff.length;
  const noOfFullTimeStaff = totalNumberOfStaff - noOfPartTimeStaff;

  staffCategory["part-time"].number = noOfPartTimeStaff;
  staffCategory.permanent.number = noOfFullTimeStaff;

  const teachingStaff = data.filter(item => item.status === "t");
  const noOfTeachingStaff = teachingStaff.length;
  const noOfNoneTeachingStaff = totalNumberOfStaff - noOfTeachingStaff;

  const maleStaff = data.filter(item => item.sex === "m");
  const noOfMaleStaff = maleStaff.length;
  const noOfFemaleStaff = totalNumberOfStaff - noOfMaleStaff;

  const adventistStaff = data.filter(item => item.denomination === "a");
  const nonAdventistStaff = data.filter(item => item.denomination === "na");
  const islamStaff = data.filter(item => item.denomination === "i");

  const noOfAdventistStaff = adventistStaff.length;
  const noOfNonAdventistStaff = nonAdventistStaff.length;
  const noOfIslamStaff = islamStaff.length;

  staffCategory.teaching.number = noOfTeachingStaff;
  staffCategory["non-teaching"].number = noOfNoneTeachingStaff;

  return {
    totalNumberOfStaff,
    noOfMaleStaff,
    noOfFemaleStaff,
    noOfNoneTeachingStaff,
    noOfTeachingStaff,
    noOfFullTimeStaff,
    noOfPartTimeStaff,
    noOfNonAdventistStaff,
    noOfAdventistStaff,
    noOfIslamStaff,
  };
};

export const useFilterData = ({
  data,
  criteria,
}: {
  data: TableData;
  criteria: "all" | "part-time" | "permanent" | "teaching" | "non-teaching";
}) => {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (criteria === "all") {
        return true;
      } else if (criteria === "part-time") {
        return item.type === "prt";
      } else if (criteria === "permanent") {
        return item.type === "ft";
      } else if (criteria === "teaching") {
        return item.status === "t";
      } else if (criteria === "non-teaching") {
        return item.status === "nt";
      }
    });
  }, [data, criteria]);

  return {
    filteredData,
  };
};
