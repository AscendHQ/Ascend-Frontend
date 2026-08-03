/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_SUBJECT } from "@/config/links";
import EditSubjectInformation from "@/templates/Database/subject/edit-subject-information";
import {
  subjectInfoSchema,
  SubjectInfoSchemaType,
} from "@/templates/Database/subject/subject-types";

import { useFetchSubjectInfo } from ".";

type NewSubjectContextType = {
  register: UseFormRegister<SubjectInfoSchemaType>;
  errors: FieldErrors<SubjectInfoSchemaType>;
};

export const SubjectInfoContext = React.createContext<
  NewSubjectContextType | undefined
>(undefined);

export default function SubjectInfo() {
  const router = useRouter();
  const subjectInfoId = router.query.subjectInfo as string;
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const subjectData: UseQueryResult<SubjectsArray, Error> =
    useFetchSubjectInfo();

  const currentSubjectData = subjectData?.data?.subjects.find(
    item => item._id === subjectInfoId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInfoSchemaType>({
    resolver: zodResolver(subjectInfoSchema),
    values: {
      subject_code: currentSubjectData?.code || "",
      subject_name: currentSubjectData?.name || "",
      type: currentSubjectData?.type || "",
    },
  });

  const { mutate: updateSubjectInfo, isPending: isPendingExistingSubject } =
    useMutation({
      mutationFn: (data: SubjectInfoSchemaType) => {
        return axiosInstance
          .put(`/subjects/${subjectInfoId}`, {
            name: data.subject_name,
            code: data.subject_code,
            type: data.type as "elective" | "core",
          })
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "Subject has been updated successfully",
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

  const onSubmit = (data: SubjectInfoSchemaType) => {
    updateSubjectInfo(data);
  };

  return (
    <SubjectInfoContext.Provider value={{ register, errors }}>
      <Container headerTitle={"Edit Subject"}>
        {(subjectData.data?.subjects.length ?? 0) === 0 ? (
          <Spinner />
        ) : (
          <main className="bg-white px-10 pt-7 h-full">
            <div className="flex justify-between">
              <Link
                href={DASHBOARD_SUBJECT}
                className="flex items-center gap-3 text-sm"
              >
                <Icon icon="teenyicons:arrow-left-solid" />
                <span>Back</span>
              </Link>

              <div className="w-fit ml-auto">
                <DashboardButton
                  variant={"primary"}
                  onClick={handleSubmit(onSubmit)}
                >
                  <LoadingState
                    label="Save changes"
                    isSubmitting={isPendingExistingSubject}
                  />
                </DashboardButton>
              </div>
            </div>
            <EditSubjectInformation />
            {contextHolder}
          </main>
        )}
      </Container>
    </SubjectInfoContext.Provider>
  );
}
type ClassInfo = {
  _id: string;
  name: string;
};

type SubjectInfoType = {
  _id: string;
  organization: string;
  name: string;
  code: string;
  type: "core" | "elective";
  level: "junior" | "senior";
  classes: ClassInfo[];
};

// Type for the array of subjects
type SubjectsArray = {
  subjects: SubjectInfoType[];
};
