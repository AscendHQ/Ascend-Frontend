/* eslint-disable react/no-array-index-key */
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_CLASS } from "@/config/links";
import EditClassInformation from "@/templates/Database/class/edit-class-information";
import {
  ClassInfoContextType,
  classInfoSchema,
  ClassInfoSchemaType,
} from "@/types/form";

export const ReactHookForm = React.createContext<
  ClassInfoContextType | undefined
>(undefined);

export default function ClassInfo() {
  const router = useRouter();
  const id = router.query.classInfo as string;

  const onSubmit = (data: object) => {
    console.log(data, "data");

    router.push("/");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ClassInfoSchemaType>({
    resolver: zodResolver(classInfoSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle={id}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_CLASS}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <DashboardButton variant="primary" onClick={handleSubmit(onSubmit)}>
              <LoadingState label="Save changes" isSubmitting={isSubmitting} />
            </DashboardButton>
          </div>
          <EditClassInformation />
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}
