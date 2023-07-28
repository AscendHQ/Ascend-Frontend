import { Icon } from "@iconify/react";

export default function StatSectionOverview() {
  return (
    <div className="flex my-5 gap-5 justify-center flex-wrap">
      <div className="bg-white min-w-[300px] xl:flex-1 xl:min-w-fit border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
        <h5 className="text-sm text-Text-meduim-emphasis font-medium">
          TOTAL STUDENT POPULATION
        </h5>
        <div className="flex items-end justify-between">
          <p className="text-Text-high-emphasis text-3xl font-bold">42,426</p>
          <div className="flex items-center text-secondary-green-500">
            <span>+ 36%</span>
            <Icon icon="tabler:arrow-up" />
          </div>
        </div>
      </div>
      <div className="bg-white min-w-[300px] xl:flex-1 xl:min-w-fit border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
        <h5 className="text-sm text-Text-meduim-emphasis font-medium">
          ATTENDANCE RATE
        </h5>
        <div className="flex items-end justify-between">
          <p className="text-Text-high-emphasis text-3xl font-bold">38,485</p>
          <div className="flex items-center text-secondary-red-500">
            <span>- 14%</span>
            <Icon icon="tabler:arrow-up" rotate={90} />
          </div>
        </div>
      </div>
      <div className="bg-white min-w-[300px] xl:flex-1 xl:min-w-fit border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
        <h5 className="text-sm text-Text-meduim-emphasis font-medium">
          TOTAL STAFF COUNT
        </h5>
        <div className="flex items-end justify-between">
          <p className="text-Text-high-emphasis text-3xl font-bold">4,382</p>
          <div className="flex items-center text-secondary-green-500">
            <span>+ 36%</span>
            <Icon icon="tabler:arrow-up" />
          </div>
        </div>
      </div>
      <div className="bg-white min-w-[330px] 2xl:flex-1 2xl:min-w-fit border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
        <h5 className="text-sm text-Text-meduim-emphasis font-medium">
          GENDER DEMOGRAPHICS
        </h5>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-secondary-green-500 text-lg font-semibold">
              MALE
            </p>
            <span className="text-3xl font-bold">68%</span>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-primary-purple-500 text-lg font-semibold">
              FEMALE
            </p>
            <span className="text-3xl font-bold">32%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
