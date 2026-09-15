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
import useMutateNewClass from "@/templates/Database/class/add-new-class.hook";
import { addClassType, tagsType } from "@/templates/Database/class/class-types";
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

  const [tags, setTags] = React.useState<tagsType>({
    data: [],
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewClassSchemaType>({
    resolver: zodResolver(newClassSchema),
  });

  const { mutateNewClass, isPendingAddNewClass } = useMutateNewClass(
    toast,
    reset
  );

  const onSubmit = (data: addClassType) => {
    mutateNewClass({
      level: data.level,
      name: data.class_name,
      //  Junior section
      ...(data.level === "junior" && {
        other_section: tags.data.join(","),
      }),
      //  Senior section
      section:
        data.level !== "junior"
          ? data.radioButtonValue?.toLowerCase() || ""
          : "others",
    });
  };

  return (
    <NewClassFormContext.Provider
      value={{ register, errors, watch, tags, setTags }}
    >
      <Container headerTitle="New Class">
        <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <Link
            href={DASHBOARD_CLASS}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-purple-700"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </Link>
          <section className="mt-5 rounded-lg border border-border-colour-light bg-white p-5 sm:p-7">
            <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
              Add a class
            </h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Create a class level and its section.
            </p>
            <ClassInformation />

            <DashboardButton
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              className="text-base px-7"
            >
              <LoadingState
                label="Save Class"
                isSubmitting={isPendingAddNewClass}
              />
            </DashboardButton>
          </section>
        </main>
      </Container>
      {contextHolder}
    </NewClassFormContext.Provider>
  );
}
