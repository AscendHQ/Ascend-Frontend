import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { notification } from "antd";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_SUBJECT } from "@/config/links";
import useMutateNewSubject from "@/templates/Database/subject/add-new-subject.hook";
import AddSubjectInformation from "@/templates/Database/subject/add-subject-information";
import {
  NewSubjectContextType,
  newSubjectSchema,
  NewSubjectSchemaType,
} from "@/templates/Database/subject/subject-types";

import { useFetchClassInfo } from "../classes";

export const NewSubjectContext = React.createContext<
  NewSubjectContextType | undefined
>(undefined);

export default function NewSubject() {
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewSubjectSchemaType>({
    resolver: zodResolver(newSubjectSchema),
  });

  const classData = useFetchClassInfo();

  useEffect(() => {
    if (classData.status === "success") {
      setValue(
        "juniorClasses",
        classData?.data?.classes
          .filter((item: classType) => item.level === "junior")
          .map((label: classType) => ({
            label: label.name,
            class_id: label._id,
            checked: true,
          }))
      );
      setValue(
        "seniorClasses",
        classData?.data?.classes
          .filter((item: classType) => item.level !== "junior")
          .map((label: classType) => ({
            label: label.name,
            class_id: label._id,
            checked: true,
          }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData.status, classData.data]);

  const { fields: juniorFields } = useFieldArray({
    control,
    name: "juniorClasses",
  });

  const { fields: seniorFields } = useFieldArray({
    control,
    name: "seniorClasses",
  });

  const { mutateNewSubject, isPendingAddNewSubject } = useMutateNewSubject(
    toast,
    reset
  );

  const onSubmit = (data: NewSubjectSchemaType) => {
    mutateNewSubject(data);
  };

  return (
    <NewSubjectContext.Provider
      value={{ register, errors, watch, juniorFields, seniorFields }}
    >
      <Container headerTitle="New Subject">
        <main className="px-10 py-5 bg-white h-full">
          {classData.isLoading ? (
            <div className="min-h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <>
              <Link
                href={DASHBOARD_SUBJECT}
                className="flex items-center gap-3 text-sm"
              >
                <Icon icon="teenyicons:arrow-left-solid" />
                <span>Back</span>
              </Link>
              <AddSubjectInformation />
              <div className="ml-auto w-fit">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="text-white bg-primary-purple-700 rounded-lg py-3 px-6 font-semibold text-sm"
                >
                  <LoadingState
                    label="Save changes"
                    isSubmitting={isPendingAddNewSubject}
                  />
                </button>
              </div>
              {contextHolder}
            </>
          )}
        </main>
      </Container>
    </NewSubjectContext.Provider>
  );
}
type classType = {
  _id: string;
  is_active: boolean;
  level: "junior";
  name: string;
  organization: string;
  section: string;
  other_section: string;
};
