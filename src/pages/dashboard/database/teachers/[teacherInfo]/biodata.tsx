import { useRouter } from "next/router";
import React from "react";

import DatabaseTeacherContainer from "@/components/layout/database-teacher/container";
import { DashboardButton } from "@/components/ui/button/button";

export default function DatabaseTeacherBiodata() {
  const router = useRouter();
  const id = router.query.teacherInfo as string;

  return (
    <DatabaseTeacherContainer
      headerTitle={id?.split("-")?.join(" ")?.toUpperCase()}
      teacherInfo={id}
    >
      <main className="h-full">
        <TeacherBiodata />
        <PersonalInformation />
        <NextOfKinInformation />
      </main>
    </DatabaseTeacherContainer>
  );
}
function TeacherBiodata() {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Teacher Biodata
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your student biodata here
        </p>
      </div>
      <DashboardButton variant="primary">Save Changes</DashboardButton>
    </div>
  );
}
function PersonalInformation() {
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
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Babalola"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Okowah"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
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
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="email_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Email address <small>(Optional)</small>
          </label>
          <input
            type="email"
            id="email_address"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="emilypage@gmail.com"
            required
          />
        </div>{" "}
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="phone_number"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone_number"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="0900 000 0000"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="state_of_origin"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            State of Origin
          </label>
          <select
            name="state_of_origin"
            id="state_of_origin"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Ondo">Ondo</option>
            <option value="Ekiti">Ekiti</option>
            <option value="Edo">Edo</option>
            <option value="Oyo">Oyo</option>
            <option value="Lagos">Lagos</option>
            <option value="Kwara">Kwara</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="local_government_area"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Local Government Area
          </label>
          <select
            name="local_government_area"
            id="local_government_area"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Akoko-Edo">Akoko-Edo</option>
            <option value="Ikale">Ikale</option>
          </select>
        </div>
        <div className="lg:min-w-full flex-1">
          <label
            htmlFor="home_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Home Address
          </label>
          <textarea
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            id="home_address"
            placeholder="Enter your home address"
          />
        </div>
      </div>
    </div>
  );
}
function NextOfKinInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Next of kin information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Joe"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Doe"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="relationship"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Relationship
          </label>
          <select
            name="relationship"
            id="relationship"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="email_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Email address <small>(Optional)</small>
          </label>
          <input
            type="email"
            id="email_address"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="emilypage@gmail.com"
            required
          />
        </div>{" "}
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="phone_number"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone_number"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="0900 000 0000"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="email_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            State of residence
          </label>
          <select
            name="select_a_state"
            id="select_a_state"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Select a state"
          >
            <option value="Ondo">Ondo</option>
            <option value="Ekiti">Ekiti</option>
            <option value="Lagos">Lagos</option>
            <option value="Oyo">Oyo</option>
            <option value="Osun">Osun</option>
          </select>
        </div>{" "}
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="residential_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Residential address
          </label>
          <textarea
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            id="residential_address"
            placeholder="Enter your home address"
          />
        </div>
      </div>
    </div>
  );
}
