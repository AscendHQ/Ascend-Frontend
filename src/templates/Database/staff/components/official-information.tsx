import React from "react";

import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/staff/new-staff";

import EducationQualification from "./education-qualification";

export default function OfficialInformation() {
  const { register, errors } = useFormContext(ReactHookForm);
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Official information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="job_title"
          label="Job title"
          placeholder="Teacher"
          required
          register={register}
          errorMessage={errors.job_title?.message || ""}
        />
        <SelectField
          id="status"
          label="Status"
          register={register}
          options={[statusValues.Teaching, statusValues["Non-Teaching"]]}
          errorMessage={errors.status?.message || ""}
        />
        <SelectField
          id="type"
          label="Type"
          register={register}
          options={[typeValues.Permanent, typeValues["Part-Time"]]}
          errorMessage={errors.type?.message || ""}
        />

        <TextField
          id="department"
          label="Department"
          placeholder="Science"
          register={register}
          errorMessage={errors.department?.message || ""}
        />
        <EducationQualification />
      </div>
    </div>
  );
}

const typeValues = {
  Permanent: "permanent",
  "Part-Time": "part_time",
};

const statusValues = {
  Teaching: "teaching",
  "Non-Teaching": "none_teaching",
};
