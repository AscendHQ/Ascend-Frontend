import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";
import React from "react";
import { UseFormReset } from "react-hook-form";

import { axiosInstance } from "@/api";
import { DASHBOARD_SUBJECT } from "@/config/links";

import { NewSubjectSchemaType } from "./subject-types";

const getCheckedClassIds = (classes: NewSubjectSchemaType["juniorClasses"]) => {
  return classes
    .filter(classItem => classItem.checked)
    .map(classItem => classItem.class_id);
};

function useMutateNewSubject(
  toast: NotificationInstance,
  reset: UseFormReset<NewSubjectSchemaType>
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateNewSubject, isPending: isPendingAddNewSubject } =
    useMutation({
      mutationFn: (data: NewSubjectSchemaType) => {
        const classes =
          data.level === "junior"
            ? getCheckedClassIds(data.juniorClasses)
            : getCheckedClassIds(data.seniorClasses);

        return axiosInstance
          .post("/subjects", {
            name: data.subject_name,
            code: data.subject_code,
            type: data.type as "elective" | "core",
            level: data.level as "senior" | "junior",
            classes,
          })
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "New Subject has been added successfully",
          duration: 3,
          className: "ant-toast",
        });
        queryClient.invalidateQueries({ queryKey: ["allSubject"] });
        router.push(DASHBOARD_SUBJECT);
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
        reset({});
      },
    });
  return { mutateNewSubject, isPendingAddNewSubject };
}

export default useMutateNewSubject;
