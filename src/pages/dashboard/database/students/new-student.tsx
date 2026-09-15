import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { notification } from "antd";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_STUDENT } from "@/config/links";
import {
  AddAcademicDetails,
  AddAdditionalInformation,
  AddContactInformation,
  AddGuardianInformation,
  AddHostelAccommodation,
  AddMedicalInformation,
  AddPersonalInformation,
  // StudentBiodataHeading,
} from "@/templates/Database/student";
import useMutateNewStudent, {
  useFetchStateAndLGA,
} from "@/templates/Database/student/add-new-student.hook";
import {
  NewStudentContextType,
  NewStudentSchema,
  NewStudentSchemaType,
} from "@/templates/Database/student/student-types";

import { useFetchClassInfo } from "../classes";

export default function NewStudent() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewStudentSchemaType>({
    resolver: zodResolver(NewStudentSchema),
  });

  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const { isLoading }: { isLoading: boolean } = useFetchStateAndLGA();
  const classData = useFetchClassInfo();

  const { mutateNewStudent, isPendingAddNewStudent } = useMutateNewStudent(
    toast,
    reset
  );

  const onSubmit = (data: NewStudentSchemaType) => {
    mutateNewStudent(data);
  };

  return (
    <NewStudentFormContext.Provider
      value={{ register, watch, errors, classData: classData.data?.classes }}
    >
      <div className="dashboard-shell min-h-screen overflow-x-hidden font-inter lg:grid lg:grid-cols-9">
        <Sidebar />
        {isLoading || classData.isLoading ? (
          <div className="min-w-0 lg:col-[3/-1] 3xl:col-[2/-1]">
            <Spinner />
          </div>
        ) : (
          <div className="min-w-0 bg-neutral-300 lg:col-[3/-1] 3xl:col-[2/-1]">
            <DashboardHeader headerTitle="New Student" />
            <main className="px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
              <Link
                href={DASHBOARD_STUDENT}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-purple-700"
              >
                <Icon icon="teenyicons:arrow-left-solid" />
                Back
              </Link>
              <section className="mt-5 rounded-lg border border-border-colour-light bg-white p-5 sm:p-7">
                <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
                  Register a student
                </h1>
                <p className="mt-1 text-sm text-Text-meduim-emphasis">
                  Create the student's biodata, guardian, academic, and medical
                  record.
                </p>
                {/* <StudentBiodataHeading /> */}
                <AddPersonalInformation />
                <AddContactInformation />
                <AddGuardianInformation />
                <AddAcademicDetails />
                <AddHostelAccommodation />
                <AddMedicalInformation />
                <AddAdditionalInformation />
                <div className="flex justify-end gap-6">
                  <DashboardButton
                    variant="primary"
                    className="font-semibold px-7 ml-0"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <LoadingState
                      label="Submit"
                      isSubmitting={isPendingAddNewStudent}
                    />
                  </DashboardButton>
                </div>
              </section>
            </main>
          </div>
        )}
        {contextHolder}
      </div>
    </NewStudentFormContext.Provider>
  );
}

export const NewStudentFormContext = React.createContext<
  NewStudentContextType | undefined
>(undefined);
