import { useMutation } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";

import { axiosInstance } from "@/api";

export type NewSchoolPayload = {
  organization_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export function useCreateSchool(toast: NotificationInstance) {
  const { mutate: createSchool, isPending: isCreatingSchool } = useMutation({
    mutationFn: (data: NewSchoolPayload) => {
      return axiosInstance.post("/auth/signup", data).then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description:
          "School created. Share the email and password with their admin directly.",
        duration: 6,
        className: "ant-toast",
      });
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

  return { createSchool, isCreatingSchool };
}
