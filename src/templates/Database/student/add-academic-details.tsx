import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewStudentFormContext } from "@/pages/dashboard/database/students/new-student";

export default function AddAcademicDetails() {
  const { register, errors, classData } = useFormContext(NewStudentFormContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic Details
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student's profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <SelectField
          id="class"
          label="Class"
          options={classData?.map(data => ({
            value: data._id,
            label:
              data.level === "junior"
                ? `${data.name} - ${data.other_section}`
                : `${data.name} - ${data.section}`,
          }))}
          register={register}
          errorMessage={errors.class?.message || ""}
        />
        <TextField
          id="previous_school_attended"
          label="Previous School Attended"
          register={register}
          errorMessage={errors.previous_school_attended?.message || ""}
        />

        {/* <TextField
          id="extracurricular_activities"
          label="Extracurricular Activities"
          register={register}
          isFullWidth
          errorMessage={errors["extracurricular_activities"]?.message || ""}
        /> */}
      </div>
    </div>
  );
}
