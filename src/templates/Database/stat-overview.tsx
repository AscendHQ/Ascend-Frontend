/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";

export default function StatOverview() {
  return (
    <div className="flex justify-center xl:justify-between my-9 flex-wrap gap-5 2xl:gap-10 xl:gap-2 xl:flex-nowrap">
      {statDetails.map(item => (
        <section
          className="flex flex-1 border border-border-colour-light gap-4 p-3 rounded"
          key={item.title}
        >
          <Icon
            icon={item.iconName}
            className="border-1.5 p-3 border-border-colour-light text-gray-800 rounded-md"
            fontSize={55}
          />
          <div className="">
            <h3 className="text-xs text-gray-800 font-medium">{item.title}</h3>
            <p className="text-Text-high-emphasis text-xl font-bold">
              {item.number}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
const statDetails = [
  {
    iconName: "fluent:people-20-regular",
    title: "TOTAL STUDENT POPULATION",
    number: "2,240",
  },
  {
    iconName: "solar:calendar-outline",
    title: "ATTENDANCE RATE",
    number: "1,432",
  },
  {
    iconName: "solar:chart-outline",
    title: "AVERAGE STUDENT PERFOMANCE",
    number: "88 / 100",
  },
];
