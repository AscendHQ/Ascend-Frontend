import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { SubjectInfoContext } from "@/pages/dashboard/database/subjects/[subjectInfo]";

export default function EditSubjectInformation() {
  const { register, errors } = useFormContext(SubjectInfoContext);

  return (
    <div className="my-8 grid gap-8 border-b border-border-colour-light pb-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div>
        <h4 className="text-Text-high-emphasis font-semibold">
          Subject information
        </h4>
        <p className="mt-1 text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex min-w-0 flex-col flex-wrap gap-5 sm:flex-row">
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
