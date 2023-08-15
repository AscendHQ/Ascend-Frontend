/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_CLASS } from "@/config/links";

export default function ClassInfo() {
  const router = useRouter();
  const id = router.query.classInfo as string;

  return (
    <div>
      <Container headerTitle={id}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_CLASS}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <ul className="flex gap-2">
              <li>
                <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm">
                  Cancel
                </button>
              </li>
              <li>
                <button className="text-white bg-primary-purple-700 rounded-lg py-3 px-6 font-semibold text-sm">
                  Save changes
                </button>
              </li>
            </ul>
          </div>
          <ClassInformation />
        </main>
      </Container>
    </div>
  );
}
function ClassInformation() {
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
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class name
          </label>
          <input
            type="text"
            id="class_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="SS2B"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="academic_year"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Academic year
          </label>
          <input
            type="text"
            id="academic_year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="2023"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_teacher"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class teacher
          </label>
          <input
            type="text"
            id="class_teacher"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Myrtle Rios"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_teacher_contact"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class teacher contact
          </label>
          <input
            type="text"
            id="class_teacher_contact"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="(234)81 0000 0000"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="students"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Students
          </label>

          <ul id="students" className="flex items-center flex-wrap gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <li
                className="inline-flex items-center py-1 px-3 rounded gap-2 text-gray-800 bg-neutral-300"
                key={i}
              >
                <span>Myrtle Hart</span>
                <Icon
                  icon="material-symbols:cancel-outline"
                  fontSize={20}
                  className="cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>{" "}
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="additional_notes"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Additional notes
          </label>
          <textarea
            name="additional_notes"
            id="additional_notes"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
            placeholder="Add additional notes"
          />
          <span className="text-gray-800">0/40 characters remaining</span>
        </div>
      </div>
    </div>
  );
}
