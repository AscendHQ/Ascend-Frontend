import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewStudentFormContext } from "@/pages/dashboard/database/students/new-student";

export default function AddContactInformation() {
  const { register, errors } = useFormContext(NewStudentFormContext);
  return (
    <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border-colour-light pb-10 lg:flex-row lg:gap-12">
      <div className="w-full lg:w-60">
        <h4 className="text-Text-high-emphasis font-semibold">
          Contact information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="residential_address"
          label="Residential Address"
          placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
          required
          register={register}
          isFullWidth
          errorMessage={errors.residential_address?.message || ""}
        />
        <TextField
          id="contact_details"
          label="Contact Details"
          placeholder="(217) 555-0113"
          required
          register={register}
          errorMessage={errors.contact_details?.message || ""}
        />
      </div>
    </div>
  );
}
