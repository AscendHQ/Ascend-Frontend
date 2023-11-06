import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/staff/[teacherInfo]";

export default function EditPersonalInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  console.log({ errors });

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Personal information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
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
