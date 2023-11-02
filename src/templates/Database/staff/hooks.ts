import { useMemo } from "react";

import { TableData } from "./components";

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
        return item.type === "part_time";
      } else if (criteria === "permanent") {
        return item.type === "permanent";
      } else if (criteria === "teaching") {
        return item.status === "teaching";
      } else if (criteria === "non-teaching") {
        return item.status === "none_teaching";
      }
    });
  }, [data, criteria]);

  return {
    filteredData: filteredData.reverse(),
  };
};

export type addStaffProp = {
  staff_no: string;
  surname: string;
  other_names: string;
  sex: string;
  status: string;
  type: string;
  denomination: string;
  department: string;
  qualifications: string[];
  post: string;
  address: string;
  phone_number: string;
  loan_received: number;
  loan_refunded: number;
  loan_debt: number;
  employment_date: string;
  exit_date: string;
  exit_reason: string;
};
