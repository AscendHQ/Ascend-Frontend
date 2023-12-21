import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { StudentInfoContext } from "@/pages/dashboard/database/students/[studentInfo]";

export default function EditPersonalInformation() {
  const { register, errors } = useFormContext(StudentInfoContext);
  // const nationalityOption = watch("nationality");

  return (
    <div
      className={
        "flex flex-col lg:flex-row justify-between gap-16 pb-16 border-b-2 mb-8 mt-5 border-border-colour-light"
      }
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
          defaultValue={"Alma"}
          register={register}
          errorMessage={errors.first_name?.message || ""}
        />
        <TextField
          id="middle_name"
          label="Middle name"
          placeholder="Lily"
          required
          defaultValue={"Amy"}
          register={register}
          errorMessage={errors.middle_name?.message || ""}
        />
        <TextField
          id="last_name"
          label="Last name"
          placeholder="Curtis"
          defaultValue={"Lambert"}
          required
          register={register}
          errorMessage={errors.last_name?.message || ""}
        />
        <SelectField
          id="gender"
          label="Gender"
          options={["Male", "Female"]}
          register={register}
          defaultValue={"Male"}
          errorMessage={errors.gender?.message || ""}
        />
        <TextField
          id="date_of_birth"
          label="Date of Birth"
          type="date"
          required
          register={register}
          defaultValue={"2023-04-01"}
          errorMessage={errors.date_of_birth?.message || ""}
        />
        <SelectField
          id="religion"
          label="Religion"
          options={["Christain", "Muslim"]}
          register={register}
          defaultValue={"Christain"}
          errorMessage={errors.religion?.message || ""}
        />
        <SelectField
          id="state_of_origin"
          label="State of Origin"
          options={["Ondo", "Ekiti", "Edo", "Oyo", "Lagos", "Kwara"]}
          register={register}
          defaultValue={"Ondo"}
          errorMessage={errors.state_of_origin?.message || ""}
        />
        <SelectField
          id="local_government_area"
          label="Local Government Area"
          options={["Odigbo", "Ifon", "Okitipupa", "Ikorodu", "Oshodi"]}
          register={register}
          defaultValue={"Ifon"}
          errorMessage={errors.state_of_origin?.message || ""}
        />
      </div>
    </div>
  );
}
