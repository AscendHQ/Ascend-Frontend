import { StatCard, TableData } from "./components";
import { useStaffStatistics } from "./hooks";

export const StaffStatistics = ({ data }: { data: TableData }) => {
  const {
    noOfFemaleStaff,
    noOfMaleStaff,
    noOfAdventistStaff,
    noOfNonAdventistStaff,
    noOfIslamStaff,
  } = useStaffStatistics({
    data,
  });
  return (
    <div className="flex gap-6">
      <StatCard
        heading="Gender"
        items={[
          {
            name: sexOptions.m,
            value: noOfMaleStaff,
          },
          {
            name: sexOptions.f,
            value: noOfFemaleStaff,
          },
        ]}
      />

      <StatCard
        heading="Denomination"
        items={[
          {
            name: denominationOptions.a,
            value: noOfAdventistStaff,
          },
          {
            name: denominationOptions.na,
            value: noOfNonAdventistStaff,
          },
          {
            name: denominationOptions.i,
            value: noOfIslamStaff,
          },
        ]}
      />
    </div>
  );
};

const sexOptions = {
  m: "Male",
  f: "Female",
};

const denominationOptions = {
  a: "Adventist",
  na: "Non-Adventist",
  i: "Islam",
};
