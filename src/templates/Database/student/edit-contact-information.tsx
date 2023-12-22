import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { StudentInfoContext } from "@/pages/dashboard/database/students/[studentInfo]";

export default function EditContactInformation() {
  const { register, errors } = useFormContext(StudentInfoContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
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
          defaultValue={"32 Kudirat Abiola Road, Ikeja."}
          errorMessage={errors.residential_address?.message || ""}
        />
        <TextField
          id="contact_details"
          label="Contact Details"
          placeholder="(217) 555-0113"
          required
          register={register}
          defaultValue={"(234)8058189620"}
          errorMessage={errors.contact_details?.message || ""}
        />
      </div>
    </div>
  );
}
