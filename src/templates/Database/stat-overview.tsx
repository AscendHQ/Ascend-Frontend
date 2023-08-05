/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";

export default function StatOverview() {
  return (
    <div className="flex justify-center xl:justify-between my-9 flex-wrap gap-5 xl:gap-2 xl:flex-nowrap">
      {Array.from({ length: 3 }).map((_, i) => (
        <section
          className="flex min-w-full lg:min-w-[310px] border border-border-colour-light gap-4 p-3 rounded"
          key={i}
        >
          <Icon
            icon="fluent:people-20-regular"
            className="border-1.5 p-3 border-border-colour-light text-gray-800 rounded-md"
            fontSize={55}
          />
          <div className="">
            <h3 className="text-xs text-gray-800 font-medium">
              TOTAL STUDENT POPULATION
            </h3>
            <p className="text-Text-high-emphasis text-xl font-bold">2,240</p>
          </div>
        </section>
      ))}
    </div>
  );
}
