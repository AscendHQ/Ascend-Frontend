import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_STUDENT } from "@/config/links";
import {
  ContactInformation,
  GuardianInformation,
  PersonalInformation,
  StudentBiodataHeading,
} from "@/templates/Database/student";
import AcademicDetails from "@/templates/Database/student/academic-details";
import {
  NewStudentContextType,
  NewStudentSchema,
  NewStudentSchemaType,
} from "@/templates/Database/student/new-student-types";

export const NewStudentFormContext = React.createContext<
  NewStudentContextType | undefined
>(undefined);

export default function NewStudent() {
  const router = useRouter();

  const onSubmit = (data: object) => {
    console.log(data, "data");

    router.push(DASHBOARD_STUDENT);
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewStudentSchemaType>({
    resolver: zodResolver(NewStudentSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <NewStudentFormContext.Provider value={{ register, watch, errors }}>
      <div className="grid font-inter grid-cols-9 min-w-[900px]">
        <Sidebar />
        <div className="col-[3/-1] 3xl:col-[2/-1] bg-white">
          <DashboardHeader headerTitle="Student Biodata" />
          <main className="p-10">
            <Link href={DASHBOARD_STUDENT} className="flex items-center gap-2">
              <Icon icon="teenyicons:arrow-left-solid" />
              Back
            </Link>
            <StudentBiodataHeading />
            <PersonalInformation />
            <ContactInformation />
            <GuardianInformation />
            <AcademicDetails />
            <div className="flex justify-end gap-6">
              <DashboardButton
                variant="secondary"
                className="font-semibold px-7"
              >
                Cancel
              </DashboardButton>
              <DashboardButton
                variant="primary"
                className="font-semibold px-7 ml-0"
                onClick={handleSubmit(onSubmit)}
              >
                <LoadingState
                  label="Save and continue"
                  isSubmitting={isSubmitting}
                />
              </DashboardButton>
            </div>
          </main>
        </div>
      </div>
    </NewStudentFormContext.Provider>
  );
}
