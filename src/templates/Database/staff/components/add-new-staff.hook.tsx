import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";
import React from "react";
import { UseFormReset } from "react-hook-form";

import { axiosInstance } from "@/api";
import { DASHBOARD_TEACHER } from "@/config/links";
import { NewStaffSchemaType } from "@/types/form";

import { StaffProp } from "../hooks";

function useMutateNewStaff(
  toast: NotificationInstance,
  reset: UseFormReset<NewStaffSchemaType>
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateNewStaff, isPending: isPendingAddNewStaff } =
    useMutation({
      mutationFn: (data: NewStaffProp) => {
        return axiosInstance.post("/staffs", data).then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "New Teacher has been added successfully",
          duration: 3,
          className: "ant-toast",
        });
        queryClient.invalidateQueries({ queryKey: ["staffNo"] });
        router.push(DASHBOARD_TEACHER);
      },
      onError: (error: Error & { response: { data: string } }) => {
        toast.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description: error.response.data,
          duration: 8,
          className: "ant-toast",
        });
      },
      onSettled() {
        reset({
          first_name: "",
          last_name: "",
          sex: "",
          phone_number: "",
          home_address: "",
          job_title: "",
          department: "",
          educational_qualification: "",
          date_of_birth: "",
          denomination: "",
          status: "",
          type: "",
        });
      },
    });
  return { mutateNewStaff, isPendingAddNewStaff };
}

type NewStaffProp = Omit<
  StaffProp,
  "sex" | "denomination" | "status" | "type"
> & {
  sex: string;
  denomination: string;
  status: string;
  type: string;
};

export default useMutateNewStaff;

export function useFetchStaffNo() {
  const fetchNewStaffNo = () =>
    axiosInstance.get("/staffs/new_staff_no").then(res => res.data);

  return useQuery({
    queryKey: ["staffNo"],
    queryFn: fetchNewStaffNo,
  });
}
