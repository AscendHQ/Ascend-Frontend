import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
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

const requestError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: unknown } }).response;
    return String(response?.data ?? "Request failed");
  }
  return error instanceof Error ? error.message : String(error);
};

const newQuestion = (): CbtQuestionInput => ({
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
  const [questions, setQuestions] = React.useState<CbtQuestionInput[]>([
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
        questions,
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
      setQuestions(imported);
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
    <section className="rounded-2xl border bg-white p-5 shadow-sm lg:p-7">
      {contextHolder}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Create CBT examination</h2>
          <p className="text-sm text-gray-800">
            The examination remains private until you publish it.
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close">
          <Icon icon="material-symbols:close-rounded" className="text-2xl" />
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input
            value={form.title}
            onChange={event =>
              setForm(current => ({ ...current, title: event.target.value }))
            }
            className="w-full rounded-lg border p-3"
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
            className="w-full rounded-lg border p-3"
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
            className="w-full rounded-lg border bg-white p-3"
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
            className="w-full rounded-lg border bg-white p-3"
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
              setForm(current => ({ ...current, session: event.target.value }))
            }
            className="w-full rounded-lg border p-3"
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
            className="w-full rounded-lg border bg-white p-3"
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
            className="w-full rounded-lg border p-3"
          />
        </Field>
        <Field label="Closes">
          <input
            type="datetime-local"
            value={form.ends_at}
            onChange={event =>
              setForm(current => ({ ...current, ends_at: event.target.value }))
            }
            className="w-full rounded-lg border p-3"
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
              className="min-h-[90px] w-full rounded-lg border p-3"
              placeholder="Answer every question before the timer ends."
            />
          </Field>
        </div>
      </div>
      <div className="mt-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Questions</h3>
            <p className="text-sm text-gray-800">
              Add questions here or import a completed CSV template.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadCbtQuestionTemplate}
              className="rounded-lg border px-4 py-2 text-sm font-semibold"
            >
              Download template
            </button>
            <label
              htmlFor="cbt-question-csv"
              className="cursor-pointer rounded-lg border border-primary-purple-700 px-4 py-2 text-sm font-semibold text-primary-purple-700"
            >
              Upload completed CSV
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
              className="rounded-lg border border-primary-purple-700 px-4 py-2 text-sm font-semibold text-primary-purple-700"
            >
              Add question
            </button>
          </div>
        </div>
        {questions.map((question, questionIndex) => (
          // Draft questions do not have database IDs until the exam is saved.
          // eslint-disable-next-line react/no-array-index-key
          <article key={questionIndex} className="rounded-xl border p-4">
            <div className="flex gap-3">
              <span className="font-bold">{questionIndex + 1}.</span>
              <textarea
                value={question.prompt}
                onChange={event =>
                  updateQuestion(questionIndex, { prompt: event.target.value })
                }
                className="min-h-[70px] flex-1 rounded-lg border p-3"
                placeholder="Enter question"
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setQuestions(current =>
                      current.filter((_, index) => index !== questionIndex)
                    )
                  }
                  aria-label="Remove question"
                >
                  <Icon
                    icon="material-symbols:delete-outline-rounded"
                    className="text-xl text-secondary-red-600"
                  />
                </button>
              )}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {question.options.map((option, optionIndex) => (
                // Options have a fixed order and cannot be reordered.
                // eslint-disable-next-line react/no-array-index-key
                <label key={optionIndex} className="flex items-center gap-3">
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
                    className="w-full rounded-lg border p-2"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block text-sm font-semibold">
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
                className="ml-3 w-20 rounded border p-2 font-normal"
              />
            </label>
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!canSubmit || createExam.isPending}
          onClick={() => createExam.mutate()}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
    <div className="block text-sm font-semibold">
      <span className="mb-1 block">{label}</span>
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
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-neutral-300 text-xs uppercase">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Registration</th>
            <th className="p-3">Status</th>
            <th className="p-3">Score</th>
            <th className="p-3">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attempts.data.map(attempt => (
            <tr key={attempt._id} className="border-t">
              <td className="p-3 font-semibold">
                {[
                  attempt.student?.personal_information.first_name,
                  attempt.student?.personal_information.middle_name,
                  attempt.student?.personal_information.last_name,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </td>
              <td className="p-3">{attempt.student?.registration_number}</td>
              <td className="p-3 capitalize">
                {attempt.status.replace("_", " ")}
              </td>
              <td className="p-3">
                {attempt.status === "submitted"
                  ? `${attempt.score}/${attempt.total_marks}`
                  : "—"}
              </td>
              <td className="p-3">
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

  return (
    <main className="min-h-full space-y-6 bg-neutral-300 p-5 lg:p-10">
      {contextHolder}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Computer-based testing</h1>
          <p className="text-sm text-gray-800">
            Create, schedule, publish and monitor objective examinations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreator(true)}
          className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"
        >
          <Icon icon="material-symbols:add-rounded" /> Create examination
        </button>
      </div>
      {showCreator && <ExamCreator onClose={() => setShowCreator(false)} />}
      {exams.isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : !exams.data?.length ? (
        <section className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-lg font-bold">No CBT examinations yet</h2>
          <p className="mt-2 text-sm text-gray-800">
            Create a draft, review its questions, then publish it for students.
          </p>
        </section>
      ) : (
        <div className="space-y-4">
          {exams.data.map(exam => (
            <article key={exam._id} className="rounded-2xl border bg-white p-5">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{exam.title}</h2>
                    <span className="rounded-full bg-neutral-300 px-3 py-1 text-xs font-semibold capitalize">
                      {exam.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-800">
                    {exam.subject.name} ({exam.subject.code}) ·{" "}
                    {className(exam.class)}
                  </p>
                  <p className="mt-1 text-xs text-gray-800">
                    {exam.session}, {exam.term} · {exam.question_count}{" "}
                    questions · {exam.total_marks} marks ·{" "}
                    {exam.duration_minutes} minutes
                  </p>
                  <p className="mt-1 text-xs text-gray-800">
                    {dateTime(exam.starts_at)} – {dateTime(exam.ends_at)}
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
                    className="rounded-lg border px-4 py-2 text-sm font-semibold"
                  >
                    Results ({exam.submitted_count}/{exam.attempt_count})
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
                      className="rounded-lg bg-primary-purple-700 px-4 py-2 text-sm font-semibold text-white"
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
                      className="rounded-lg bg-secondary-red-600 px-4 py-2 text-sm font-semibold text-white"
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
