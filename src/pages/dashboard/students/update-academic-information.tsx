import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import {
  DASHBOARD_STUDENT,
  STUDENT_ACADEMIC_INFORMATION,
} from "@/config/links";

export default function UpdateAcademicInformation() {
  return (
    <div className="grid font-inter grid-cols-9 min-w-[950px]">
      <Sidebar />
      <div className="col-[3/-1] 3xl:col-[2/-1] bg-white">
        <DashboardHeader headerTitle="Student Academic Information" />
        <main className="p-10">
          <Link
            href={STUDENT_ACADEMIC_INFORMATION}
            className="flex items-center gap-2"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            Back to Academic information
          </Link>
          <AcademicInfoHeading />
          <AcademicDetails />
          <SubjectsOffering />
          <MedicalInformation />
          <AdditionalInformation />
          <HostelAccommodation />
          <div className="flex justify-end gap-6">
            <Link
              href={DASHBOARD_STUDENT}
              className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg"
            >
              Cancel
            </Link>
            <Link
              href={DASHBOARD_STUDENT}
              className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-7 py-3 rounded-lg"
            >
              Save and continue
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

function AcademicInfoHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis text-2xl font-bold">
          Academic & School Information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          Update your student information here
        </p>
      </div>
    </div>
  );
}

function AcademicDetails() {
  return (
    <div className="flex justify-between gap-10 pb-16 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic Details
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student’s profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class
          </label>
          <select
            name="class"
            id="class"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="SS3B">SS3B</option>
            <option value="SS3A">SS3A</option>
            <option value="SS2B">SS2B</option>
            <option value="SS2A">SS2A</option>
            <option value="SS1B">SS1B</option>
            <option value="SS1A">SS1A</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="previous_school_attended"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Previous School Attended
          </label>
          <input
            type="text"
            id="previous_school_attended"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="enrollment_year"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Enrollment Year
          </label>
          <select
            name="enrollment_year"
            id="enrollment_year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="graduation_year"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Graduation Year
          </label>
          <select
            name="graduation_year"
            id="graduation_year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="awards_&_recognition"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Awards & Recognition
          </label>
          <input
            type="text"
            id="awards_&_recognition"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="leadership_role"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Any Leadership role held?
          </label>
          <input
            type="text"
            id="leadership_role"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1">
          <label
            htmlFor="extracurricular_activities"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Extracurricular Activities
          </label>
          <input
            type="text"
            id="extracurricular_activities"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            required
          />
        </div>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-1 text-Text-high-emphasis"
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
            <p className="font-semibold text-gray-800">Upload document</p>
            <p className="text-xs text-gray-800">
              For each upload, file size should not be more than 25 Mb
            </p>
            <span className="text-primary-purple-700 text-sm underline mt-1 decoration-primary-purple-600">
              Choose file
            </span>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

function SubjectsOffering() {
  return (
    <div className="flex justify-between gap-16 pb-5 border-b-2 mb-5 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Subjects Offering
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student's profile.
        </p>
      </div>
      <div className="flex-1 min-w-[60%] space-y-3">
        <div className="flex justify-end flex-wrap gap-4 w-full">
          <button className="flex gap-3 items-center bg-primary-purple-700 text-sm text-white px-6 py-3 rounded-lg">
            <Icon icon="ph:plus-bold" />
            <span>Add Subject</span>
          </button>
        </div>
        <SubjectOfferingData />
      </div>
    </div>
  );
}

function SubjectOfferingData() {
  return (
    <ul className="overflow-x-auto border border-border-colour-light rounded-lg">
      {subjectOfferingList.map((item, index) => (
        <li
          className={`flex justify-between items-center px-3 py-2   ${
            subjectOfferingList.length - 1 === index
              ? ""
              : "border-b border-border-colour-light"
          }`}
          key={item}
        >
          <span className="text-sm text-Text-high-emphasis font-semibold">
            {item}
          </span>
          <div className="flex gap-2">
            <button className="border-1.5 border-border-colour-light text-sm rounded-lg px-5 py-1">
              Edit
            </button>
            <button className="border-1.5 border-border-colour-light text-sm rounded-lg px-4 py-2">
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
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
const subjectOfferingList = [
  "General Mathematics",
  "Use of English Language",
  "Chemistry",
  "Further Mathematics",
  "Biology",
  "Physics",
  "Economics",
  "Civic Education",
  "Data Processing",
];
