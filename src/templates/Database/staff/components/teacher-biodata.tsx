/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardButton } from "@/components/ui/button/button";

export default function TeacherBiodata({
  isDirty,
  handleSubmit,
  onSubmit,
}: {
  isDirty: boolean;
  handleSubmit: any;
  onSubmit: any;
}) {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Teacher Biodata
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your student biodata here
        </p>
      </div>
      <DashboardButton
        variant="primary"
        disabled={isDirty}
        onClick={handleSubmit(onSubmit)}
      >
        Save Changes
      </DashboardButton>
    </div>
  );
}
