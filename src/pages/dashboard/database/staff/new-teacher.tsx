import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_TEACHER } from "@/config/links";
import OfficialInformation from "@/templates/Database/staff/components/official-information";
import PersonalInformation from "@/templates/Database/staff/components/personal-information";
import {
  NewTeacherBioDataContextType,
  newTeacherBioDataSchema,
  NewTeacherBioDataSchemaType,
} from "@/types/form";

export const ReactHookForm = React.createContext<
  NewTeacherBioDataContextType | undefined
>(undefined);

export default function NewTeacherBiodata() {
  const router = useRouter();

  const onSubmit = (data: NewTeacherBioDataSchemaType) => {
    console.log(data, "data");
    router.push(DASHBOARD_TEACHER);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewTeacherBioDataSchemaType>({
    resolver: zodResolver(newTeacherBioDataSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle="New Teacher">
        <main className="p-10 bg-white h-full">
          <Link
            href={DASHBOARD_TEACHER}
            className="flex items-center gap-2 mb-10"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            Back
          </Link>
          <PersonalInformation />
          <OfficialInformation />
          <div className="flex justify-end gap-6">
            <DashboardButton
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              className="text-base px-7"
            >
              <LoadingState label="Submit" isSubmitting={isSubmitting} />
            </DashboardButton>
          </div>
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}
