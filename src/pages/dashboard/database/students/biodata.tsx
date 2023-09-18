import React from "react";

import DatabaseStudentContainer from "@/components/layout/database-student/container";
import { DashboardButton } from "@/components/ui/button/button";
import { STUDENT_BIODATA_UPDATE } from "@/config/links";

export default function Biodata() {
  return (
    <DatabaseStudentContainer headerTitle="Student">
      <div>
        <BioUpdate />
        <PersonalInformation />
        <ContactInformation />
        <HostelAccommodation />
        <GuardianInformation />
        <MedicalInformation />
        <AdditionalInformation />
      </div>
    </DatabaseStudentContainer>
  );
}

function HostelAccommodation() {
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
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="hostel_block"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Block
          </label>
          <input
            type="text"
            id="hostel_block"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="hostel_room-number"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Room number
          </label>
          <input
            type="text"
            id="hostel_room-number"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            required
          />
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
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="special_needs/disabilities"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Any special needs / disabilities?
          </label>
          <input
            type="text"
            id="special_needs/disabilities"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="nature_of_disability"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Nature of disability
          </label>
          <input
            type="text"
            id="nature_of_disability"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="(217) 555-0113"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1">
          <label
            htmlFor="medication"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Medication
          </label>
          <textarea
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            id="medication"
          />
        </div>
      </div>
    </div>
  );
}

function MedicalInformation() {
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
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="allergies"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Allergies
          </label>
          <input
            type="text"
            id="allergies"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Any know allergies?"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="emergency_contact"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Emergency Contact
          </label>
          <input
            type="text"
            id="emergency_contact"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="(217) 555-0113"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1">
          <label
            htmlFor="medication"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Medication
          </label>
          <textarea
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            id="medication"
          />
        </div>
      </div>
    </div>
  );
}

function GuardianInformation() {
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
            placeholder="Cameron"
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
            placeholder="Huff"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="relationship_with_student"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Relationship with Student
          </label>
          <input
            type="text"
            id="relationship_with_student"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
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
            htmlFor="email_address"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Email Address
          </label>
          <input
            type="text"
            id="email_address"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Mr & Mrs. Babalola"
            required
          />
        </div>
      </div>
    </div>
  );
}

function ContactInformation() {
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
            htmlFor="guardian"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Guardian
          </label>
          <input
            type="text"
            id="guardian"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Mr & Mrs. Babalola"
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
            type="text"
            id="email_address"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Mr & Mrs. Babalola"
            required
          />
        </div>
      </div>
    </div>
  );
}

function BioUpdate() {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Student Biodata
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update key information and details about the students in our database.
        </p>
      </div>

      <DashboardButton
        variant="primary"
        isLink={true}
        path={STUDENT_BIODATA_UPDATE}
      >
        Update
      </DashboardButton>
    </div>
  );
}
function PersonalInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 mb-8 border-b-2 border-border-colour-light">
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
              name="date_of_birth"
              id="date_of_birth"
              className="bg-neutral-300 border border-border-colour-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="religion"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Religion
          </label>
          <select
            name="gender"
            id="gender"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Christain">Christain</option>
            <option value="Muslim">Muslim</option>
          </select>
        </div>{" "}
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="nationality"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Nationality
          </label>
          <select
            name="nationality"
            id="nationality"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
          </select>
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
      </div>
    </div>
  );
}
