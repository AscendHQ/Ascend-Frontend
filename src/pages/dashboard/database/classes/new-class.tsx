import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { notification } from "antd";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_CLASS } from "@/config/links";
import ClassInformation from "@/templates/Database/class/add-class-information";
import {
  NewClassContextType,
  newClassSchema,
  NewClassSchemaType,
} from "@/types/form";

export const NewClassFormContext = React.createContext<
  NewClassContextType | undefined
>(undefined);

export default function NewClass() {
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const onSubmit = (data: object) => {
    console.log(data, "data");
    toast.open({
      message: (
        <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
      ),
      description: "New Teacher has been added successfully",
      duration: 3,
      className: "ant-toast",
    });
    toast.open({
      message: (
        <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
      ),
      description: "New Teacher has been added successfully",
      duration: 3,
      className: "ant-toast",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewClassSchemaType>({
    resolver: zodResolver(newClassSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <NewClassFormContext.Provider value={{ register, errors, watch }}>
      <Container headerTitle="New Class">
        <main className="px-10 py-5 bg-white h-full">
          <Link
            href={DASHBOARD_CLASS}
            className="flex items-center gap-3 text-sm"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </Link>
          <ClassInformation />

          <DashboardButton
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            className="text-base px-7"
          >
            <LoadingState label="Save Class" isSubmitting={isSubmitting} />
          </DashboardButton>
        </main>
      </Container>
      {contextHolder}
    </NewClassFormContext.Provider>
  );
}
