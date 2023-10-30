import { StatCard } from "./components";

export const StaffStatistics = (data: {
  data: {
    noOfMaleStaff: number;
    noOfFemaleStaff: number;
    noOfAdventistStaff: number;
    noOfNonAdventistStaff: number;
    noOfIslamStaff: number;
  };
}) => {
  return (
    <div className="flex gap-6">
      <StatCard
        heading="Gender"
        items={[
          {
            name: sexOptions.m,
            value: data.data.noOfMaleStaff,
          },
          {
            name: sexOptions.f,
            value: data.data.noOfFemaleStaff,
          },
        ]}
      />

      <StatCard
        heading="Denomination"
        items={[
          {
            name: denominationOptions.a,
            value: data.data.noOfAdventistStaff,
          },
          {
            name: denominationOptions.na,
            value: data.data.noOfNonAdventistStaff,
          },
          {
            name: denominationOptions.i,
            value: data.data.noOfIslamStaff,
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
