import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { StudentInfoContext } from "@/pages/dashboard/database/students/[studentInfo]";

export default function EditGuardianInformation() {
  const { register, errors } = useFormContext(StudentInfoContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Guardian/Parent information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="guardian_first_name"
          label="First name"
          placeholder="Cameron"
          required
          defaultValue={"Fred"}
          register={register}
          errorMessage={errors.guardian_first_name?.message || ""}
        />
        <TextField
          id="guardian_last_name"
          label="Last name"
          placeholder="Huff"
          defaultValue={"Ogundipe"}
          required
          register={register}
          errorMessage={errors.guardian_last_name?.message || ""}
        />
        <TextField
          id="guardian_relationship_with_student"
          label="Relationship with Student"
          placeholder="Parent"
          required
          register={register}
          defaultValue={"Parent"}
          errorMessage={
            errors.guardian_relationship_with_student?.message || ""
          }
        />
        <TextField
          id="guardian_contact_details"
          label="Contact Details"
          placeholder="(217) 555-0113"
          required
          defaultValue={"(234)9034430564"}
          register={register}
          errorMessage={errors.guardian_contact_details?.message || ""}
        />
        <TextField
          id="guardian_email_address"
          label="Email Address"
          placeholder="carson@gmail.com"
          required
          defaultValue={"micheal809@gmail.com"}
          register={register}
          errorMessage={errors.guardian_email_address?.message || ""}
        />
      </div>
    </div>
  );
}
