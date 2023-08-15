/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { DASHBOARD_SUBJECT } from "@/config/links";

export default function SubjectInfo() {
  const router = useRouter();
  const id = router.query.subjectInfo as string;

  return (
    <div>
      <Container headerTitle={id}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_SUBJECT}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <ul className="flex gap-2">
              <li>
                <DashboardButton variant={"secondary"}>Cancel</DashboardButton>
              </li>
              <li>
                <DashboardButton variant={"primary"}>
                  Save changes
                </DashboardButton>
              </li>
            </ul>
          </div>
          <SubjectInformation />
        </main>
      </Container>
    </div>
  );
}
function SubjectInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Subject information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="subject_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Subject name
          </label>
          <input
            type="text"
            id="subject_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Enter a subject name"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="subject_code"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Subject code
          </label>
          <input
            type="text"
            id="subject_code"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="e.g. PHY"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="classes_offering"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Classes offering
          </label>

          <ul id="classes_offering" className="flex items-center gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                className="inline-flex items-center py-1 px-3 rounded gap-2 text-gray-800 bg-neutral-300"
                key={i}
              >
                <span>SS2A</span>
                <Icon
                  icon="material-symbols:cancel-outline"
                  fontSize={20}
                  className="cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="teachers_handling"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Teachers handling
          </label>

          <ul
            id="teachers_handling"
            className="flex items-center gap-3 flex-wrap"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                className="inline-flex items-center py-1 px-3 rounded gap-2 text-gray-800 bg-neutral-300"
                key={i}
              >
                <span>Melvin Little</span>
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
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="hours_per_week"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Hours per week
          </label>
          <select
            name="hours_per_week"
            id="hours_per_week"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
            placeholder="What is this subject about?"
          />
          <span className="text-gray-800">0/40 characters remaining</span>
        </div>
      </div>
    </div>
  );
}
