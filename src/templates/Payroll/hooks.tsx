import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";

import { axiosInstance } from "@/api";
import { DASHBOARD_PAYROLL } from "@/config/links";

export type BreakdownType = "allowance" | "deduction";

export type PayrollBreakdownItem = {
  label: string;
  amount: number;
  type: BreakdownType;
};

export type GeneratePayrollPayload = {
  staff: string;
  staff_no: string;
  staff_name: string;
  job_title?: string;
  bank_name?: string;
  account_number?: string;
  academic_year: string;
  month: string;
  basic_salary: number;
  breakdown: PayrollBreakdownItem[];
};

export type PayrollRecord = GeneratePayrollPayload & {
  _id: string;
  total_allowances: number;
  total_deductions: number;
  net_pay: number;
  status: "pending" | "generated" | "paid";
  createdAt: string;
};

const fetchAllPayroll = () =>
  axiosInstance.get("/payrolls").then(res => res.data);

export const useAllPayroll = () => {
  return useQuery({
    queryKey: ["allPayroll"],
    queryFn: fetchAllPayroll,
  });
};

const fetchPayrollById = (id: string) =>
  axiosInstance.get(`/payrolls/${id}`).then(res => res.data);

export const usePayrollById = (id: string) => {
  return useQuery({
    queryKey: ["payrollInfo", id],
    queryFn: () => fetchPayrollById(id),
    enabled: Boolean(id),
  });
};

const fetchAllStaff = () =>
  axiosInstance.get("/staffs").then(res => res.data);

export const useAllStaffOptions = () => {
  return useQuery({
    queryKey: ["allStaffForPayroll"],
    queryFn: fetchAllStaff,
  });
};

export function useGeneratePayroll(toast: NotificationInstance) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: generatePayroll, isPending: isGeneratingPayroll } =
    useMutation({
      mutationFn: (data: GeneratePayrollPayload) => {
        return axiosInstance.post("/payrolls", data).then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">
              Success!
            </h3>
          ),
          description: "Payroll has been generated successfully",
          duration: 3,
          className: "ant-toast",
        });
        queryClient.invalidateQueries({ queryKey: ["allPayroll"] });
        router.push(DASHBOARD_PAYROLL);
      },
      onError: (error: Error & { response?: { data: string } }) => {
        toast.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description: error.response?.data ?? "Something went wrong",
          duration: 8,
          className: "ant-toast",
        });
      },
    });

  return { generatePayroll, isGeneratingPayroll };
}
