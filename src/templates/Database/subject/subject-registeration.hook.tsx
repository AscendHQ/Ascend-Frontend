import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import React from "react";

import { axiosInstance } from "@/api";

function useMutateSubjectRegistration(
  toast: NotificationInstance,
  class_id: string,
  student: string,
  closeDetailsModal: () => void
): {
  mutateSubjectRegistration: (data: {
    student: string;
    class_id: string;
    session: string;
    term: string;
    selected_subjects: Array<string>;
  }) => void;
  isPendingAddSubjectRegistration: boolean;
} {
  const queryClient = useQueryClient();

  const {
    mutate: mutateSubjectRegistration,
    isPending: isPendingAddSubjectRegistration,
  } = useMutation({
    mutationFn: ({
      student,
      class_id,
      session,
      term,
      selected_subjects,
    }: {
      student: string;
      class_id: string;
      session: string;
      term: string;
      selected_subjects: Array<string>;
    }) => {
      return axiosInstance
        .post("/registrations", {
          student,
          class_id,
          session,
          term,
          selected_subjects,
        })
        .then(res => res.data);
    },
    onSuccess: (_data, variables) => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
        ),
        description: "Subject registration done successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "fetchStudentRegistration",
          variables.student,
          variables.class_id,
          variables.session,
          variables.term,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "fetchStudents",
          variables.class_id,
          variables.session,
          variables.term,
        ],
      });
      closeDetailsModal();
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      toast.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
        ),
        description:
          error.response?.data ??
          "Subject registration could not be saved. Please try again.",
        duration: 8,
        className: "ant-toast",
      });
    },
  });
  return { mutateSubjectRegistration, isPendingAddSubjectRegistration };
}

export default useMutateSubjectRegistration;
