import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";

export type DashboardOverview = {
  total_student: number;
  total_staff: number;
  gender_demographic: Record<string, string>;
};

const fetchDashboardOverview = () =>
  axiosInstance.get("/dashboard").then(res => res.data);

export const useDashboardOverview = () => {
  return useQuery<DashboardOverview>({
    queryKey: ["dashboardOverview"],
    queryFn: fetchDashboardOverview,
  });
};
