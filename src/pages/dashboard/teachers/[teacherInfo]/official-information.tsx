/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import DatabaseTeacherContainer from "@/components/layout/database-teacher/container";
import { STUDENT_ACADEMIC_INFORMATION_UPDATE } from "@/config/links";

export default function DatabaseTeacherOfficialInfo() {
  const router = useRouter();
  const id = router.query.teacherInfo as string;

  return (
    <DatabaseTeacherContainer
      headerTitle={id?.split("-")?.join(" ")?.toUpperCase()}
      teacherInfo={id}
    >
      <main className="h-full">
        <TeacherOfficialInfo />
        <PersonalInformation />
      </main>
    </DatabaseTeacherContainer>
  );
}
function TeacherOfficialInfo() {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Official information
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your teacher infromation here
        </p>
      </div>
      <Link
        href={STUDENT_ACADEMIC_INFORMATION_UPDATE}
        className="ml-auto flex gap-3 items-center bg-primary-purple-700 text-sm text-white px-6 py-3 rounded-lg"
      >
        <span>Save Changes</span>
      </Link>
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
            Department
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
