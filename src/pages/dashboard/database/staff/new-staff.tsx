import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { notification } from "antd";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_TEACHER } from "@/config/links";
import useMutateNewStaff, {
  useFetchStaffNo,
} from "@/templates/Database/staff/components/add-new-staff.hook";
import OfficialInformation from "@/templates/Database/staff/components/official-information";
import PersonalInformation from "@/templates/Database/staff/components/personal-information";
import {
  NewStaffContextType,
  newStaffSchema,
  NewStaffSchemaType,
} from "@/types/form";

export const ReactHookForm = React.createContext<
  NewStaffContextType | undefined
>(undefined);

export default function NewStaff() {
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewStaffSchemaType>({
    resolver: zodResolver(newStaffSchema),
  });

  const { mutateNewStaff, isPendingAddNewStaff } = useMutateNewStaff(
    toast,
    reset
  );
  const staffNo = useFetchStaffNo();

  const onSubmit = (data: NewStaffSchemaType) => {
    const date = new Date();

    mutateNewStaff({
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
      staff_no: data.staff_no === "" ? staffNo.data : data.staff_no,
      status: data.status,
      type: data.type,
      exit_date: "",
      exit_reason: "",
    });
  };

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle="New Staff">
        {staffNo.isLoading ? (
          <Spinner />
        ) : (
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
                  isSubmitting={isPendingAddNewStaff}
                />
              </DashboardButton>
            </div>
          </main>
        )}
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
