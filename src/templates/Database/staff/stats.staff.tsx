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
    <div className="grid gap-4 lg:grid-cols-2">
      <StatCard
        heading="Gender"
        items={[
          {
            name: sexOptions.male,
            value: data.data.noOfMaleStaff,
          },
          {
            name: sexOptions.female,
            value: data.data.noOfFemaleStaff,
          },
        ]}
      />

      <StatCard
        heading="Denomination"
        items={[
          {
            name: denominationOptions.adventist,
            value: data.data.noOfAdventistStaff,
          },
          {
            name: denominationOptions.non_adventist,
            value: data.data.noOfNonAdventistStaff,
          },
          {
            name: denominationOptions.islam,
            value: data.data.noOfIslamStaff,
          },
        ]}
      />
    </div>
  );
};

export const sexOptions = {
  male: "Male",
  female: "Female",
};

export const denominationOptions = {
  adventist: "Adventist",
  non_adventist: "Non-Adventist",
  islam: "Islam",
};
