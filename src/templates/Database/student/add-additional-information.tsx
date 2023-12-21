import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewStudentFormContext } from "@/pages/dashboard/database/students/new-student";

export default function AddAdditionalInformation() {
  const { register, errors } = useFormContext(NewStudentFormContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Additional information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="student_special_needs/disabilities"
          label="Any special needs / disabilities?"
          required
          register={register}
          errorMessage={
            errors["student_special_needs/disabilities"]?.message || ""
          }
        />
        <TextField
          id="student_nature_of_disability"
          label="Nature of disability"
          required
          register={register}
          errorMessage={errors["student_nature_of_disability"]?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="additional_student_medication"
          label="Medication"
          register={register}
          errorMessage={errors["additional_student_medication"]?.message || ""}
          maxLength={40}
          isFullWidth
        />
      </div>
    </div>
  );
}
