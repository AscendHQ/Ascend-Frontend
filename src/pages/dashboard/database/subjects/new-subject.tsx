import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_SUBJECT } from "@/config/links";
import AddSubjectInformation from "@/templates/Database/subject/add-subject-information";
import {
  NewSubjectContextType,
  newSubjectSchema,
  NewSubjectSchemaType,
} from "@/templates/Database/subject/subject-types";

export const NewSubjectContext = React.createContext<
  NewSubjectContextType | undefined
>(undefined);

export default function NewSubject() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [submitInfo, setSubmitInfo] = React.useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data: object) => {
    console.log(data, "data");
    setSubmitInfo(JSON.stringify(data));
    openModal();
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewSubjectSchemaType>({
    resolver: zodResolver(newSubjectSchema),
    defaultValues: {
      juniorClasses: juniorClassOptions.map(label => ({
        label,
        checked: true,
      })),
      seniorClasses: seniorClassOptions.flatMap(({ division, classes }) =>
        classes.map(label => ({
          label: `${division} - ${label}`,
          checked: false,
        }))
      ),
    },
  });

  const { fields: juniorFields } = useFieldArray({
    control,
    name: "juniorClasses",
  });

  const { fields: seniorFields } = useFieldArray({
    control,
    name: "seniorClasses",
  });

  return (
    <NewSubjectContext.Provider
      value={{ register, errors, watch, juniorFields, seniorFields }}
    >
      <Container headerTitle="New Subject">
        <main className="px-10 py-5 bg-white h-full">
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
              <LoadingState label="Save changes" isSubmitting={isSubmitting} />
            </button>
          </div>
          <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
            {submitInfo}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              atque minima tempora molestias similique distinctio, ducimus cum
              quod praesentium ipsum.
            </p>
          </Modal>
        </main>
      </Container>
    </NewSubjectContext.Provider>
  );
}

const juniorClassOptions = ["JSS1", "JSS2", "JSS3"];
const seniorClassOptions = [
  {
    division: "Art",
    classes: ["SS1", "SS2", "SS3"],
  },
  {
    division: "Commercial",
    classes: ["SS1", "SS2", "SS3"],
  },
  {
    division: "Science",
    classes: ["SS1", "SS2", "SS3"],
  },
];
