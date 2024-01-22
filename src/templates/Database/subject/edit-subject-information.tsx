import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { SubjectInfoContext } from "@/pages/dashboard/database/subjects/[subjectInfo]";

export default function EditSubjectInformation() {
  const { register, errors } = useFormContext(SubjectInfoContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Subject information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="subject_name"
          label="Subject name"
          placeholder="Enter a subject name"
          required
          register={register}
          errorMessage={errors.subject_name?.message || ""}
        />
        <TextField
          id="subject_code"
          label="Subject code"
          placeholder="e.g. PHY"
          required
          register={register}
          errorMessage={errors.subject_code?.message || ""}
        />
        <SelectField
          id="type"
          label="Subject Type"
          options={["core", "elective"]}
          register={register}
          errorMessage={errors.type?.message || ""}
        />
      </div>
    </div>
  );
}
