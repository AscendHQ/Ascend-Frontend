import { Icon } from "@iconify/react";
import React from "react";

import AccountSettingContainer from "@/components/layout/account-setting/container";

export default function AccountSettingDetails() {
  return (
    <AccountSettingContainer>
      <div className="mt-8">
        <SchoolInformation />
        <Contactinformation />
        <ChangePassword />
        <Authorization />
      </div>
    </AccountSettingContainer>
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
              className="text-primary-purple-500"
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

function ChangePassword() {
  return (
    <div className="flex justify-between gap-16 py-16 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Change password
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          Set everything regarding your account security.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-4">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="current_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Current Password
          </label>
          <input
            type="password"
            id="current_password"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="*********"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="new_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            New Password
          </label>
          <input
            type="password"
            id="new_password"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="*********"
            required
          />
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="*********"
            required
          />
        </div>
      </div>
    </div>
  );
}

function Contactinformation() {
  return (
    <div className="flex justify-between gap-16 border-b-2 border-border-colour-light py-16">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Contact information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          Your contact information is displayed here
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-4">
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
            htmlFor="contact_details"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Contact Details
          </label>
          <input
            type="text"
            id="contact_details"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="(217) 555-0113"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
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
      <div className="flex flex-1 flex-wrap gap-4">
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
            placeholder="Blessing"
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
        <div className="lg:min-w-[250px] flex-1 xl:max-w-[320px]">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            defaultValue={"female"}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
}
