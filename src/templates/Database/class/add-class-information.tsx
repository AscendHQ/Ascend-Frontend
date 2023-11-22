import React from "react";

import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { ReactHookForm } from "@/pages/dashboard/database/classes/new-class";

import JuniorLevelSections from "./JuniorLevelSections";

export default function ClassInformation() {
  const { register, errors, watch } = useFormContext(ReactHookForm);

  const levelOption = watch("level");

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 my-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="class_name"
          label="Class name"
          placeholder="Enter a class name"
          required
          register={register}
          errorMessage={errors.class_name?.message || ""}
        />
        <SelectField
          id="level"
          label="Level"
          options={["junior", "senior"]}
          register={register}
          isFullWidth
          errorMessage={errors.level?.message || ""}
        />
        {levelOption === "junior" && <JuniorLevelSections />}
        {levelOption === "senior" && (
          <div className="min-w-full space-x-4">
            {["Science", "Art", "Commercial"].map(item => (
              <label key={item}>
                <input
                  type="radio"
                  value={item}
                  {...register("radioButtonValue")}
                  className="mr-1"
                />
                {item}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
