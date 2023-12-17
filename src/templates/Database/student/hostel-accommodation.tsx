import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewStudentFormContext } from "@/pages/dashboard/database/students/new-student";

export default function HostelAccommodation() {
  const { register, errors } = useFormContext(NewStudentFormContext);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-10 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
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
