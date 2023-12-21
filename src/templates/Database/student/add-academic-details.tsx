import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewStudentFormContext } from "@/pages/dashboard/database/students/new-student";

export default function AddAcademicDetails() {
  const { register, errors } = useFormContext(NewStudentFormContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 mb-8 border-b-2 border-border-colour-light">
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
          id="extracurricular_activities"
          label="Extracurricular Activities"
          register={register}
          isFullWidth
          errorMessage={errors["extracurricular_activities"]?.message || ""}
        />
      </div>
    </div>
  );
}
