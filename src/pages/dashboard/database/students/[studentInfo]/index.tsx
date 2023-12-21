import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_STUDENT } from "@/config/links";
import {
  EditAcademicDetails,
  EditAdditionalInformation,
  EditContactInformation,
  EditGuardianInformation,
  EditHostelAccommodation,
  EditMedicalInformation,
  EditPersonalInformation,
} from "@/templates/Database/student";
import {
  StudentInfoContextType,
  studentInfoSchema,
  StudentInfoSchemaType,
} from "@/templates/Database/student/new-student-types";

export const StudentInfoContext = React.createContext<
  StudentInfoContextType | undefined
>(undefined);

export default function StudentInfo() {
  const router = useRouter();
  const studentRegId = router.query.studentInfo as string;
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
  } = useForm<StudentInfoSchemaType>({
    resolver: zodResolver(studentInfoSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <StudentInfoContext.Provider value={{ register, watch, errors }}>
      <Container headerTitle="Student">
        <div className="bg-white p-10">
          <BioUpdate regNo={studentRegId} />
          <EditPersonalInformation />
          <EditContactInformation />
          <EditGuardianInformation />
          <EditAcademicDetails />
          <EditHostelAccommodation />
          <EditMedicalInformation />
          <EditAdditionalInformation />
          <div className="flex justify-end gap-6">
            <DashboardButton
              variant="primary"
              className="font-semibold px-7 ml-0"
              onClick={handleSubmit(onSubmit)}
            >
              <LoadingState label="Update" isSubmitting={isSubmitting} />
            </DashboardButton>
          </div>
        </div>
      </Container>
    </StudentInfoContext.Provider>
  );
}

function BioUpdate({ regNo }: { regNo: string }) {
  return (
    <div className="flex gap-4 justify-between pb-7 mb-8 border-b-2 border-border-colour-light">
      <div>
        <h3 className="text-Text-high-emphasis text-2xl font-semibold tracking-tight">
          Babalola Philips
        </h3>
        <span className="text-base text-gray-800 font-medium">
          Registration Number:
          {typeof regNo === "string" ? regNo.replace(/-/g, "/") : null}
        </span>
      </div>
      <Link href={DASHBOARD_STUDENT} className="flex items-center gap-2">
        <Icon icon="teenyicons:arrow-left-solid" />
        Back to Students
      </Link>
    </div>
  );
}
