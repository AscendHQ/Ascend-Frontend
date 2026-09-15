import React from "react";

import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { NewClassFormContext } from "@/pages/dashboard/database/classes/new-class";

import JuniorLevelSections from "./JuniorLevelSections";

export default function ClassInformation() {
  const { register, errors, watch } = useFormContext(NewClassFormContext);

  const levelOption = watch("level");

  return (
    <div className="my-8 grid gap-8 border-b border-border-colour-light pb-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div>
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
      </div>
      <div className="flex min-w-0 flex-col flex-wrap gap-5 sm:flex-row">
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
          <div className="flex min-w-full flex-wrap gap-4">
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
