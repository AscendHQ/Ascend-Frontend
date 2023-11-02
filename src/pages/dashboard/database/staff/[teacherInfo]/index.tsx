/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_TEACHER } from "@/config/links";
import EditOfficialInformation from "@/templates/Database/staff/components/edit-official-information";
import EditPersonalInformation from "@/templates/Database/staff/components/edit-personal-information";
import {
  EditStaffContextType,
  editStaffSchema,
  EditStaffSchemaType,
} from "@/types/form";

export const ReactHookForm = React.createContext<
  EditStaffContextType | undefined
>(undefined);

export default function DatabaseTeacherBiodata() {
  const router = useRouter();
  const usernameStaffId = router.query.teacherInfo as string;
  const initialValuesRef = React.useRef<EditStaffSchemaType | null>(null);
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();

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
        // console.log(res, "res.data");
        return res.data;
      });

  const staffData = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaffData,
    retry: true,
    retryDelay: 1000,
    enabled: !!usernameStaffId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<EditStaffSchemaType>({
    resolver: zodResolver(editStaffSchema),
  });

  React.useEffect(() => {
    if (staffData.data) {
      setValue("last_name", staffData.data.surname);
      setValue("first_name", staffData.data.other_names);
      setValue("job_title", staffData.data.post);
      setValue("home_address", staffData.data.address);
      setValue("denomination", staffData.data.denomination);
      setValue("phone_number", staffData.data.phone_number);
      setValue("sex", staffData.data.sex);
      setValue("status", staffData.data.status);
      setValue("type", staffData.data.type);
      setValue("department", staffData.data.department);
      setValue("educational_qualification", staffData.data.qualifications[0]);
      initialValuesRef.current = {
        last_name: staffData.data.surname,
        first_name: staffData.data.other_names,
        job_title: staffData.data.post,
        denomination: staffData.data.denomination,
        home_address: staffData.data.address,
        phone_number: staffData.data.phone_number,
        sex: staffData.data.sex,
        type: staffData.data.type,
        status: staffData.data.status,
        department: staffData.data.department,
        educational_qualification: staffData.data.qualifications[0],
      };
    }
  }, [staffData.data]);

  const { mutate: mutateExistingStaff, isPending: isPendingExistingStaff } =
    useMutation({
      mutationFn: data => {
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
        api.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "Staff has been update successfully",
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

  const onSubmit = (data: EditStaffSchemaType) => {
    const keyMapping = {
      ...staffDataFields,
      educational_qualification: "qualification",
    };
    const changedData = {} as any;
    const keys = Object.keys(data) as Array<keyof EditStaffSchemaType>;
    keys.forEach(key => {
      if (
        data.hasOwnProperty(key) &&
        initialValuesRef.current &&
        initialValuesRef.current[key] !== data[key]
      ) {
        if (key === "educational_qualification") {
          changedData[keyMapping[key]] = [data[key]];
          return;
        }
        const backendKey = keyMapping[key] || key;
        changedData[backendKey] = data[key];
      }
    });
    mutateExistingStaff(changedData);
  };

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle={"Edit Staff"}>
        <>
          {staffData.isLoading && (
            <div className="flex justify-center items-center min-h-full">
              <p>loading...</p>
            </div>
          )}
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

const staffDataFields = {
  last_name: "surname",
  first_name: "other_names",
  job_title: "post",
  home_address: "address",
  denomination: "denomination",
  phone_number: "phone_number",
  sex: "sex",
  status: "status",
  type: "type",
  department: "department",
} as const;
