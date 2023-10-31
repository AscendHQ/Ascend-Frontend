/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import DatabaseTeacherContainer from "@/components/layout/database-teacher/container";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import {
  EditStaffContextType,
  editStaffSchema,
  EditStaffSchemaType,
} from "@/types/form";

export const ReactHookForm = React.createContext<
  EditStaffContextType | undefined
>(undefined);

export default function DatabaseTeacherBiodata() {
  const router = useRouter();
  const id = router.query.teacherInfo as string;
  const initialValuesRef = React.useRef<EditStaffSchemaType | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm<EditStaffSchemaType>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: {
      first_name: "John",
      last_name: "Doe",
    },
  });

  React.useEffect(() => {
    initialValuesRef.current = getValues();
  }, []);

  const onSubmit = (data: EditStaffSchemaType) => {
    console.log(data, "datauBAaHqHy");
    const changedData = {} as EditStaffSchemaType;

    const keys = Object.keys(data) as Array<keyof EditStaffSchemaType>;
    keys.forEach(key => {
      if (
        data.hasOwnProperty(key) &&
        initialValuesRef.current &&
        initialValuesRef.current[key] !== data[key]
      ) {
        changedData[key] = data[key];
      }
    });

    console.log("Changed data:", changedData);
  };

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <DatabaseTeacherContainer
        headerTitle={id?.split("-")?.join(" ")?.toUpperCase()}
        teacherInfo={id}
      >
        <main className="h-full">
          <TeacherBiodata
            isDirty={!isDirty}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          <PersonalInformation />
          <OfficialInformation />
        </main>
      </DatabaseTeacherContainer>
    </ReactHookForm.Provider>
  );
}
function TeacherBiodata({
  isDirty,
  handleSubmit,
  onSubmit,
}: {
  isDirty: boolean;
  handleSubmit: any;
  onSubmit: any;
}) {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Teacher Biodata
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your student biodata here
        </p>
      </div>
      <DashboardButton
        variant="primary"
        disabled={isDirty}
        onClick={handleSubmit(onSubmit)}
      >
        Save Changes
      </DashboardButton>
    </div>
  );
}

function PersonalInformation() {
  const { register, errors } = useFormContext(ReactHookForm);

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Personal information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="first_name"
          label="First name"
          placeholder="Babalola"
          required
          register={register}
          errorMessage={errors.first_name?.message || ""}
        />
        <TextField
          id="last_name"
          label="Last name"
          placeholder="Okowah"
          required
          register={register}
          errorMessage={errors.last_name?.message || ""}
        />

        <SelectField
          id="sex"
          label="Sex"
          register={register}
          options={["male", "female"]}
          errorMessage={errors.sex?.message || ""}
        />
        <SelectField
          id="denomination"
          label="Denomination"
          register={register}
          options={[
            DenominationValue.Islam,
            DenominationValue.Adventist,
            DenominationValue["Non adventist"],
          ]}
          errorMessage={errors.denomination?.message || ""}
        />

        <TextField
          id="date_of_birth"
          label="Date of Birth"
          required
          type="date"
          register={register}
          errorMessage={errors?.date_of_birth?.message || ""}
        />
        <TextField
          id="phone_number"
          label="Phone number"
          placeholder="0900 000 0000"
          required
          register={register}
          errorMessage={errors.phone_number?.message || ""}
        />

        <TextAreaWithLabelAndCount
          id="home_address"
          label="Home Address"
          placeholder="Enter your home address"
          maxLength={50}
          showCharacterCount={false}
          register={register}
          isFullWidth
          errorMessage={errors.home_address?.message || ""}
        />
      </div>
    </div>
  );
}

const DenominationValue = {
  Islam: "islam",
  Adventist: "adventist",
  "Non adventist": "non_adventist",
};

function OfficialInformation() {
  const { register, errors } = useFormContext(ReactHookForm);
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Official information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <TextField
          id="job_title"
          label="Job title"
          placeholder="Teacher"
          required
          register={register}
          errorMessage={errors.job_title?.message || ""}
        />
        <SelectField
          id="status"
          label="Status"
          register={register}
          options={[statusValues.Teaching, statusValues["Non-Teaching"]]}
          errorMessage={errors.status?.message || ""}
        />
        <SelectField
          id="type"
          label="Type"
          register={register}
          options={[typeValues.Permanent, typeValues["Part-Time"]]}
          errorMessage={errors.type?.message || ""}
        />

        <TextField
          id="department"
          label="Department"
          placeholder="Science"
          register={register}
          errorMessage={errors.department?.message || ""}
        />
        <SelectField
          id="educational_qualification"
          label="Highest Educational Qualification"
          register={register}
          options={["PhD", "BSc", "MD/JD/MBA", "MSc", "HND", "OND", "SSCE"]}
          errorMessage={errors.educational_qualification?.message || ""}
        />
      </div>
    </div>
  );
}

const typeValues = {
  Permanent: "permanent",
  "Part-Time": "part_time",
};

const statusValues = {
  Teaching: "teaching",
  "Non-Teaching": "none_teaching",
};
