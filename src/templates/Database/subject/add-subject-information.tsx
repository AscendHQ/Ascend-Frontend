import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewSubjectContext } from "@/pages/dashboard/database/subjects/new-subject";

export default function AddSubjectInformation() {
  const { register, errors, watch, juniorFields, seniorFields } =
    useFormContext(NewSubjectContext);
  const levelOption = watch("level");

  return (
    <div className="my-8 grid gap-8 border-b border-border-colour-light pb-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div>
        <h4 className="text-Text-high-emphasis font-semibold">
          Subject information
        </h4>
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
        <SelectField
          id="level"
          label="Level"
          options={["junior", "senior"]}
          register={register}
          errorMessage={errors.level?.message || ""}
        />
        {levelOption === "junior" && (
          <div className="flex min-w-full flex-wrap gap-4">
            {juniorFields.map((field, index) => (
              <div key={field.id}>
                <label>
                  <input
                    type="checkbox"
                    {...register(`juniorClasses.${index}.checked` as const)}
                    defaultChecked={field.checked}
                    className="mr-2"
                  />
                  {field.label}
                </label>
              </div>
            ))}
          </div>
        )}
        {levelOption === "senior" && (
          <div className="grid min-w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {seniorFields.map((field, index) => (
              <div key={field.id}>
                <label>
                  <input
                    type="checkbox"
                    {...register(`seniorClasses.${index}.checked` as const)}
                    defaultChecked={field.checked}
                    className="mr-2"
                  />
                  {field.label}
                </label>
              </div>
            ))}
          </div>
        )}
        {/**
         * If selected value is Junior, render a checkbox list that shows high level junior classes (i.e JSS1, JSS2, JSS3),
         * all options should be checked by default
         * If selected values is Senior, render a checkbox list that shows high level senior classes bassed on Departments
         * Art
         * - SS1
         * - SS2
         * - SS3
         * Science
         * - SS1
         * - SS2
         * - SS3
         * Commercial
         * - SS1
         * - SS2
         * - SS3
         *
         * None of the values should be checked by default
         */}
      </div>
    </div>
  );
}
