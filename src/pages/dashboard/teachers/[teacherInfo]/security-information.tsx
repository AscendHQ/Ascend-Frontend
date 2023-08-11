/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import DatabaseTeacherContainer from "@/components/layout/database-teacher/container";
import { STUDENT_ACADEMIC_INFORMATION_UPDATE } from "@/config/links";

export default function DatabaseTeacherSecurityInfo() {
  return (
    <DatabaseTeacherContainer>
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
          Security information
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your teacher security here
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
          Password information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="min-w-full">
          <div className="flex bg-warning-light items-start relative p-4 pl-12 max-w-[300px] rounded-lg">
            <Icon
              icon="la:lightbulb-solid"
              fontSize={25}
              className="absolute top-3 text-warning-main left-4"
            />
            <p className="text-xs text-Text-high-emphasis">
              minimum of 6 characters
            </p>
          </div>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="new_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            New password
          </label>
          <input
            type="password"
            id="new_password"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="******"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="******"
            required
          />
        </div>
      </div>
    </div>
  );
}
