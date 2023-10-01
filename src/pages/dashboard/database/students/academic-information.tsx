import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_STUDENT, NEW_STUDENT_BIODATA } from "@/config/links";
import {
  AcademicInfoContextType,
  studentAcademicInfoSchema,
  StudentAcademicInfoSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<AcademicInfoContextType | undefined>(
  undefined
);

export default function UpdateAcademicInformation() {
  // const router = useRouter();

  const onSubmit = (data: object) => {
    console.log(data, "data");

    // router.push(NEW_STUDENT_BIODATA);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<StudentAcademicInfoSchemaType>({
    resolver: zodResolver(studentAcademicInfoSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);
  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <div className="grid font-inter grid-cols-9 min-w-[950px]">
        <Sidebar />
        <div className="col-[3/-1] 3xl:col-[2/-1] bg-white">
          <DashboardHeader headerTitle="Student Academic Information" />
          <main className="p-10">
            <Link
              href={NEW_STUDENT_BIODATA}
              className="flex items-center gap-2"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              Back to Biodata
            </Link>
            <AcademicInfoHeading />
            <AcademicDetails />
            <SubjectsOffering />
            <div className="flex justify-end gap-6">
              <Link
                href={DASHBOARD_STUDENT}
                className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg"
              >
                Cancel
              </Link>
              <DashboardButton
                variant="primary"
                className="font-semibold px-7 ml-0"
                onClick={handleSubmit(onSubmit)}
              >
                <LoadingState label="Save" isSubmitting={isSubmitting} />
              </DashboardButton>
            </div>
          </main>
        </div>
      </div>
    </ReactHookForm.Provider>
  );
}
const useFormContext = () => {
  const context = React.useContext(ReactHookForm);
  if (!context) {
    throw new Error("useFormContext must be used within a MyProvider");
  }
  return context;
};
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
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-10 pb-16 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic Details
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student’s profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <SelectField
          id="class"
          label="Class"
          options={["SS3B", "SS3A", "SS2B", "SS2A", "SS1B", "SS1A"]}
          register={register}
          errorMessage={errors.class?.message || ""}
          onChange={e => console.log(e.target.value)}
        />
        <TextField
          id="previous_school_attended"
          label="Previous School Attended"
          register={register}
          errorMessage={errors.previous_school_attended?.message || ""}
        />
        <SelectField
          id="enrollment_year"
          label="Enrollment Year"
          options={["2023", "2022", "2021", "2020", "2019", "2018"]}
          register={register}
          errorMessage={errors.enrollment_year?.message || ""}
        />

        <SelectField
          id="graduation_year"
          label="Graduation Year"
          options={["2023", "2022", "2021", "2020", "2019", "2018"]}
          register={register}
          errorMessage={errors.graduation_year?.message || ""}
        />

        <TextField
          id="awards_&_recognition"
          label="Awards & Recognition"
          register={register}
          errorMessage={errors["awards_&_recognition"]?.message || ""}
        />

        <TextField
          id="leadership_role"
          label="Any Leadership role held?"
          register={register}
          errorMessage={errors["leadership_role"]?.message || ""}
        />

        <TextField
          id="extracurricular_activities"
          label="Extracurricular Activities"
          register={register}
          isFullWidth
          errorMessage={errors["extracurricular_activities"]?.message || ""}
        />

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
    <div className="flex justify-between gap-16 flex-col lg:flex-row pb-5 border-b-2 mb-5 border-border-colour-light">
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
