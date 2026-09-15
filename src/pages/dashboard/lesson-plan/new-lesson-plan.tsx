import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Modal, notification } from "antd";
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
  useAllClassesForLesson,
  useAllSubjectsForLesson,
  useCreateLesson,
} from "@/templates/LessonPlan/hooks";
import {
  NewLessonPlanContextType,
  newLessonPlanSchema,
  NewLessonPlanSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<NewLessonPlanContextType | undefined>(
  undefined
);

// Parses a free-text duration like "2 weeks" or "3 months" into the
// { number, period } shape the backend expects. Defaults to 1 week if
// nothing recognizable was typed.
function parseDuration(input: string): {
  number: number;
  period: "hour" | "week" | "month";
} {
  const match = input.match(/\d+/);
  const number = match ? parseInt(match[0], 10) : 1;

  let period: "hour" | "week" | "month" = "week";
  if (/hour/i.test(input)) period = "hour";
  else if (/month/i.test(input)) period = "month";
  else if (/week/i.test(input)) period = "week";

  return { number, period };
}

export default function NewLessonPlan() {
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = React.useState(false);
  const [createdId, setCreatedId] = React.useState("");

  const { data: classesData } = useAllClassesForLesson();
  const { data: subjectsData } = useAllSubjectsForLesson();
  const { createLesson, isCreatingLesson } = useCreateLesson(api);

  const classOptions = (classesData?.classes ?? []).map(
    (c: { _id: string; name: string }) => ({ value: c._id, label: c.name })
  );
  const subjectOptions = (subjectsData?.subjects ?? []).map(
    (s: { _id: string; name: string }) => ({ value: s.name, label: s.name })
  );

  const onSubmit = (data: NewLessonPlanSchemaType) => {
    createLesson(
      {
        title: data.lesson_title,
        subject: data.subject,
        class_id: [data.class],
        duration: parseDuration(data.duration),
        lesson_plan: data.lesson_plan_overview,
        objectives: data.weekly_plan_objectives,
      },
      {
        onSuccess: response => {
          setCreatedId(response._id);
          setOpen(true);
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NewLessonPlanSchemaType>({
    resolver: zodResolver(newLessonPlanSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);
  return (
    <ReactHookForm.Provider value={{ register, errors, open }}>
      {contextHolder}
      <Container headerTitle={"New Lesson Plan"}>
        <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_LESSON_PLAN}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-purple-700"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
          </div>
          <section className="mt-5 rounded-lg border border-border-colour-light bg-white p-5 sm:p-7">
            <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
              Create a lesson plan
            </h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Add the lesson information, overview, and learning objectives.
            </p>
            <LessonInformation
              classOptions={classOptions}
              subjectOptions={subjectOptions}
              createdId={createdId}
            />
            <ul className="flex flex-col-reverse gap-2 border-t border-border-colour-light pt-6 sm:flex-row sm:justify-end">
              <li className="sm:w-auto">
                <Link
                  href={DASHBOARD_LESSON_PLAN}
                  className="inline-block w-full rounded-lg border border-border-colour-light px-8 py-3 text-center text-sm font-semibold text-Text-high-emphasis sm:w-auto"
                >
                  Cancel
                </Link>
              </li>
              <li className="sm:w-auto">
                <button
                  className="w-full rounded-lg bg-primary-purple-700 px-10 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isCreatingLesson}
                >
                  <LoadingState label="Save" isSubmitting={isCreatingLesson} />
                </button>
              </li>
            </ul>
          </section>
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

function LessonInformation({
  classOptions,
  subjectOptions,
  createdId,
}: {
  classOptions: { value: string; label: string }[];
  subjectOptions: { value: string; label: string }[];
  createdId: string;
}) {
  const { register, errors, open } = useFormContext();

  const router = useRouter();

  return (
    <section>
      <Modal
        title=""
        centered
        open={open}
        onOk={() => router.push(DASHBOARD_LESSON_PLAN_INFO(createdId))}
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
            You have successfully added a new lesson plan.
          </p>
        </section>
      </Modal>
      <div className="my-8 grid gap-8 pb-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div>
          <h4 className="text-Text-high-emphasis font-semibold">
            Lesson plan information
          </h4>
          <p className="mt-1 text-sm tracking-tight text-Text-meduim-emphasis">
            This will be displayed on lesson plan detail page.
          </p>
        </div>
        <div className="flex min-w-0 flex-col flex-wrap gap-5 sm:flex-row">
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
            options={subjectOptions}
            register={register}
            errorMessage={errors.subject?.message || ""}
          />
          <SelectField
            id="class"
            label="Class"
            options={classOptions}
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
