/* eslint-disable sonarjs/no-duplicate-string */
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie-player";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import {
  DASHBOARD_STUDENT,
  NEW_STUDENT_ACADEMIC_INFORMATION,
} from "@/config/links";
import {
  BioDataContextType,
  studentBioDataSchema,
  StudentBioDataSchemaType,
} from "@/types/form";

import loadingLottie from "../../../../../public/animation.json";

const ReactHookForm = React.createContext<BioDataContextType | undefined>(
  undefined
);

export default function UpdateBiodata() {
  const router = useRouter();

  const onSubmit = (data: object) => {
    console.log(data, "data");

    router.push(NEW_STUDENT_ACADEMIC_INFORMATION);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<StudentBioDataSchemaType>({
    resolver: zodResolver(studentBioDataSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <div className="grid font-inter grid-cols-9 min-w-[1000px]">
        <Sidebar />
        <div className="col-[3/-1] 3xl:col-[2/-1] bg-white">
          <DashboardHeader headerTitle="Student Biodata" />
          <main className="p-10">
            <Link href={DASHBOARD_STUDENT} className="flex items-center gap-2">
              <Icon icon="teenyicons:arrow-left-solid" />
              Back to Biodata
            </Link>
            <StudentBiodataHeading />
            <PersonalInformation />
            <ContactInformation />
            <HostelAccommodation />
            <GuardianInformation />
            <MedicalInformation />
            <AdditionalInformation />
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
                {isSubmitting ? (
                  <Lottie
                    loop
                    animationData={loadingLottie}
                    play
                    style={{ width: 60, height: 20, margin: "0 auto" }}
                  />
                ) : (
                  <span>Save and continue</span>
                )}
              </DashboardButton>
            </div>
          </main>
        </div>
      </div>
    </ReactHookForm.Provider>
  );
}
const useFormContext = () => {
  const context = React.useContext(ReactHookForm);
  if (!context) {
    throw new Error("useFormContext must be used within a MyProvider");
  }
  return context;
};

function HostelAccommodation() {
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between gap-16 pb-10 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel / accommodation
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="hostel_block"
          label="Block"
          placeholder="Block 2"
          required
          register={register}
          errorMessage={errors["hostel_block"]?.message || ""}
        />

        <TextField
          id="hostel_room-number"
          label="Room number"
          placeholder="09"
          required
          register={register}
          errorMessage={errors["hostel_room-number"]?.message || ""}
        />
      </div>
    </div>
  );
}

function AdditionalInformation() {
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Additional information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="student_special_needs/disabilities"
          label="Any special needs / disabilities?"
          required
          register={register}
          errorMessage={
            errors["student_special_needs/disabilities"]?.message || ""
          }
        />
        <TextField
          id="student_nature_of_disability"
          label="Nature of disability"
          required
          register={register}
          errorMessage={errors["student_nature_of_disability"]?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="additional_student_medication"
          label="Medication"
          register={register}
          errorMessage={errors["additional_student_medication"]?.message || ""}
          maxLength={40}
          isFullWidth
        />
      </div>
    </div>
  );
}

function MedicalInformation() {
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Medical information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="student_allergies"
          label="Allergies"
          placeholder="Any know allergies?"
          required
          register={register}
          errorMessage={errors.student_allergies?.message || ""}
        />
        <TextField
          id="student_emergency_contact"
          label="Emergency Contact"
          placeholder="(217) 555-0113"
          required
          register={register}
          errorMessage={errors.student_emergency_contact?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="student_medication"
          label="Medication"
          register={register}
          errorMessage={errors["student_medication"]?.message || ""}
          maxLength={40}
          isFullWidth
        />
      </div>
    </div>
  );
}

function GuardianInformation() {
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Guardian/Parent information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="guardian_first_name"
          label="First name"
          placeholder="Cameron"
          required
          register={register}
          errorMessage={errors.guardian_first_name?.message || ""}
        />
        <TextField
          id="guardian_last_name"
          label="Last name"
          placeholder="Huff"
          required
          register={register}
          errorMessage={errors.guardian_last_name?.message || ""}
        />
        <TextField
          id="guardian_relationship_with_student"
          label="Relationship with Student"
          placeholder="Parent"
          required
          register={register}
          errorMessage={
            errors.guardian_relationship_with_student?.message || ""
          }
        />
        <TextField
          id="guardian_contact_details"
          label="Contact Details"
          placeholder="(217) 555-0113"
          required
          register={register}
          errorMessage={errors.guardian_contact_details?.message || ""}
        />
        <TextField
          id="guardian_email_address"
          label="Email Address"
          placeholder="carson@gmail.com"
          required
          register={register}
          errorMessage={errors.guardian_email_address?.message || ""}
        />
      </div>
    </div>
  );
}

function ContactInformation() {
  const { register, errors } = useFormContext();
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Contact information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="residential_address"
          label="Residential Address"
          placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
          required
          register={register}
          isFullWidth
          errorMessage={errors.residential_address?.message || ""}
        />
        <TextField
          id="contact_details"
          label="Contact Details"
          placeholder="(217) 555-0113"
          required
          register={register}
          errorMessage={errors.contact_details?.message || ""}
        />
        <TextField
          id="guardian"
          label="Guardian"
          placeholder="Mr & Mrs. Babalola"
          required
          register={register}
          errorMessage={errors.guardian?.message || ""}
        />
        <TextField
          id="email_address"
          label="Email Address"
          placeholder="allison@gmail.com"
          required
          register={register}
          type="email"
          errorMessage={errors.email_address?.message || ""}
        />
      </div>
    </div>
  );
}

function StudentBiodataHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis text-2xl font-bold">
          Student Biodata
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
    </div>
  );
}
function PersonalInformation() {
  const { register, errors } = useFormContext();

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
      <div className="flex flex-1 flex-wrap gap-5">
        <section className="lg:min-w-full flex-1 flex items-center gap-3 justify-start">
          <div className="relative flex justify-center items-center p-3 w-24 h-24 mr-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className=" w-17 h-17 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <button className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-7 py-3 rounded-lg">
            Upload Image
          </button>
          {/* <button className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg">
            Remove
          </button> */}
        </section>
        <TextField
          id="first_name"
          label="First name"
          placeholder="SS2B"
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
          options={["Male", "Female"]}
          register={register}
          errorMessage={errors.gender?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
        <TextField
          id="date_of_birth"
          label="Date of Birth"
          type="date"
          required
          register={register}
          errorMessage={errors.date_of_birth?.message || ""}
        />
        <SelectField
          id="religion"
          label="Religion"
          options={["Christain", "Muslim"]}
          register={register}
          errorMessage={errors.religion?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
        <SelectField
          id="nationality"
          label="Nationality"
          options={["Nigeria", "Ghana"]}
          register={register}
          errorMessage={errors.nationality?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
        <SelectField
          id="state_of_origin"
          label="State of Origin"
          options={["Ondo", "Ekiti", "Edo", "Oyo", "Lagos", "Kwara"]}
          register={register}
          errorMessage={errors.state_of_origin?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
        <SelectField
          id="local_government_area"
          label="Local Government Area"
          options={["Odigbo", "Ifon", "Okitipupa", "Ikorodu", "Oshodi"]}
          register={register}
          errorMessage={errors.state_of_origin?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
      </div>
    </div>
  );
}
