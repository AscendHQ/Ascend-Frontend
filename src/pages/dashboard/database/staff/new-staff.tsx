import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_TEACHER } from "@/config/links";
import OfficialInformation from "@/templates/Database/staff/components/official-information";
import PersonalInformation from "@/templates/Database/staff/components/personal-information";
import { addStaffProp } from "@/templates/Database/staff/hooks";
import { userInfoTypes } from "@/types";
import {
  NewStaffContextType,
  newStaffSchema,
  NewStaffSchemaType,
} from "@/types/form";
import { getSecureStorage } from "@/utils/cookieStorage";

export const ReactHookForm = React.createContext<
  NewStaffContextType | undefined
>(undefined);

export default function NewStaff() {
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState<userInfoTypes | null>(null);
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    setUserInfo(JSON.parse(getSecureStorage("userInfo")));
  }, []);

  const addNewStaffMutation = useMutation({
    mutationFn: (data: addStaffProp) => {
      return axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/staffs`, data, {
          headers: {
            "access-token": userInfo?.access_token,
          },
        })
        .then(res => res.data);
    },
    onSuccess: () => {
      api.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
        ),
        description: "New Teacher has been added successfully",
        duration: 3,
        className: "ant-toast",
      });
      router.push(DASHBOARD_TEACHER);
    },
    onError: (error: Error & { response: { data: string } }) => {
      console.log(error, "onerror");
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
        ),
        description: error.response.data,
        duration: 8,
        className: "ant-toast",
      });
    },
  });
  const fetchNewStaffNo = () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/staffs/new_staff_no`, {
        headers: {
          "access-token": userInfo?.access_token,
        },
      })
      .then(res => res.data);

  const staffNo = useQuery({
    queryKey: ["staffNo"],
    queryFn: fetchNewStaffNo,
    refetchInterval: 5000,
  });

  const onSubmit = (data: NewStaffSchemaType) => {
    const date = new Date();
    addNewStaffMutation.mutate({
      address: data.home_address,
      department: data.department,
      phone_number: data.phone_number,
      sex: data.sex,
      surname: data.last_name,
      other_names: data.first_name,
      qualifications: [data.educational_qualification],
      loan_received: 0,
      loan_refunded: 0,
      loan_debt: 0,
      post: data.job_title,
      employment_date: formatDate(date),
      denomination: data.denomination,
      staff_no: staffNo.data,
      status: data.status,
      type: data.type,
      exit_date: "",
      exit_reason: "",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NewStaffSchemaType>({
    resolver: zodResolver(newStaffSchema),
  });

  React.useEffect(() => {
    reset({
      first_name: "",
      last_name: "",
      sex: "",
      phone_number: "",
      home_address: "",
      job_title: "",
      department: "",
      date_of_birth: "",
      educational_qualification: "",
      denomination: "",
      status: "",
      type: "",
    });
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle="New Teacher">
        <main className="p-10 bg-white h-full">
          {contextHolder}
          <Link
            href={DASHBOARD_TEACHER}
            className="flex items-center gap-2 mb-10"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            Back
          </Link>
          <PersonalInformation staffNo={staffNo.data} />
          <OfficialInformation />
          <div className="flex justify-end gap-6">
            <DashboardButton
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              className="text-base px-7"
            >
              <LoadingState
                label="Submit"
                isSubmitting={addNewStaffMutation.isPending}
              />
            </DashboardButton>
          </div>
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}

function formatDate(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
