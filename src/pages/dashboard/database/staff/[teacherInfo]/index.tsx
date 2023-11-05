/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_TEACHER } from "@/config/links";
import EditOfficialInformation from "@/templates/Database/staff/components/edit-official-information";
import EditPersonalInformation from "@/templates/Database/staff/components/edit-personal-information";
import {
  EditStaffContextType,
  editStaffSchema,
  EditStaffSchemaType,
  UpdateStaffSchemaType,
} from "@/types/form";

export const ReactHookForm = React.createContext<
  EditStaffContextType | undefined
>(undefined);

export default function DatabaseTeacherBiodata() {
  const router = useRouter();
  const usernameStaffId = router.query.teacherInfo as string;
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const fetchStaffData = () =>
    axiosInstance
      .get(
        `/staffs/${(usernameStaffId as string)
          ?.split("-")
          .at(-1)
          ?.toUpperCase()}`
      )
      .then(res => {
        if (res.data === null) {
          queryClient.invalidateQueries({ queryKey: ["staff"] });
        }
        return res.data;
      });

  const staffData = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaffData,
    retry: true,
    retryDelay: 1000,
    enabled: !!usernameStaffId,
  });

  const staffDataFromBackend = staffData.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditStaffSchemaType>({
    resolver: zodResolver(editStaffSchema),
    values: {
      ...staffDataFromBackend,
      qualifications: staffDataFromBackend?.qualifications[0],
    },
  });

  const { mutate: updateStaffInfo, isPending: isPendingExistingStaff } =
    useMutation({
      mutationFn: (data: UpdateStaffSchemaType) => {
        return axiosInstance
          .put(
            `/staffs/${(usernameStaffId as string)
              ?.split("-")
              .at(-1)
              ?.toUpperCase()}`,
            data
          )
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "Staff has been update successfully",
          className: "ant-toast",
        });
      },
      onError: (error: Error & { response: { data: string } }) => {
        console.log(error, "onerror");
        api.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description: error.response.data,
          className: "ant-toast",
        });
      },
    });

  const onSubmit = (data: EditStaffSchemaType) => {
    const staffQualification = data?.qualifications ? data.qualifications : "";
    updateStaffInfo({ ...data, qualifications: [staffQualification] });
  };

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle={"Edit Staff"}>
        <>
          {staffData.isLoading && <Spinner />}
          {contextHolder}
          {staffData.data && (
            <div className="bg-white p-10 h-full">
              {contextHolder}
              <div className="flex justify-between">
                <div>
                  <h3 className="text-Text-high-emphasis text-xl font-semibold tracking-tight">
                    {staffData.data.surname} {staffData.data.other_names}
                  </h3>
                  <span className="text-sm text-gray-800 font-medium capitalize">
                    Staff ID: {(usernameStaffId as string)?.split("-").at(-1)}
                  </span>
                </div>
                <Link
                  href={DASHBOARD_TEACHER}
                  className="flex items-center gap-2 mb-10"
                >
                  <Icon icon="teenyicons:arrow-left-solid" />
                  Back
                </Link>
              </div>
              <main className="h-full border-t-2 border-border-colour-light mt-4 pt-8">
                <EditPersonalInformation />
                <EditOfficialInformation />
                <DashboardButton
                  variant="primary"
                  disabled={!isDirty}
                  onClick={handleSubmit(onSubmit)}
                  className="disabled:bg-primary-purple-400 disabled:cursor-not-allowed"
                >
                  <LoadingState
                    label="Save Changes"
                    isSubmitting={isPendingExistingStaff}
                  />
                </DashboardButton>
              </main>
            </div>
          )}
        </>
      </Container>
    </ReactHookForm.Provider>
  );
}
