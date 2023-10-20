import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_TEACHER, NEW_TEACHER_OFFICIAL_INFO } from "@/config/links";
import { useFormContext } from "@/hooks/useFormContext";
import {
  NewTeacherBioDataContextType,
  newTeacherBioDataSchema,
  NewTeacherBioDataSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<
  NewTeacherBioDataContextType | undefined
>(undefined);

export default function NewTeacherBiodata() {
  const router = useRouter();

  const onSubmit = (data: NewTeacherBioDataSchemaType) => {
    console.log(data, "data");
    router.push(NEW_TEACHER_OFFICIAL_INFO);
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

  React.useEffect(() => {
    window.addEventListener("popstate", function (event) {
      localStorage.setItem("ayod", JSON.stringify("This is testing" + event));
    });
  }, []);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle="New Teacher">
        <main className="p-10 bg-white h-full">
          <Link href={DASHBOARD_TEACHER} className="flex items-center gap-2">
            <Icon icon="teenyicons:arrow-left-solid" />
            Back
          </Link>
          <TeacherdataHeading />
          <PersonalInformation />
          <NextOfKinInformation />
          <div className="flex justify-end gap-6">
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

function NextOfKinInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Next of kin information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="next_of_kin_first_name"
          label="First name"
          placeholder="John"
          required
          register={register}
          errorMessage={errors.next_of_kin_first_name?.message || ""}
        />
        <TextField
          id="next_of_kin_last_name"
          label="Last name"
          placeholder="Doe"
          required
          register={register}
          errorMessage={errors.next_of_kin_last_name?.message || ""}
        />
        <SelectField
          id="next_of_kin_relationship"
          label="Relationship"
          register={register}
          options={["Father", "Mother"]}
          errorMessage={errors.next_of_kin_relationship?.message || ""}
        />
        <SelectField
          id="next_of_kin_gender"
          label="Gender"
          register={register}
          options={["Male", "Female"]}
          errorMessage={errors.next_of_kin_gender?.message || ""}
        />
        <TextField
          id="next_of_kin_email_address"
          label={
            <span>
              Email address <small>(Optional)</small>
            </span>
          }
          type="email"
          placeholder="emilypage@gmail.com"
          register={register}
          errorMessage={errors.next_of_kin_email_address?.message || ""}
        />
        <TextField
          id="next_of_kin_phone_number"
          label="Phone number"
          placeholder="0900 000 0000"
          required
          register={register}
          errorMessage={errors.next_of_kin_phone_number?.message || ""}
        />
        <SelectField
          id="next_of_kin_state_of_residence"
          label="State of residence"
          register={register}
          options={["Ondo", "Ekiti", "Lagos", "Osun", "Oyo"]}
          errorMessage={errors.next_of_kin_state_of_residence?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="next_of_kin_residential_address"
          label="Residential address"
          placeholder="Enter your home address"
          maxLength={50}
          showCharacterCount={false}
          register={register}
          isFullWidth
          errorMessage={errors.next_of_kin_residential_address?.message || ""}
        />
      </div>
    </div>
  );
}

function TeacherdataHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <span className=" text-sm font-medium text-gray-800">STEP 1 of 3</span>
        <p className="text-2xl font-bold tracking-tight text-Text-high-emphasis ">
          Personal Biodata
        </p>
      </div>
    </div>
  );
}
function PersonalInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Personal information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <section className="lg:min-w-full flex-1 flex items-center gap-3 justify-start">
          <div className="relative flex justify-center items-center p-3 w-24 h-24 mr-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className=" w-17 h-17 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <button className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-7 py-3 rounded-lg">
            Upload new
          </button>
          <button className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg">
            Remove
          </button>
        </section>
        <TextField
          id="first_name"
          label="First name"
          placeholder="Babalola"
          required
          register={register}
          errorMessage={errors.first_name?.message || ""}
        />
        <TextField
          id="last_name"
          label="Last name"
          placeholder="Okowah"
          required
          register={register}
          errorMessage={errors.last_name?.message || ""}
        />

        <SelectField
          id="gender"
          label="Gender"
          register={register}
          options={["Male", "Female"]}
          errorMessage={errors.gender?.message || ""}
        />

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="date_of_birth"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Date of Birth
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
              name="date_of_birth"
              id="date_of_birth"
              className="bg-neutral-300 border border-border-colour-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <TextField
          id="email_address"
          label={
            <span>
              Email address <small>(Optional)</small>
            </span>
          }
          placeholder="emilypage@gmail.com"
          register={register}
          errorMessage={errors.email_address?.message || ""}
        />
        <TextField
          id="phone_number"
          label="Phone number"
          placeholder="0900 000 0000"
          required
          register={register}
          errorMessage={errors.phone_number?.message || ""}
        />
        <SelectField
          id="state_of_origin"
          label="State of Origin"
          register={register}
          options={["Ondo", "Ekiti", "Lagos", "Osun", "Oyo"]}
          errorMessage={errors.state_of_origin?.message || ""}
        />
        <SelectField
          id="local_government_area"
          label="Local Government Area"
          register={register}
          options={[
            "Akoko-North",
            "Akoko-South",
            "Akure-North",
            "Akure-South",
            "Ondo",
          ]}
          errorMessage={errors.local_government_area?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="home_address"
          label="Home Address"
          placeholder="Enter your home address"
          maxLength={50}
          showCharacterCount={false}
          register={register}
          isFullWidth
          errorMessage={errors.home_address?.message || ""}
        />
      </div>
    </div>
  );
}
