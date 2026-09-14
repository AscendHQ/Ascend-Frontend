import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { useOrganization } from "@/templates/Settings/hooks";
import { CbtAttempt, CbtExam, CbtQuestionInput } from "@/types/cbt";
import {
  downloadCbtQuestionTemplate,
  parseCbtQuestionCsv,
} from "@/utils/cbt-csv";

type ClassOption = {
  _id: string;
  name: string;
  section?: string;
  other_section?: string;
};
type SubjectOption = {
  _id: string;
  name: string;
  code: string;
  classes?: Array<{ _id: string } | string>;
};
type DraftQuestion = CbtQuestionInput & { client_key: string };

const optionLabels = ["A", "B", "C", "D", "E", "F"];

const requestError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: unknown } }).response;
    return String(response?.data ?? "Request failed");
  }
  return error instanceof Error ? error.message : String(error);
};

const newQuestion = (): DraftQuestion => ({
  client_key: `question-${Date.now()}-${Math.random()}`,
  prompt: "",
  options: ["", "", "", ""],
  correct_option: 0,
  marks: 1,
});

const className = (item: ClassOption) => {
  const section = item.other_section ?? item.section;
  return section ? `${item.name} - ${section}` : item.name;
};

const dateTime = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const controlClassName =
  "w-full rounded-lg border border-border-colour-light bg-neutral-300 px-3 py-2.5 text-sm text-Text-high-emphasis outline-none transition focus:border-primary-purple-500 focus:ring-2 focus:ring-primary-purple-100";

const statusStyles: Record<CbtExam["status"], string> = {
  draft: "bg-neutral-300 text-gray-600",
  published: "bg-success-light text-success-dark",
  closed: "bg-grey-200 text-gray-600",
};

function ExamCreator({ onClose }: { onClose: () => void }) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const organization = useOrganization();
  const [form, setForm] = React.useState({
    title: "",
    instructions: "",
    class_id: "",
    subject_id: "",
    session: organization.data?.academic_settings?.current_session ?? "",
    term: organization.data?.academic_settings?.current_term ?? "1st Term",
    duration_minutes: 30,
    starts_at: "",
    ends_at: "",
  });
  const [questions, setQuestions] = React.useState<DraftQuestion[]>([
    newQuestion(),
  ]);
  React.useEffect(() => {
    setForm(current => ({
      ...current,
      session:
        current.session ||
        organization.data?.academic_settings?.current_session ||
        "",
      term:
        current.term ||
        organization.data?.academic_settings?.current_term ||
        "1st Term",
    }));
  }, [organization.data]);
  const classes = useQuery({
    queryKey: ["cbtClasses"],
    queryFn: () =>
      axiosInstance
        .get("/classes")
        .then(response => response.data.classes as ClassOption[]),
  });
  const subjects = useQuery({
    queryKey: ["cbtSubjects"],
    queryFn: () =>
      axiosInstance
        .get("/subjects", { params: { limit: 500 } })
        .then(response => response.data.subjects as SubjectOption[]),
  });
  const availableSubjects = (subjects.data ?? []).filter(subject =>
    subject.classes?.length
      ? subject.classes.some(
          item => (typeof item === "string" ? item : item._id) === form.class_id
        )
      : true
  );
  const createExam = useMutation({
    mutationFn: () =>
      axiosInstance.post("/cbt/exams", {
        ...form,
        starts_at: new Date(form.starts_at).toISOString(),
        ends_at: new Date(form.ends_at).toISOString(),
        questions: questions.map(question => ({
          prompt: question.prompt,
          options: question.options,
          correct_option: question.correct_option,
          marks: question.marks,
        })),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cbtExams"] });
      api.success({ message: "CBT examination created as a draft" });
      onClose();
    },
    onError: (error: unknown) =>
      api.error({
        message: "Examination could not be created",
        description: requestError(error),
      }),
  });
  const updateQuestion = (
    questionIndex: number,
    update: Partial<CbtQuestionInput>
  ) =>
    setQuestions(current =>
      current.map((question, index) =>
        index === questionIndex ? { ...question, ...update } : question
      )
    );
  const importQuestions = async (file?: File) => {
    if (!file) return;
    try {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        throw new Error("Choose a CSV file created from the CBT template.");
      }
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("The CBT question file must be smaller than 2 MB.");
      }
      const imported = parseCbtQuestionCsv(await file.text());
      setQuestions(
        imported.map(question => ({
          ...question,
          client_key: `question-${Date.now()}-${Math.random()}`,
        }))
      );
      api.success({
        message: `${imported.length} question${
          imported.length === 1 ? "" : "s"
        } imported`,
        description: "Review the questions below before creating the draft.",
      });
    } catch (error) {
      api.error({
        message: "Questions could not be imported",
        description: requestError(error),
      });
    }
  };
  const canSubmit =
    form.title &&
    form.class_id &&
    form.subject_id &&
    form.session &&
    form.starts_at &&
    form.ends_at &&
    questions.every(
      question =>
        question.prompt.trim() &&
        question.options.every(option => option.trim())
    );

  return (
    <section className="rounded-lg border-1.5 border-border-colour-light bg-white">
      {contextHolder}
      <div className="flex items-start justify-between gap-4 border-b border-border-colour-light px-4 py-5 sm:px-6">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary-purple-700">
            New assessment
          </p>
          <h2 className="text-xl font-semibold text-Text-high-emphasis">
            Create CBT examination
          </h2>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            The examination remains private until you publish it.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close examination form"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-neutral-300 hover:text-Text-high-emphasis"
        >
          <Icon icon="material-symbols:close-rounded" className="text-2xl" />
        </button>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-purple-100 text-sm font-semibold text-primary-purple-700">
            1
          </span>
          <div>
            <h3 className="font-semibold text-Text-high-emphasis">
              Examination details
            </h3>
            <p className="text-xs text-Text-meduim-emphasis">
              Choose the class, subject, schedule and duration.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title">
            <input
              value={form.title}
              onChange={event =>
                setForm(current => ({ ...current, title: event.target.value }))
              }
              className={controlClassName}
              placeholder="First Term Mathematics CBT"
            />
          </Field>
          <Field label="Duration (minutes)">
            <input
              type="number"
              min={1}
              max={300}
              value={form.duration_minutes}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  duration_minutes: Number(event.target.value),
                }))
              }
              className={controlClassName}
            />
          </Field>
          <Field label="Class">
            <select
              value={form.class_id}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  class_id: event.target.value,
                  subject_id: "",
                }))
              }
              className={controlClassName}
            >
              <option value="">Select class</option>
              {(classes.data ?? []).map(item => (
                <option key={item._id} value={item._id}>
                  {className(item)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subject">
            <select
              value={form.subject_id}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  subject_id: event.target.value,
                }))
              }
              className={controlClassName}
            >
              <option value="">Select subject</option>
              {availableSubjects.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.code})
                </option>
              ))}
            </select>
          </Field>
          <Field label="Session">
            <input
              value={form.session}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  session: event.target.value,
                }))
              }
              className={controlClassName}
              placeholder="2026/2027"
            />
          </Field>
          <Field label="Term">
            <select
              value={form.term}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  term: event.target.value as typeof current.term,
                }))
              }
              className={controlClassName}
            >
              {["1st Term", "2nd Term", "3rd Term"].map(term => (
                <option key={term}>{term}</option>
              ))}
            </select>
          </Field>
          <Field label="Opens">
            <input
              type="datetime-local"
              value={form.starts_at}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  starts_at: event.target.value,
                }))
              }
              className={controlClassName}
            />
          </Field>
          <Field label="Closes">
            <input
              type="datetime-local"
              value={form.ends_at}
              onChange={event =>
                setForm(current => ({
                  ...current,
                  ends_at: event.target.value,
                }))
              }
              className={controlClassName}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Instructions">
              <textarea
                value={form.instructions}
                onChange={event =>
                  setForm(current => ({
                    ...current,
                    instructions: event.target.value,
                  }))
                }
                className={`${controlClassName} min-h-[96px] resize-y`}
                placeholder="Answer every question before the timer ends."
              />
            </Field>
          </div>
        </div>
      </div>
      <div className="border-t border-border-colour-light px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-purple-100 text-sm font-semibold text-primary-purple-700">
              2
            </span>
            <div>
              <h3 className="font-semibold text-Text-high-emphasis">
                Questions
              </h3>
              <p className="text-xs text-Text-meduim-emphasis">
                Enter questions individually or import the CSV template.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadCbtQuestionTemplate}
              className="flex items-center gap-2 rounded-lg border-1.5 border-border-colour-light px-3 py-2 text-sm font-semibold text-Text-high-emphasis transition hover:bg-neutral-300"
            >
              <Icon icon="material-symbols:download-rounded" />
              Template
            </button>
            <label
              htmlFor="cbt-question-csv"
              className="flex cursor-pointer items-center gap-2 rounded-lg border-1.5 border-primary-purple-700 px-3 py-2 text-sm font-semibold text-primary-purple-700 transition hover:bg-primary-purple-100"
            >
              <Icon icon="material-symbols:upload-file-outline-rounded" />
              Import CSV
              <input
                id="cbt-question-csv"
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={event => {
                  void importQuestions(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>
            <button
              type="button"
              onClick={() =>
                setQuestions(current => [...current, newQuestion()])
              }
              className="flex items-center gap-2 rounded-lg border-1.5 border-primary-purple-700 px-3 py-2 text-sm font-semibold text-primary-purple-700 transition hover:bg-primary-purple-100"
            >
              <Icon icon="material-symbols:add-rounded" /> Add question
            </button>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {questions.map((question, questionIndex) => (
            <article
              key={question.client_key}
              className="rounded-lg border-1.5 border-border-colour-light bg-grey-50 p-4 sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-Text-high-emphasis">
                  Question {questionIndex + 1}
                </p>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setQuestions(current =>
                        current.filter((_, index) => index !== questionIndex)
                      )
                    }
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-secondary-red-600 transition hover:bg-white"
                  >
                    <Icon icon="material-symbols:delete-outline-rounded" />
                    Remove
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <textarea
                  value={question.prompt}
                  onChange={event =>
                    updateQuestion(questionIndex, {
                      prompt: event.target.value,
                    })
                  }
                  className={`${controlClassName} min-h-[80px] flex-1 resize-y bg-white`}
                  placeholder="Enter question"
                />
              </div>
              <p className="mt-4 text-xs font-medium text-gray-600">
                Select the circle beside the correct answer.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionLabels[optionIndex]}
                    className={`flex items-center gap-3 rounded-lg border p-2 transition ${
                      question.correct_option === optionIndex
                        ? "border-primary-purple-500 bg-primary-purple-100"
                        : "border-border-colour-light bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`correct-${questionIndex}`}
                      checked={question.correct_option === optionIndex}
                      onChange={() =>
                        updateQuestion(questionIndex, {
                          correct_option: optionIndex,
                        })
                      }
                    />
                    <input
                      value={option}
                      onChange={event =>
                        updateQuestion(questionIndex, {
                          options: question.options.map((value, index) =>
                            index === optionIndex ? event.target.value : value
                          ),
                        })
                      }
                      className="w-full bg-transparent p-1 text-sm outline-none placeholder:text-Text-meduim-emphasis"
                      placeholder={`Option ${String.fromCharCode(
                        65 + optionIndex
                      )}`}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 flex items-center gap-3 text-sm font-semibold">
                Marks
                <input
                  type="number"
                  min={1}
                  value={question.marks}
                  onChange={event =>
                    updateQuestion(questionIndex, {
                      marks: Number(event.target.value),
                    })
                  }
                  className="w-20 rounded-lg border border-border-colour-light bg-white p-2 font-normal outline-none focus:border-primary-purple-500"
                />
              </label>
            </article>
          ))}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-border-colour-light px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border-1.5 border-border-colour-light px-6 py-3 text-sm font-semibold text-Text-high-emphasis"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!canSubmit || createExam.isPending}
          onClick={() => createExam.mutate()}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createExam.isPending ? "Creating..." : "Create draft"}
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block text-sm font-medium text-Text-high-emphasis">
      <span className="mb-2 block">{label}</span>
      {children}
    </div>
  );
}

function AttemptResults({ examId }: { examId: string }) {
  const attempts = useQuery({
    queryKey: ["cbtAttempts", examId],
    queryFn: () =>
      axiosInstance
        .get(`/cbt/exams/${examId}/attempts`)
        .then(response => response.data as CbtAttempt[]),
  });
  if (attempts.isLoading) return <Spinner />;
  if (!attempts.data?.length)
    return <p className="py-4 text-sm text-gray-800">No attempts yet.</p>;
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-border-colour-light">
      <table className="w-full min-w-[650px] text-left text-sm text-gray-600">
        <thead className="bg-neutral-300 text-xs font-semibold text-Text-high-emphasis">
          <tr>
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Registration</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attempts.data.map(attempt => (
            <tr
              key={attempt._id}
              className="border-t border-border-colour-light"
            >
              <td className="px-4 py-3 font-semibold text-Text-high-emphasis">
                {[
                  attempt.student?.personal_information.first_name,
                  attempt.student?.personal_information.middle_name,
                  attempt.student?.personal_information.last_name,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </td>
              <td className="px-4 py-3">
                {attempt.student?.registration_number}
              </td>
              <td className="px-4 py-3 capitalize">
                {attempt.status.replace("_", " ")}
              </td>
              <td className="px-4 py-3">
                {attempt.status === "submitted"
                  ? `${attempt.score}/${attempt.total_marks}`
                  : "—"}
              </td>
              <td className="px-4 py-3">
                {attempt.percentage === undefined
                  ? "—"
                  : `${attempt.percentage}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminCbt() {
  const [showCreator, setShowCreator] = React.useState(false);
  const [resultsExam, setResultsExam] = React.useState<string>();
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | CbtExam["status"]
  >("all");
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const exams = useQuery({
    queryKey: ["cbtExams"],
    queryFn: () =>
      axiosInstance
        .get("/cbt/exams")
        .then(response => response.data as CbtExam[]),
  });
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CbtExam["status"] }) =>
      axiosInstance.patch(`/cbt/exams/${id}/status`, { status }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cbtExams"] });
      api.success({ message: "Examination status updated" });
    },
    onError: (error: unknown) => api.error({ message: requestError(error) }),
  });
  const allExams = exams.data ?? [];
  const visibleExams =
    statusFilter === "all"
      ? allExams
      : allExams.filter(exam => exam.status === statusFilter);
  const filters: Array<{
    value: "all" | CbtExam["status"];
    label: string;
    count: number;
  }> = [
    { value: "all", label: "All", count: allExams.length },
    {
      value: "draft",
      label: "Draft",
      count: allExams.filter(exam => exam.status === "draft").length,
    },
    {
      value: "published",
      label: "Published",
      count: allExams.filter(exam => exam.status === "published").length,
    },
    {
      value: "closed",
      label: "Closed",
      count: allExams.filter(exam => exam.status === "closed").length,
    },
  ];

  return (
    <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10">
      {contextHolder}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-Text-high-emphasis">
            Computer-based testing
          </h1>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Create, schedule, publish and monitor objective examinations.
          </p>
        </div>
        <DashboardButton
          variant="primary"
          onClick={() => setShowCreator(true)}
          leftElement={<Icon icon="tabler:plus" />}
          className="m-0"
        >
          Create examination
        </DashboardButton>
      </div>
      {showCreator && (
        <div className="mt-6">
          <ExamCreator onClose={() => setShowCreator(false)} />
        </div>
      )}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-Text-high-emphasis">
            Examinations
          </h2>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Manage drafts, live examinations and completed results.
          </p>
        </div>
        <div
          className="flex max-w-full gap-1 overflow-x-auto rounded-lg border-1.5 border-border-colour-light bg-neutral-300 p-1"
          aria-label="Filter examinations by status"
        >
          {filters.map(filter => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
                statusFilter === filter.value
                  ? "bg-white text-primary-purple-700 shadow-sm"
                  : "text-gray-600 hover:text-Text-high-emphasis"
              }`}
              aria-pressed={statusFilter === filter.value}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>
      {exams.isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : !allExams.length ? (
        <section className="mt-8 rounded-lg border-1.5 border-dashed border-border-colour-light px-5 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple-100 text-primary-purple-700">
            <Icon
              icon="material-symbols:quiz-outline-rounded"
              className="text-2xl"
            />
          </span>
          <h2 className="mt-4 font-semibold text-Text-high-emphasis">
            No CBT examinations yet
          </h2>
          <p className="mt-2 text-sm text-Text-meduim-emphasis">
            Create a draft, review the questions, then publish it for students.
          </p>
        </section>
      ) : !visibleExams.length ? (
        <p className="py-14 text-center text-sm text-Text-meduim-emphasis">
          No {statusFilter} examinations.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border-1.5 border-border-colour-light">
          {visibleExams.map((exam, index) => (
            <article
              key={exam._id}
              className={`p-4 sm:p-5 ${
                index < visibleExams.length - 1
                  ? "border-b border-border-colour-light"
                  : ""
              }`}
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-Text-high-emphasis">
                      {exam.title}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        statusStyles[exam.status]
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {exam.subject.name} ({exam.subject.code}) ·{" "}
                    {className(exam.class)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-Text-meduim-emphasis">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="material-symbols:calendar-month-outline-rounded" />
                      {exam.session}, {exam.term}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon icon="material-symbols:quiz-outline-rounded" />
                      {exam.question_count} questions · {exam.total_marks} marks
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon icon="material-symbols:schedule-outline-rounded" />
                      {exam.duration_minutes} minutes
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-Text-meduim-emphasis">
                    Opens {dateTime(exam.starts_at)} · Closes{" "}
                    {dateTime(exam.ends_at)}
                  </p>
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setResultsExam(current =>
                        current === exam._id ? undefined : exam._id
                      )
                    }
                    className="rounded-lg border-1.5 border-border-colour-light px-3 py-2 text-sm font-semibold text-Text-high-emphasis transition hover:bg-neutral-300"
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon icon="material-symbols:analytics-outline-rounded" />
                      Results ({exam.submitted_count}/{exam.attempt_count})
                    </span>
                  </button>
                  {exam.status === "draft" && (
                    <button
                      type="button"
                      onClick={() =>
                        statusMutation.mutate({
                          id: exam._id,
                          status: "published",
                        })
                      }
                      className="rounded-lg bg-primary-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-purple-800 disabled:opacity-50"
                      disabled={statusMutation.isPending}
                    >
                      Publish
                    </button>
                  )}
                  {exam.status === "published" && (
                    <button
                      type="button"
                      onClick={() =>
                        statusMutation.mutate({
                          id: exam._id,
                          status: "closed",
                        })
                      }
                      className="rounded-lg border-1.5 border-secondary-red-600 px-4 py-2 text-sm font-semibold text-secondary-red-600 transition hover:bg-secondary-red-600 hover:text-white disabled:opacity-50"
                      disabled={statusMutation.isPending}
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
              {resultsExam === exam._id && <AttemptResults examId={exam._id} />}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
