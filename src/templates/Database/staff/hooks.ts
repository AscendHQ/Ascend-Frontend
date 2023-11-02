import { useMemo } from "react";

import { statusOptions, typeOptions } from "./components/table-row";
import { denominationOptions, sexOptions } from "./stats.staff";

export const useFilterData = ({
  data,
  criteria,
}: {
  data: StaffProp[];
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
    filteredData,
  };
};

export type StaffProp = {
  staff_no: string;
  surname: string;
  other_names: string;
  sex: keyof typeof sexOptions;
  status: keyof typeof statusOptions;
  type: keyof typeof typeOptions;
  denomination: keyof typeof denominationOptions;
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
