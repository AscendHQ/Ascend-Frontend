import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/staff/new-teacher";

export default function OfficialInformation() {
  const { register, errors } = useFormContext(ReactHookForm);
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
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
        <TextField
          id="staff_category"
          label="Staff category"
          placeholder="Teacher"
          required
          register={register}
          errorMessage={errors.staff_category?.message || ""}
        />

        <TextField
          id="department"
          label="Department"
          placeholder="Science"
          register={register}
          errorMessage={errors.department?.message || ""}
        />
        <SelectField
          id="educational_qualification"
          label="Educational Qualification"
          register={register}
          options={["Bsc.", "HND", "OND"]}
          errorMessage={errors.educational_qualification?.message || ""}
        />
      </div>
    </div>
  );
}
