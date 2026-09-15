import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/classes/[classInfo]";

export default function EditClassInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="my-8 grid gap-8 border-b border-border-colour-light pb-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div>
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
      </div>
      <div className="flex min-w-0 flex-col flex-wrap gap-5 sm:flex-row">
        <TextField
          id="class_name"
          label="Class name"
          placeholder="SS2B"
          required
          defaultValue="SS1A"
          register={register}
          errorMessage={errors.class_name?.message || ""}
        />
        <SelectField
          id="level"
          label="Level"
          options={["junior", "senior"]}
          register={register}
          isFullWidth
          errorMessage={errors.level?.message || ""}
        />
      </div>
    </div>
  );
}
