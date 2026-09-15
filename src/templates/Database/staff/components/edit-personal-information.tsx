import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/staff/[teacherInfo]";

export default function EditPersonalInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border-colour-light pb-10 lg:flex-row lg:gap-12">
      <div className="w-full lg:w-60">
        <h4 className="text-Text-high-emphasis font-semibold">
          Personal information
        </h4>
        <p className="mt-1 text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="surname"
          label="First name"
          placeholder="Babalola"
          required
          register={register}
          errorMessage={errors.surname?.message || ""}
        />
        <TextField
          id="other_names"
          label="Last name"
          placeholder="Okowah"
          required
          register={register}
          errorMessage={errors?.other_names?.message || ""}
        />

        <SelectField
          id="sex"
          label="Sex"
          register={register}
          options={["male", "female"]}
          errorMessage={errors.sex?.message || ""}
        />
        <SelectField
          id="denomination"
          label="Denomination"
          register={register}
          options={[
            DenominationValue.Islam,
            DenominationValue.Adventist,
            DenominationValue["Non adventist"],
          ]}
          errorMessage={errors.denomination?.message || ""}
        />
        <TextField
          id="phone_number"
          label="Phone number"
          placeholder="0900 000 0000"
          required
          register={register}
          errorMessage={errors.phone_number?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="address"
          label="Home Address"
          placeholder="Enter your home address"
          maxLength={50}
          showCharacterCount={false}
          register={register}
          isFullWidth
          errorMessage={errors.address?.message || ""}
        />
      </div>
    </div>
  );
}
const DenominationValue = {
  Islam: "islam",
  Adventist: "adventist",
  "Non adventist": "non_adventist",
};
