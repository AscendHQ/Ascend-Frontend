/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
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

export const getStaticProps = async ({ params }: { params: any }) => {
  const queryClient = useQueryClient();
  const usernameStaffId = params.teacherInfo;

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
        console.log(res, "res.data");
        return res.data;
      });

  const staffData = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaffData,
    retry: true,
    retryDelay: 1000,
    enabled: !!usernameStaffId,
  });

  return { props: { staffData: staffData.data } };
};

export default function DatabaseTeacherBiodata({
  staffData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const usernameStaffId = router.query.teacherInfo as string;
  const initialValuesRef = React.useRef<EditStaffSchemaType | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<EditStaffSchemaType>({
    resolver: zodResolver(editStaffSchema),
  });
  console.log(staffData);

  React.useEffect(() => {
    if (staffData.data) {
      const fieldsToSet = {
        ...staffDataFields,
        educational_qualification: "qualifications[0]",
      };

      Object.entries(fieldsToSet).forEach(([field, key]) => {
        const formField = field as keyof EditStaffSchemaType;
        const dataKey = key;

        setValue(formField, staffData.data[dataKey]);

        if (initialValuesRef.current) {
          initialValuesRef.current[formField] = staffData.data[dataKey];
        }
      });
    }
  }, [staffData.data]);

  const onSubmit = (data: EditStaffSchemaType) => {
    console.log(data, "datauBAaHqHy");
    // type StaffDataFieldsTypes =
    //   (typeof staffDataFields)[keyof typeof staffDataFields];

    const keyMapping = {
      ...staffDataFields,
      educational_qualification: "qualifications",
    };

    const changedData = {};

    const keys = Object.keys(data) as Array<keyof EditStaffSchemaType>;
    keys.forEach(key => {
      if (
        data.hasOwnProperty(key) &&
        initialValuesRef.current &&
        initialValuesRef.current[key] !== data[key]
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const backendKey = keyMapping[key] || key;
        // changedData[backendKey] = data[key];
      }
    });

    console.log("Changed data:", changedData);
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
              <main className="h-full">
                <TeacherBiodata
                  isDirty={!isDirty}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                />
                <EditPersonalInformation />
                <EditOfficialInformation />
              </main>
            </div>
          )}
        </>
      </Container>
    </ReactHookForm.Provider>
  );
}
function TeacherBiodata({
  isDirty,
  handleSubmit,
  onSubmit,
}: {
  isDirty: boolean;
  handleSubmit: any;
  onSubmit: any;
}) {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Teacher Biodata
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your student biodata here
        </p>
      </div>
      <DashboardButton
        variant="primary"
        disabled={isDirty}
        onClick={handleSubmit(onSubmit)}
      >
        Save Changes
      </DashboardButton>
    </div>
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
