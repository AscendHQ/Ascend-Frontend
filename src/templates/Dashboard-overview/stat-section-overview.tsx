import { Spinner } from "@/components/ui/Loading";

import { useDashboardOverview } from "./hooks";

export default function StatSectionOverview() {
  const { data, isLoading } = useDashboardOverview();

  const totalStudents = data?.total_student ?? 0;
  const totalStaff = data?.total_staff ?? 0;
  const male = data?.gender_demographic?.male ?? "0";
  const female = data?.gender_demographic?.female ?? "0";

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid 2xl:flex grid-cols-1 lg:grid-cols-2 justify-center flex-wrap my-5 gap-5 ">
      <StatCard
        heading="TOTAL STUDENT POPULATION"
        number={totalStudents.toLocaleString()}
      />
      <StatCard
        heading="TOTAL STAFF COUNT"
        number={totalStaff.toLocaleString()}
      />
      <div className="w-full min-w-0 space-y-2 rounded-xl border border-border-colour-light bg-white p-4 2xl:min-w-fit 2xl:flex-1">
        <h5 className="text-sm text-gray-800 font-medium">
          GENDER DEMOGRAPHICS
        </h5>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base font-medium">MALE</p>
            <span className="text-2xl font-bold">{male}%</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base font-medium">FEMALE</p>
            <span className="text-2xl font-bold">{female}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function StatCard({ heading, number }: { heading: string; number: string }) {
  return (
    <div className="w-full min-w-0 space-y-2 rounded-xl border border-border-colour-light bg-white p-4 xl:min-w-fit xl:flex-1">
      <h5 className="text-sm text-gray-800 font-medium">{heading}</h5>
      <div className="flex items-end justify-between">
        <p className="text-Text-high-emphasis text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
}
