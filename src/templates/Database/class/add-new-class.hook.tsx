import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";
import React from "react";
import { UseFormReset } from "react-hook-form";

import { axiosInstance } from "@/api";
import { DASHBOARD_CLASS } from "@/config/links";
import { NewClassSchemaType } from "@/types/form";

import { classInfoProp } from "./class-types";

function useMutateNewClass(
  toast: NotificationInstance,
  reset: UseFormReset<NewClassSchemaType>
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateNewClass, isPending: isPendingAddNewClass } =
    useMutation({
      mutationFn: (data: Omit<classInfoProp, "_id">) => {
        return axiosInstance.post("/classes", data).then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "New Class has been added successfully",
          duration: 3,
          className: "ant-toast",
        });
        queryClient.invalidateQueries({ queryKey: ["allClass"] });
        router.push(DASHBOARD_CLASS);
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
          class_name: "",
          level: undefined,
          radioButtonValue: "",
        });
      },
    });
  return { mutateNewClass, isPendingAddNewClass };
}

export default useMutateNewClass;
