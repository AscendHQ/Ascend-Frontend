import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { NEW_TEACHER_BIODATA, NEW_TEACHER_PERMISSION } from "@/config/links";
import { useFormContext } from "@/hooks/useFormContext";
import {
  NewTeacherOfficialInfoContextType,
  newTeacherOfficialInfoSchema,
  NewTeacherOfficialInfoSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<
  NewTeacherOfficialInfoContextType | undefined
>(undefined);

export default function NewTeacherOfficialInfo() {
  const router = useRouter();

  const onSubmit = (data: NewTeacherOfficialInfoSchemaType) => {
    console.log(data, "data");
    router.push(NEW_TEACHER_PERMISSION);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewTeacherOfficialInfoSchemaType>({
    resolver: zodResolver(newTeacherOfficialInfoSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle="New Teacher">
        <main className="p-10 bg-white h-full">
          <Link href={NEW_TEACHER_BIODATA} className="flex items-center gap-2">
            <Icon icon="teenyicons:arrow-left-solid" />
            Back
          </Link>
          <TeacherdataHeading />
          <PersonalInformation />
          <Password />
          <div className="flex justify-end gap-6">
            <DashboardButton
              variant="secondary"
              onClick={() => {
                // TODO: do something about cancellation
              }}
              className="text-base px-7"
            >
              Cancel
            </DashboardButton>
            <DashboardButton
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              className="text-base px-7"
            >
              <LoadingState
                label="Save and continue"
                isSubmitting={isSubmitting}
              />
            </DashboardButton>
          </div>
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}

function PersonalInformation() {
  const { register, errors } = useFormContext(ReactHookForm);
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Personal information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="staff_ID"
          label="Staff ID"
          placeholder="GPIC5566"
          required
          register={register}
          errorMessage={errors.staff_ID?.message || ""}
        />
        <TextField
          id="job_title"
          label="Job title"
          placeholder="Teacher"
          required
          register={register}
          errorMessage={errors.job_title?.message || ""}
        />
        <TextField
          id="staff_category"
          label="Staff category"
          placeholder="Teacher"
          required
          register={register}
          errorMessage={errors.staff_category?.message || ""}
        />
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="employment_start_date"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Employment start date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-3.5 z-50 flex items-center pl-3.5 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-Text-high-emphasis bg-white"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-2Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M7 4V2.5M17 4V2.5M2.5 9h19"
                  />
                  <path
                    fill="currentColor"
                    d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
                  />
                </g>
              </svg>
            </div>
            <input
              type="date"
              name="employment_start_date"
              id="employment_start_date"
              className="bg-neutral-300 border border-border-colour-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <TextField
          id="department"
          label={
            <span>
              Department <small>(Optional)</small>
            </span>
          }
          placeholder="Science"
          register={register}
          errorMessage={errors.department?.message || ""}
        />
        <SelectField
          id="educational_qualification"
          label="Educational Qualification"
          register={register}
          options={["Bsc.", "HND", "OND"]}
          errorMessage={errors.educational_qualification?.message || ""}
        />
      </div>
    </div>
  );
}
function Password() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Password</h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="space-y-3 flex-1">
        <div className="flex bg-warning-light items-start relative p-4 pl-12 max-w-[500px] rounded-lg">
          <Icon
            icon="la:lightbulb-solid"
            fontSize={25}
            className="absolute top-4 text-warning-main left-4"
          />
          <p className="text-xs text-Text-high-emphasis">
            This password with the staff ID would be sent to the user upon
            invite as login credentials. Note that the user would be able to
            change this password after logging into thier account.
          </p>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="staff_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Staff password
          </label>
          <input
            type="password"
            id="staff_password"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="******"
            required
          />
        </div>
      </div>
    </div>
  );
}

function TeacherdataHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <span className=" text-sm font-medium text-gray-800">STEP 2 of 3</span>
        <p className="text-2xl font-bold tracking-tight text-Text-high-emphasis ">
          Official Information
        </p>
      </div>
    </div>
  );
}
