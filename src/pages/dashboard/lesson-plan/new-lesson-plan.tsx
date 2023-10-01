import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import {
  DASHBOARD_LESSON_PLAN,
  DASHBOARD_LESSON_PLAN_INFO,
} from "@/config/links";
import {
  NewLessonPlanContextType,
  newLessonPlanSchema,
  NewLessonPlanSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<NewLessonPlanContextType | undefined>(
  undefined
);

export default function NewLessonPlan() {
  const [open, setOpen] = React.useState(false);

  const onSubmit = (data: object) => {
    console.log(data, "data");
    setOpen(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewLessonPlanSchemaType>({
    resolver: zodResolver(newLessonPlanSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);
  return (
    <ReactHookForm.Provider value={{ register, errors, open }}>
      <Container headerTitle={"New Lesson Plan"}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_LESSON_PLAN}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
          </div>
          <LessonInformation />
          <ul className="flex gap-2 justify-end">
            <li>
              <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-14 font-semibold text-sm">
                Cancel
              </button>
            </li>
            <li>
              <button
                className="text-white bg-primary-purple-700 rounded-lg py-3 px-16 font-semibold text-sm"
                onClick={handleSubmit(onSubmit)}
              >
                <LoadingState label="Save" isSubmitting={isSubmitting} />
              </button>
            </li>
          </ul>
        </main>
      </Container>
    </ReactHookForm.Provider>
  );
}
const useFormContext = () => {
  const context = React.useContext(ReactHookForm);
  if (!context) {
    throw new Error("useFormContext must be used within a MyProvider");
  }
  return context;
};

function LessonInformation() {
  const { register, errors, open } = useFormContext();

  const router = useRouter();

  return (
    <section>
      <Modal
        title=""
        centered
        open={open}
        onOk={() =>
          router.push(
            DASHBOARD_LESSON_PLAN_INFO(
              "Physics".split(" ").join("-").toLowerCase()
            )
          )
        }
        okButtonProps={{
          style: {
            color: "#ffffff",
            minHeight: "48px",
            backgroundColor: "#7864ff",
            width: "100%",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        width={400}
        okText={"View lesson plan"}
        closeIcon={false}
      >
        <section className="text-center">
          <div className="flex justify-center items-center rounded-lg bg-success-light py-6">
            <Icon
              icon="zondicons:checkmark-outline"
              className="bg-success-light text-success-dark"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4 text-Text-high-emphasis">
            New lesson plan added
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully added a 1 week lesson plan for physics.
          </p>
        </section>
      </Modal>
      <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
        <div className="w-96">
          <h4 className="text-Text-high-emphasis font-semibold">
            Lesson plan information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on lesson plan detail page.
          </p>
        </div>
        <div className="flex flex-1 min-w-[60%] flex-wrap gap-5">
          <TextField
            id="lesson_title"
            label="Lesson title"
            placeholder="Enter a lesson title"
            required
            register={register}
            errorMessage={errors.lesson_title?.message || ""}
          />
          <SelectField
            id="subject"
            label="Subject"
            options={[
              "Use of English Language",
              "Mathematics",
              "Chemistry",
              "Physics",
              "Biology",
              "Further Mathematics",
              "Civic Education",
            ]}
            register={register}
            errorMessage={errors.subject?.message || ""}
          />
          <SelectField
            id="class"
            label="Class"
            options={["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"]}
            register={register}
            errorMessage={errors.class?.message || ""}
          />
          <TextField
            id="duration"
            label="Duration"
            placeholder="1 week"
            required
            register={register}
            errorMessage={errors.duration?.message || ""}
          />
          <TextAreaWithLabelAndCount
            id="lesson_plan_overview"
            label="Lesson plan overview"
            placeholder="What is this lesson plan about?"
            maxLength={3000}
            showCharacterCount={false}
            isFullWidth
            register={register}
            errorMessage={errors.lesson_plan_overview?.message || ""}
          />
          <TextAreaWithLabelAndCount
            id="weekly_plan_objectives"
            label="Weekly plan objectives"
            placeholder="Highlight your objectives for each week"
            maxLength={3000}
            showCharacterCount={false}
            isFullWidth
            register={register}
            errorMessage={errors.weekly_plan_objectives?.message || ""}
          />
        </div>
      </div>
    </section>
  );
}
