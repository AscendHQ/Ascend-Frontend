import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/classes/[classInfo]";

export default function EditClassInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
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
          options={["Junior", "Senior"]}
          register={register}
          isFullWidth
          errorMessage={errors.level?.message || ""}
        />
      </div>
    </div>
  );
}
