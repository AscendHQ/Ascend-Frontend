import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/staff/[teacherInfo]";

export default function EditOfficialInformation() {
  const { register, errors } = useFormContext(ReactHookForm);
  return (
    <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border-colour-light pb-10 lg:flex-row lg:gap-12">
      <div className="w-full lg:w-60">
        <h4 className="text-Text-high-emphasis font-semibold">
          Official information
        </h4>
        <p className="mt-1 text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="post"
          label="Job title"
          placeholder="Teacher"
          required
          register={register}
          errorMessage={errors.post?.message || ""}
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
        <SelectField
          id="qualifications"
          label="Highest Educational Qualification"
          register={register}
          options={["PhD", "MD/JD/MBA", "MSc", "BSc", "HND", "OND", "SSCE"]}
          errorMessage={errors.qualifications?.message || ""}
        />
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
