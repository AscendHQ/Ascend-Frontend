import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { NEW_TEACHER_BIODATA, NEW_TEACHER_PERMISSION } from "@/config/links";

export default function NewTeacherOfficialInfo() {
  return (
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
          <button className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg">
            Cancel
          </button>
          <Link
            href={NEW_TEACHER_PERMISSION}
            className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-7 py-3 rounded-lg"
          >
            Save and continue
          </Link>
        </div>
      </main>
    </Container>
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
            htmlFor="staff_ID"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Staff ID
          </label>
          <input
            type="text"
            id="staff_ID"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="GPIC5566"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="job_title"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Job title
          </label>
          <input
            type="text"
            id="job_title"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Teacher"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="staff_category"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Staff category
          </label>
          <input
            type="text"
            id="staff_category"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Teacher"
            required
          />
        </div>
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
                    stroke-width="2"
                    d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-2Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
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
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Department <small>(Optional)</small>
          </label>
          <input
            type="email"
            id="department"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Science"
            required
          />
        </div>{" "}
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="educational_qualification"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Educational Qualification
          </label>
          <select
            name="educational_qualification"
            id="educational_qualification"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Bsc.">Bsc.</option>
            <option value="HND">HND</option>
            <option value="OND">OND</option>
          </select>
        </div>
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
