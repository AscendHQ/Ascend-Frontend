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
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_LESSON_PLAN } from "@/config/links";
import {
  useAllClassesForLesson,
  useAllSubjectsForLesson,
  useLessonById,
  useUpdateLesson,
} from "@/templates/LessonPlan/hooks";
import {
  LessonPlanInfoContextType,
  lessonPlanInfoSchema,
  LessonPlanInfoSchemaType,
} from "@/types/form";

const ReactHookForm = React.createContext<
  LessonPlanInfoContextType | undefined
>(undefined);

export default function LessonPlanInfo() {
  const router = useRouter();
  const id = router.query.lessonPlanInfo as string;
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = React.useState(false);

  const { data: lesson, isLoading } = useLessonById(id);
  const { data: classesData } = useAllClassesForLesson();
  const { data: subjectsData } = useAllSubjectsForLesson();
  const { updateLesson, isUpdatingLesson } = useUpdateLesson(api);

  const classOptions = (classesData?.classes ?? []).map(
    (c: { _id: string; name: string }) => ({ value: c._id, label: c.name })
  );
  const subjectOptions = (subjectsData?.subjects ?? []).map(
    (s: { _id: string; name: string }) => ({ value: s.name, label: s.name })
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonPlanInfoSchemaType>({
    resolver: zodResolver(lessonPlanInfoSchema),
  });

  React.useEffect(() => {
    if (lesson) {
      reset({
        lesson_title: lesson.title,
        subject: lesson.subject,
        class: lesson.class?.[0]?._id ?? "",
        duration: `${lesson.duration?.number ?? ""} ${
          lesson.duration?.period ?? ""
        }`.trim(),
        lesson_plan_overview: lesson.lesson_plan,
        weekly_plan_objectives: lesson.objectives,
      });
    }
  }, [lesson, reset]);

  const onSubmit = (data: LessonPlanInfoSchemaType) => {
    const match = data.duration.match(/\d+/);
    const number = match ? parseInt(match[0], 10) : 1;
    let period: "hour" | "week" | "month" = "week";
    if (/hour/i.test(data.duration)) period = "hour";
    else if (/month/i.test(data.duration)) period = "month";

    updateLesson(
      {
        id,
        data: {
          title: data.lesson_title,
          subject: data.subject,
          class_id: [data.class],
          duration: { number, period },
          lesson_plan: data.lesson_plan_overview,
          objectives: data.weekly_plan_objectives,
        },
      },
      { onSuccess: () => setOpen(true) }
    );
  };

  return (
    <ReactHookForm.Provider value={{ register, errors, open }}>
      {contextHolder}
      <Container headerTitle={lesson?.title ?? "Lesson Plan"}>
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
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !lesson ? (
            <div className="flex justify-center py-16 text-Text-meduim-emphasis">
              Lesson plan not found.
            </div>
          ) : (
            <section className="mt-5 rounded-lg border border-border-colour-light bg-white p-5 sm:p-7">
              <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
                Edit lesson plan
              </h1>
              <p className="mt-1 text-sm text-Text-meduim-emphasis">
                Update the lesson information and objectives.
              </p>
              <LessonInformation
                classOptions={classOptions}
                subjectOptions={subjectOptions}
              />

              <button
                className="ml-auto block w-full rounded-lg bg-primary-purple-700 px-10 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
                onClick={handleSubmit(onSubmit)}
                disabled={isUpdatingLesson}
              >
                <LoadingState label="Save" isSubmitting={isUpdatingLesson} />
              </button>
            </section>
          )}
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
}: {
  classOptions: { value: string; label: string }[];
  subjectOptions: { value: string; label: string }[];
}) {
  const { register, errors, open } = useFormContext();

  return (
    <section>
      <Modal
        centered
        open={open}
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
        okText={"Done"}
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
            Lesson plan updated
          </h2>
          <p className="text-gray-700 font-medium px-5">
            Your changes have been saved.
          </p>
        </section>
      </Modal>
      <div className="my-8 grid gap-8 border-b border-border-colour-light pb-10 lg:grid-cols-[240px_minmax(0,1fr)]">
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
