import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_CLASS } from "@/config/links";
import EditClassInformation from "@/templates/Database/class/edit-class-information";
import {
  ClassInfoContextType,
  classInfoSchema,
  ClassInfoSchemaType,
} from "@/types/form";

import { ClassInfoData } from "../subjects/register-subject";
import { useFetchClassInfo } from ".";

export const ReactHookForm = React.createContext<
  ClassInfoContextType | undefined
>(undefined);

export default function ClassInfo() {
  const router = useRouter();
  const classInfoId = router.query.classInfo as string;
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const classData: UseQueryResult<ClassInfoData, Error> = useFetchClassInfo();

  const currentClassData = classData?.data?.classes.find(
    item => item.name === classInfoId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassInfoSchemaType>({
    resolver: zodResolver(classInfoSchema),
    values: {
      class_name: currentClassData?.name || "",
      level: currentClassData?.level || "",
    },
  });

  const { mutate: updateClassInfo, isPending: isPendingExistingClass } =
    useMutation({
      mutationFn: (data: ClassInfoSchemaType) => {
        return axiosInstance
          .put(`/classes/${currentClassData?._id}/`, {
            name: data.class_name,
            level: data.level,
          })
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "Class has been updated successfully",
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

  const onSubmit = (data: ClassInfoSchemaType) => {
    updateClassInfo(data);
  };

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle={"Edit Class"}>
        {classData.data.classes.length === 0 ? (
          <Spinner />
        ) : (
          <main className="bg-white px-10 pt-7 h-full">
            <div className="flex justify-between">
              <Link
                href={DASHBOARD_CLASS}
                className="flex items-center gap-3 text-sm"
              >
                <Icon icon="teenyicons:arrow-left-solid" />
                <span>Back</span>
              </Link>
              <DashboardButton
                variant="primary"
                onClick={handleSubmit(onSubmit)}
              >
                <LoadingState
                  label="Save changes"
                  isSubmitting={isPendingExistingClass}
                />
              </DashboardButton>
            </div>
            <EditClassInformation />
            {contextHolder}
          </main>
        )}
      </Container>
    </ReactHookForm.Provider>
  );
}
