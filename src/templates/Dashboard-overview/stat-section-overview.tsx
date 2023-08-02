import { Icon } from "@iconify/react";

export default function StatSectionOverview() {
  return (
    <div className="grid 2xl:flex grid-cols-1 lg:grid-cols-2 justify-center flex-wrap my-5 gap-5 ">
      <StatCard
        heading="TOTAL STUDENT POPULATION"
        number="42,426"
        percent="+ 36%"
        performance="increase"
      />
      <StatCard
        heading="ATTENDANCE RATE"
        number="38,485"
        percent="- 14%"
        performance="decrease"
      />
      <StatCard
        heading="TOTAL STAFF COUNT"
        number="4,382"
        percent="+ 36%"
        performance="increase"
      />
      <div className="bg-white min-w-[330px] 2xl:flex-1 2xl:min-w-fit border-2 rounded-xl border-border-colour-light p-4 space-y-2">
        <h5 className="text-sm text-gray-800 font-medium">
          GENDER DEMOGRAPHICS
        </h5>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">MALE</p>
            <span className="text-2xl font-bold">68%</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">FEMALE</p>
            <span className="text-2xl font-bold">32%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function StatCard({
  heading,
  number,
  percent,
  performance,
}: {
  heading: string;
  number: string;
  percent: string;
  performance: "increase" | "decrease";
}) {
  return (
    <div className="bg-white min-w-[330px] xl:flex-1 xl:min-w-fit border-2 rounded-xl border-border-colour-light p-4 space-y-2">
      <h5 className="text-sm text-gray-800 font-medium">{heading}</h5>
      <div className="flex items-end justify-between">
        <p className="text-Text-high-emphasis text-3xl font-bold">{number}</p>
        <div
          className={`flex items-center ${
            performance === "increase"
              ? "text-secondary-green-600"
              : "text-secondary-red-600"
          }`}
        >
          <span>{percent}</span>
          {performance === "increase" ? (
            <Icon icon="tabler:arrow-up" />
          ) : (
            <Icon icon="tabler:arrow-up" rotate={90} />
          )}
        </div>
      </div>
    </div>
  );
}
