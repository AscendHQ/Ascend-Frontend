import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

import AccountSettingContainer from "@/components/layout/account-setting/container";

export default function AccountSettingSchoolInfo() {
  return (
    <AccountSettingContainer headerTitle="Account Setting">
      <div className="mt-8">
        <SchoolInformation />
        <AcademicYear />
        <Authorization />
      </div>
    </AccountSettingContainer>
  );
}

function AcademicYear() {
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Academic year</h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="start-date"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Start date
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
              name="Start date"
              id="Start date"
              className="bg-neutral-300 border border-border-colour-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="end-date"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            End date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-3.5 z-50 flex items-center pl-3.5 cursor-pointer ">
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
              name="end-date"
              id="end-date"
              className="bg-neutral-300 border border-border-colour-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="current-year"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Current year
          </label>
          <select
            name="current-year"
            id="current-year"
            placeholder="Choose a year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2020/2021">2020/2021</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function SchoolInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          School Information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="school_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            School name
          </label>
          <input
            type="text"
            id="school_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Blessing"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="contact_details"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Contact details
          </label>
          <input
            type="text"
            id="contact_details"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Okowah"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="email_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email_address"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="website"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Website
          </label>
          <input
            type="search"
            id="website"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1">
          <label
            htmlFor="residential_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Residential Address
          </label>
          <input
            type="text"
            id="residential_address"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1 mt-9">
          <label
            htmlFor="school_logo"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            School logo
          </label>
          <div className="flex flex-col 2xl:flex-row gap-8 items-start justify-center w-full">
            <Image
              src="/ascend-demo-img.png"
              alt="unsplashh image as avatar"
              width={150}
              height={120}
              style={{
                objectFit: "cover",
              }}
            />
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-Text-high-emphasis"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-800">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-800">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
function Authorization() {
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Authorization</h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will help strengthen your security
        </p>
      </div>
      <div className="flex-1">
        <label className="relative flex items-center mb-5 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple-500"></div>
          <span className="ml-3 text-sm font-medium text-Text-high-emphasis">
            Two-factor authentication
          </span>
        </label>
        <h5 className="block mb-2 text-sm font-medium text-Text-high-emphasis">
          Active methods:
        </h5>

        <button className="flex justify-between border border-border-colour-light lg:min-w-[250px] w-full items-center py-3 px-4 rounded-lg">
          <div className="flex gap-2 items-center">
            <Icon
              icon="solar:password-minimalistic-input-outline"
              className="text-primary-purple-500"
            />
            <span className="text-Text-high-emphasis tracking-tight text-sm">
              Password
            </span>
          </div>
          <Icon
            icon="solar:trash-bin-minimalistic-broken"
            className="text-Text-meduim-emphasis"
          />
        </button>

        <button className="flex justify-between border border-border-colour-light lg:min-w-[250px] w-full items-center py-3 px-4 rounded-lg mt-3">
          <div className="flex gap-2 items-center">
            <Icon
              icon="solar:key-square-outline"
              className="text-primary-purple-700"
            />
            <span className="text-Text-high-emphasis tracking-tight text-sm">
              Authentication application
            </span>
          </div>
          <Icon
            icon="solar:trash-bin-minimalistic-broken"
            className="text-Text-meduim-emphasis"
          />
        </button>
      </div>
    </div>
  );
}
