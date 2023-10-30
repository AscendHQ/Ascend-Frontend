import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/staff/new-staff";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PersonalInformation({ staffNo }: { staffNo: string }) {
  const { register, errors } = useFormContext(ReactHookForm);

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
          id="staff_no"
          label="Staff No"
          placeholder="S175645"
          required
          defaultValue={staffNo}
          register={register}
          // readOnly
          errorMessage={errors.staff_no?.message || ""}
        />
        <TextField
          id="first_name"
          label="First name"
          placeholder="Babalola"
          required
          register={register}
          errorMessage={errors.first_name?.message || ""}
        />
        <TextField
          id="last_name"
          label="Last name"
          placeholder="Okowah"
          required
          register={register}
          errorMessage={errors.last_name?.message || ""}
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
          id="date_of_birth"
          label="Date of Birth"
          required
          type="date"
          register={register}
          errorMessage={errors?.date_of_birth?.message || ""}
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
          id="home_address"
          label="Home Address"
          placeholder="Enter your home address"
          maxLength={50}
          showCharacterCount={false}
          register={register}
          isFullWidth
          errorMessage={errors.home_address?.message || ""}
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
