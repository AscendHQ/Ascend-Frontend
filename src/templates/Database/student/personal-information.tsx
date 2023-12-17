import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewStudentFormContext } from "@/pages/dashboard/database/students/new-student";

export default function PersonalInformation() {
  const { register, errors, watch } = useFormContext(NewStudentFormContext);
  const nationalityOption = watch("nationality");

  return (
    <div
      className={`flex flex-col lg:flex-row justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light`}
    >
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
          id="first_name"
          label="First name"
          placeholder="Rhoda"
          required
          register={register}
          errorMessage={errors.first_name?.message || ""}
        />
        <TextField
          id="middle_name"
          label="Middle name"
          placeholder="Lily"
          required
          register={register}
          errorMessage={errors.middle_name?.message || ""}
        />
        <TextField
          id="last_name"
          label="Last name"
          placeholder="Curtis"
          required
          register={register}
          errorMessage={errors.last_name?.message || ""}
        />
        <SelectField
          id="gender"
          label="Gender"
          options={["Male", "Female"]}
          register={register}
          errorMessage={errors.gender?.message || ""}
        />
        <TextField
          id="date_of_birth"
          label="Date of Birth"
          type="date"
          required
          register={register}
          errorMessage={errors.date_of_birth?.message || ""}
        />
        <SelectField
          id="religion"
          label="Religion"
          options={["Christain", "Muslim"]}
          register={register}
          errorMessage={errors.religion?.message || ""}
        />

        <SelectField
          id="nationality"
          label="Nationality"
          options={["Nigeria", "Ghana"]}
          register={register}
          errorMessage={errors.nationality?.message || ""}
        />

        {nationalityOption === "Nigeria" && (
          <SelectField
            id="state_of_origin"
            label="State of Origin"
            options={["Ondo", "Ekiti", "Edo", "Oyo", "Lagos", "Kwara"]}
            register={register}
            errorMessage={errors.state_of_origin?.message || ""}
          />
        )}
        {nationalityOption === "Nigeria" && (
          <SelectField
            id="local_government_area"
            label="Local Government Area"
            options={["Odigbo", "Ifon", "Okitipupa", "Ikorodu", "Oshodi"]}
            register={register}
            errorMessage={errors.state_of_origin?.message || ""}
          />
        )}
      </div>
    </div>
  );
}
