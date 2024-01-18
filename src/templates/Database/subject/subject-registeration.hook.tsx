import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";
import React from "react";

import { axiosInstance } from "@/api";
import { DASHBOARD_SUBJECT } from "@/config/links";

function useMutateSubjectRegistration(
  toast: NotificationInstance,
  class_id: string,
  student: string
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: mutateSubjectRegistration,
    isPending: isPendingAddSubjectRegistration,
  } = useMutation({
    mutationFn: ({
      student,
      class_id,
      additional_subjects,
    }: {
      student: string;
      class_id: string;
      additional_subjects: Array<string>;
    }) => {
      return axiosInstance
        .post("/registrations", {
          student,
          class_id,
          additional_subjects,
        })
        .then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
        ),
        description: "Subject registration done successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({
        queryKey: ["fetchStudentRegistration", student, class_id],
      });
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
  });
  return { mutateSubjectRegistration, isPendingAddSubjectRegistration };
}

export default useMutateSubjectRegistration;
