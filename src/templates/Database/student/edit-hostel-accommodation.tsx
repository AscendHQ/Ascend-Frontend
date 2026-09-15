import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { StudentInfoContext } from "@/pages/dashboard/database/students/[studentInfo]";

export default function EditHostelAccommodation() {
  const { register, errors } = useFormContext(StudentInfoContext);

  return (
    <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border-colour-light pb-10 lg:flex-row lg:gap-12">
      <div className="w-full lg:w-60">
        <h4 className="text-Text-high-emphasis font-semibold">
          Hostel / accommodation
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="hostel_block"
          label="Block"
          placeholder="Block 2"
          required
          register={register}
          errorMessage={errors["hostel_block"]?.message || ""}
        />

        <TextField
          id="hostel_room-number"
          label="Room number"
          placeholder="09"
          required
          register={register}
          errorMessage={errors["hostel_room-number"]?.message || ""}
        />
      </div>
    </div>
  );
}
