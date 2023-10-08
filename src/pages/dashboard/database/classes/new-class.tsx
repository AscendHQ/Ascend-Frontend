import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_CLASS } from "@/config/links";
import { useFormContext } from "@/hooks/useFormContext";
import {
  NewClassContextType,
  newClassSchema,
  NewClassSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<NewClassContextType | undefined>(
  undefined
);

export default function NewClass() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    return () => setIsModalOpen(false);
  };
  const onSubmit = (data: object) => {
    console.log(data, "data");
    setIsModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewClassSchemaType>({
    resolver: zodResolver(newClassSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
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

      <Modal
        centered
        open={isModalOpen}
        onOk={handleCloseModal()}
        width={400}
        okText={
          <button
            onClick={handleCloseModal()}
            className="text-white bg-primary-purple-700  w-full rounded-lg py-3 px-6 font-semibold text-sm"
          >
            View class
          </button>
        }
        closeIcon={
          <button onClick={handleCloseModal()} className="">
            <Icon icon="carbon:close-outline" className="text-black" />
          </button>
        }
        okButtonProps={{
          style: {
            color: "#ffffff",
            width: "100%",
            background: "#fff",
            margin: 0,
            marginBottom: 20,
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <div className="text-center pt-6 w-[95%] mx-auto">
          <div className="flex justify-center items-center rounded-lg bg-success-light  py-6">
            <Icon
              icon="zondicons:checkmark-outline"
              className="bg-success-light text-success-dark"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-1 mt-4 text-Text-high-emphasis">
            New class created
          </h2>
          <p className="text-gray-700 font-medium">
            You have successfully created a class named SS2B with 50 students
            added to this class.
          </p>
        </div>
      </Modal>
    </ReactHookForm.Provider>
  );
}

function ClassInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="class_name"
          label="Class name"
          placeholder="Enter a class name"
          required
          register={register}
          errorMessage={errors.class_name?.message || ""}
        />
        <SelectField
          id="academic_year"
          label="Academic year"
          register={register}
          options={["2022/2023", "2021/2022", "2020/2021"]}
          errorMessage={errors.academic_year?.message || ""}
        />
        <TextField
          id="class_teacher"
          label="Class teacher"
          placeholder="Myrtle Rios"
          register={register}
          required
          errorMessage={errors.class_teacher?.message || ""}
        />
        <TextField
          id="class_teacher_contact"
          label="Class teacher contact"
          placeholder="(234)81 0000 0000"
          register={register}
          required
          errorMessage={errors.class_teacher_contact?.message || ""}
        />
        <SelectField
          id="students"
          label="Students"
          options={[
            "Select students for this class",
            "Tyler Steele",
            "Gilbert Greene",
            "Kevin Thompson",
          ]}
          register={register}
          errorMessage={errors.students?.message || ""}
          isFullWidth
        />
        <SelectField
          id="status"
          label="Status"
          options={["Select an option", "Active", "Inactive"]}
          register={register}
          isFullWidth
          errorMessage={errors.status?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="additional_notes"
          label="Additional notes"
          placeholder="Add additional notes"
          maxLength={40}
          showCharacterCount={true}
          register={register}
          isFullWidth
          errorMessage={errors.additional_notes?.message || ""}
        />
      </div>
    </div>
  );
}
