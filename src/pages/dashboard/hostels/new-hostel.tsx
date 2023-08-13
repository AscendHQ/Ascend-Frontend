/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_HOSTEL } from "@/config/links";

export default function NewHostel() {
  return (
    <Container>
      <main className="p-10 bg-white h-full">
        <Link href={DASHBOARD_HOSTEL} className="flex items-center gap-2">
          <Icon icon="teenyicons:arrow-left-solid" />
          Back to Hostel
        </Link>
        <NewHostelHeading />
        <HostelInformation />
        <HostelFacilities />
        <HostelStaffDetails />
        <AdditionalInformation />
        <AllocateStudent />
        <RoomNamingConfiguration />
        <HostelFee />
        <div className="flex justify-end gap-6">
          <button className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-20 py-3 rounded-lg">
            Cancel
          </button>
          <button className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-20 py-3 rounded-lg">
            Save
          </button>
        </div>
      </main>
    </Container>
  );
}

function HostelInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="hostel_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Hostel name
          </label>
          <input
            type="text"
            id="hostel_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Babalola Hostel"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="capacity"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Capacity
          </label>
          <input
            type="text"
            id="capacity"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="2000"
            required
          />
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function HostelStaffDetails() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel staff details
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="staff_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Staff name
          </label>
          <input
            type="text"
            id="staff_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Mr Bamidele"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="contact_detail"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Contact detail
          </label>
          <input
            type="text"
            id="contact_detail"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="0811-234-5678"
            required
          />
        </div>
      </div>
    </div>
  );
}

function HostelFee() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Hostel fee</h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="amount_to_be_paid"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Amount to be paid
          </label>
          <input
            type="text"
            id="amount_to_be_paid"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="$13,450"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="period_of_payment"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Period of payment
          </label>
          <select
            name="period_of_payment"
            id="period_of_payment"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        </div>
      </div>
    </div>
  );
}
function AdditionalInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Additional information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1 text-sm text-Text-high-emphasis font-medium space-y-2">
        <h5>
          Other notes & comments <small>(Optional)</small>
        </h5>
        <textarea
          name="Notes&Comments"
          id="Notes&Comments"
          className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
        />
      </div>
    </div>
  );
}

function AllocateStudent() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Allocate Student
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1 text-sm text-Text-high-emphasis font-medium space-y-5">
        <label htmlFor="add_student_name" className="sr-only">
          Enter student name
        </label>
        <input
          type="text"
          id="add_student_name"
          className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis font-normal text-Text-high-emphasis"
          placeholder="Enter student name"
          required
        />
        <ul id="students" className="flex items-center flex-wrap gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <li
              className="inline-flex items-center py-1 px-3 rounded gap-2 text-Text-high-emphasis bg-neutral-300"
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
    </div>
  );
}

function RoomNamingConfiguration() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Room naming configuration
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1 space-y-3">
        <h5>Naming convention</h5>
        <div className="inline-flex items-center gap-3 mr-5">
          <input
            type="radio"
            name="naming_convention"
            id="naming_convention_number"
          />
          <label htmlFor="naming_convention_number">Number (i.e Room 1)</label>
        </div>
        <div className="inline-flex items-center gap-3">
          <input
            type="radio"
            name="naming_convention"
            id="naming_convention_letter"
          />
          <label htmlFor="naming_convention_letter">Letter (i.e Room A)</label>
        </div>
      </div>
    </div>
  );
}

function HostelFacilities() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel facilities
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the hostel detail profile.
        </p>
      </div>
      <div className="flex-1">
        <div className="lg:max-w-[250px]">
          <label
            htmlFor="room_type"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Room type
          </label>
          <select
            name="room_type"
            id="room_type"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Single room">Single room</option>
            <option value="Double room">Double room</option>
          </select>
        </div>

        <div className="mt-5 space-y-3">
          <h4 className="text-gray-800 font-medium">Available amenities</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <label htmlFor="amenities_beds" className="space-x-3">
              <input
                type="checkbox"
                name="amenities_beds"
                id="amenities_beds"
              />
              <span className="text-gray-800 font-medium">Beds (4)</span>
            </label>
            <label htmlFor="amenities_study-table" className="space-x-3">
              <input
                type="checkbox"
                name="amenities_study-table"
                id="amenities_study-table"
              />
              <span className="text-gray-800 font-medium">Study tables</span>
            </label>
            <label htmlFor="amenities_wardrobes" className="space-x-3">
              <input
                type="checkbox"
                name="amenities_wardrobes"
                id="amenities_wardrobes"
              />
              <span className="text-gray-800 font-medium">Wardrobes</span>
            </label>
            <label htmlFor="amenities_bathrooms" className="space-x-3">
              <input
                type="checkbox"
                name="amenities_bathrooms"
                id="amenities_bathrooms"
              />
              <span className="text-gray-800 font-medium">Bathrooms</span>
            </label>
            <label htmlFor="amenities_common-rooms" className="space-x-3">
              <input
                type="checkbox"
                name="amenities_common-rooms"
                id="amenities_common-rooms"
              />
              <span className="text-gray-800 font-medium">Common rooms</span>
            </label>
            <label htmlFor="amenities_fan" className="space-x-3">
              <input type="checkbox" name="amenities_fan" id="amenities_fan" />
              <span className="text-gray-800 font-medium">Fan</span>
            </label>
            <label htmlFor="amenities_wi-Fi" className="space-x-3">
              <input
                type="checkbox"
                name="amenities_wi-Fi"
                id="amenities_wi-Fi"
              />
              <span className="text-gray-800 font-medium">Wi-Fi</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewHostelHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h2 className="text-2xl font-bold tracking-tight text-Text-high-emphasis ">
          Adding a New Hostel
        </h2>
        <p className=" text-sm font-medium text-gray-800">
          Update your student biodata here
        </p>
      </div>
    </div>
  );
}
