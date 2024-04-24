/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import SelectField from "@/components/ui/form/selectfield";
import TextField from "@/components/ui/form/textfield";
import { useFormContext } from "@/hooks/useFormContext";
import { StudentInfoContext } from "@/pages/dashboard/database/students/[studentInfo]";

export default function EditAcademicDetails() {
  const { register, errors, classData } = useFormContext(StudentInfoContext);
  // return (
  //   <div className="flex justify-between flex-col lg:flex-row gap-16 pb-5 mb-6 border-b-2 border-border-colour-light">
  //     <div className="w-96">
  //       <h4 className="text-Text-high-emphasis font-semibold">
  //         Class information
  //       </h4>
  //       <p className="text-sm tracking-tight text-gray-800">
  //         This will be displayed on the student's profile.
  //       </p>
  //     </div>
  //     <div className="flex-1">
  //       <div className="flex gap-3 flex-col lg:flex-row">
  //         <div className="border-1.5 border-border-colour-light space-y-1 rounded-lg p-3.5 min-w-[200px]">
  //           <h4 className="text-xs font-medium mb-1 text-gray-800">
  //             CURRENT CLASS
  //           </h4>
  //           <span className="text-xl font-bold ">SS1a</span>
  //         </div>
  //         <div className="border-1.5 border-border-colour-light space-y-1 rounded-lg p-3.5 min-w-[200px]">
  //           <h4 className="text-xs font-medium text-gray-800">CLASS SIZE</h4>
  //           <p className="border-none text-sm p-0">
  //             <span className="text-xl font-bold">50</span> students
  //           </p>
  //         </div>
  //       </div>
  //       <h5 className="text-gray-800 text-sm my-3 font-medium">
  //         Class Position History
  //       </h5>
  //       <div className="flex gap-5 flex-wrap">
  //         {Array.from({ length: 2 }).map((_, i) => (
  //           <div
  //             className="border-1.5 border-border-colour-light space-y-1 rounded-lg p-3.5 min-w-[190px]"
  //             key={i}
  //           >
  //             <h4 className="text-xs font-medium text-gray-800">
  //               {/* @ts-ignore */}
  //               {terms[(i + 1).toString()]} Term
  //             </h4>
  //             <p className="border-none text-sm p-0">
  //               <span className="text-lg font-bold">12th</span> of 50 students
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic Details
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student’s profile.
        </p>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        <SelectField
          id="class"
          label="Class"
          options={classData?.map(data => ({
            value: data._id,
            label:
              data.level === "junior"
                ? `${data.name} - ${data.other_section}`
                : `${data.name} - ${data.section}`,
          }))}
          register={register}
          errorMessage={errors.class?.message || ""}
        />
        <TextField
          id="previous_school_attended"
          label="Previous School Attended"
          register={register}
          errorMessage={errors.previous_school_attended?.message || ""}
        />

        {/* <TextField
          id="extracurricular_activities"
          label="Extracurricular Activities"
          register={register}
          isFullWidth
          errorMessage={errors["extracurricular_activities"]?.message || ""}
        /> */}
      </div>
    </div>
  );
}
// const terms = {
//   1: "1st",
//   2: "2nd",
// };
