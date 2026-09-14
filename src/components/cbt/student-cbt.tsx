import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";
import { ActiveCbt, CbtAttempt, CbtExam } from "@/types/cbt";

const requestError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: unknown } }).response;
    return String(response?.data ?? "Request failed");
  }
  return error instanceof Error ? error.message : String(error);
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const examAvailability = (exam: CbtExam) => {
  const now = Date.now();
  if (exam.attempt?.status === "submitted") return "submitted";
  if (exam.status === "closed" || now > new Date(exam.ends_at).getTime())
    return "closed";
  if (now < new Date(exam.starts_at).getTime()) return "upcoming";
  return exam.attempt?.status === "in_progress" ? "continue" : "start";
};

function ExamRunner({
  active,
  onFinished,
}: {
  active: ActiveCbt;
  onFinished: (attempt: CbtAttempt) => void;
}) {
  const [api, contextHolder] = notification.useNotification();
  const [answers, setAnswers] = React.useState<Record<string, number>>(
    Object.fromEntries(
      active.attempt.answers.map(answer => [
        answer.question_id,
        answer.selected_option,
      ])
    )
  );
  const [remaining, setRemaining] = React.useState(() =>
    Math.max(0, new Date(active.attempt.expires_at).getTime() - Date.now())
  );
  const submitted = React.useRef(false);
  const submit = useMutation({
    mutationFn: () =>
      axiosInstance
        .post(`/cbt/student/attempts/${active.attempt._id}/submit`)
        .then(response => response.data as CbtAttempt),
    onSuccess: attempt => {
      submitted.current = true;
      onFinished(attempt);
    },
    onError: (error: unknown) =>
      api.error({
        message: "Examination could not be submitted",
        description: requestError(error),
      }),
  });
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      const next = Math.max(
        0,
        new Date(active.attempt.expires_at).getTime() - Date.now()
      );
      setRemaining(next);
      if (next === 0 && !submitted.current) {
        submitted.current = true;
        submit.mutate();
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [active.attempt.expires_at, submit]);
  const save = useMutation({
    mutationFn: ({
      questionId,
      option,
    }: {
      questionId: string;
      option: number;
    }) =>
      axiosInstance.put(`/cbt/student/attempts/${active.attempt._id}/answer`, {
        question_id: questionId,
        selected_option: option,
      }),
    onError: (error: unknown) =>
      api.error({
        message: "Answer was not saved",
        description: requestError(error),
      }),
  });
  const totalSeconds = Math.ceil(remaining / 1000);
  const timerLabel = `${String(Math.floor(totalSeconds / 60)).padStart(
    2,
    "0"
  )}:${String(totalSeconds % 60).padStart(2, "0")}`;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round(
    (answeredCount / active.exam.questions.length) * 100
  );
  const timerIsLow = totalSeconds <= 300;

  return (
    <div className="space-y-5 pb-24">
      {contextHolder}
      <header className="sticky top-0 z-20 overflow-hidden rounded-lg border border-primary-purple-800 bg-primary-purple-700 text-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary-purple-200">
              Examination in progress
            </p>
            <h2 className="mt-1 text-lg font-semibold sm:text-xl">
              {active.exam.title}
            </h2>
            <p className="mt-1 text-sm text-primary-purple-100">
              {active.exam.session}, {active.exam.term} ·{" "}
              {active.exam.total_marks} marks
            </p>
          </div>
          <div
            className={`rounded-lg px-4 py-2 text-right ${
              timerIsLow ? "bg-warning-light text-warning-dark" : "bg-white/10"
            }`}
          >
            <p className="text-xs font-medium">Time remaining</p>
            <p className="text-2xl font-bold tabular-nums" aria-live="polite">
              {timerLabel}
            </p>
          </div>
        </div>
        <div className="h-1.5 bg-primary-purple-800">
          <div
            className="h-full bg-secondary-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>
      {active.exam.instructions && (
        <section className="flex gap-3 rounded-lg border border-info-main bg-info-light p-4 text-sm text-info-dark">
          <Icon
            icon="material-symbols:info-outline-rounded"
            className="mt-0.5 shrink-0 text-xl"
          />
          <p>
            <strong>Instructions:</strong> {active.exam.instructions}
          </p>
        </section>
      )}
      <nav
        aria-label="Question navigator"
        className="rounded-lg border border-border-colour-light bg-white p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-3 text-sm">
          <p className="font-semibold text-Text-high-emphasis">
            Question progress
          </p>
          <p className="text-Text-meduim-emphasis">
            {answeredCount} of {active.exam.questions.length} answered
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {active.exam.questions.map((question, index) => (
            <a
              key={question._id}
              href={`#cbt-question-${question._id}`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                answers[question._id] === undefined
                  ? "border-border-colour-light text-gray-600 hover:border-primary-purple-500"
                  : "border-primary-purple-700 bg-primary-purple-700 text-white"
              }`}
              aria-label={`Go to question ${index + 1}${
                answers[question._id] === undefined
                  ? ", unanswered"
                  : ", answered"
              }`}
            >
              {index + 1}
            </a>
          ))}
        </div>
      </nav>
      {active.exam.questions.map((question, index) => (
        <article
          id={`cbt-question-${question._id}`}
          key={question._id}
          className="scroll-mt-40 rounded-lg border border-border-colour-light bg-white p-4 sm:p-5"
        >
          <div className="flex justify-between gap-4">
            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-purple-100 text-sm font-semibold text-primary-purple-700">
                {index + 1}
              </span>
              <h3 className="pt-0.5 font-medium text-Text-high-emphasis">
                {question.prompt}
              </h3>
            </div>
            <span className="whitespace-nowrap text-xs text-Text-meduim-emphasis">
              {question.marks} mark{question.marks === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                  answers[question._id] === optionIndex
                    ? "border-primary-purple-700 bg-primary-purple-100"
                    : "border-border-colour-light hover:border-primary-purple-300 hover:bg-neutral-100"
                }`}
              >
                <input
                  type="radio"
                  name={question._id}
                  checked={answers[question._id] === optionIndex}
                  onChange={() => {
                    setAnswers(current => ({
                      ...current,
                      [question._id]: optionIndex,
                    }));
                    save.mutate({
                      questionId: question._id,
                      option: optionIndex,
                    });
                  }}
                />
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    answers[question._id] === optionIndex
                      ? "border-primary-purple-700 bg-primary-purple-700 text-white"
                      : "border-border-colour-light text-gray-600"
                  }`}
                >
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="text-sm text-Text-high-emphasis">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </article>
      ))}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border-colour-light bg-white/95 p-3 shadow-lg backdrop-blur sm:static sm:flex sm:items-center sm:justify-between sm:rounded-lg sm:border sm:p-4 sm:shadow-none">
        <p className="mb-3 hidden text-sm text-Text-meduim-emphasis sm:mb-0 sm:block">
          {answeredCount === active.exam.questions.length
            ? "All questions answered. You can submit when ready."
            : `${active.exam.questions.length - answeredCount} question${
                active.exam.questions.length - answeredCount === 1 ? "" : "s"
              } unanswered.`}
        </p>
        <button
          type="button"
          disabled={submit.isPending}
          onClick={() => {
            if (
              answeredCount < active.exam.questions.length &&
              !window.confirm("Some questions are unanswered. Submit anyway?")
            )
              return;
            submitted.current = true;
            submit.mutate();
          }}
          className="w-full rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-purple-800 disabled:opacity-50 sm:w-auto"
        >
          {submit.isPending ? "Submitting..." : "Submit examination"}
        </button>
      </div>
    </div>
  );
}

export default function StudentCbt() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [active, setActive] = React.useState<ActiveCbt>();
  const [result, setResult] = React.useState<CbtAttempt>();
  const exams = useQuery({
    queryKey: ["studentCbtExams"],
    queryFn: () =>
      axiosInstance
        .get("/cbt/student/exams")
        .then(response => response.data as CbtExam[]),
  });
  const start = useMutation({
    mutationFn: (examId: string) =>
      axiosInstance
        .post(`/cbt/student/exams/${examId}/start`)
        .then(response => response.data as ActiveCbt),
    onSuccess: data => {
      setResult(undefined);
      setActive(data);
    },
    onError: (error: unknown) =>
      api.error({
        message: "Examination could not be opened",
        description: requestError(error),
      }),
  });
  if (active) {
    return (
      <ExamRunner
        active={active}
        onFinished={attempt => {
          setActive(undefined);
          setResult(attempt);
          void queryClient.invalidateQueries({ queryKey: ["studentCbtExams"] });
        }}
      />
    );
  }
  return (
    <div className="space-y-5">
      {contextHolder}
      {result && (
        <section className="flex flex-wrap items-center gap-4 rounded-lg border border-success-main bg-success-light p-5 text-success-dark">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <Icon
              icon="material-symbols:check-circle-rounded"
              className="text-2xl"
            />
          </span>
          <div>
            <h2 className="font-semibold">Examination submitted</h2>
            <p className="mt-1 text-2xl font-bold">
              {result.score}/{result.total_marks} ({result.percentage}%)
            </p>
          </div>
        </section>
      )}
      {exams.isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : !exams.data?.length ? (
        <section className="rounded-lg border border-dashed border-border-colour-light bg-white p-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple-100 text-primary-purple-700">
            <Icon
              icon="material-symbols:quiz-outline-rounded"
              className="text-2xl"
            />
          </span>
          <h2 className="mt-4 font-semibold text-Text-high-emphasis">
            No CBT examinations available
          </h2>
          <p className="mt-2 text-sm text-Text-meduim-emphasis">
            Published examinations for your class will appear here.
          </p>
        </section>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {exams.data.map(exam => (
            <StudentExamCard
              key={exam._id}
              exam={exam}
              isStarting={start.isPending}
              onStart={() => start.mutate(exam._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StudentExamCard({
  exam,
  isStarting,
  onStart,
}: {
  exam: CbtExam;
  isStarting: boolean;
  onStart: () => void;
}) {
  const availability = examAvailability(exam);
  const canStart = ["start", "continue"].includes(availability);
  const buttonLabels: Record<string, string> = {
    continue: "Continue exam",
    upcoming: "Not open yet",
    closed: "Closed",
    start: "Start exam",
  };
  const availabilityLabels: Record<string, string> = {
    continue: "In progress",
    upcoming: "Upcoming",
    closed: "Closed",
    start: "Available",
  };
  return (
    <article className="flex h-full flex-col rounded-lg border border-border-colour-light bg-white p-5 transition hover:border-primary-purple-300">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-purple-100 text-primary-purple-700">
          <Icon
            icon="material-symbols:quiz-outline-rounded"
            className="text-xl"
          />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            availability === "start" || availability === "continue"
              ? "bg-success-light text-success-dark"
              : "bg-neutral-300 text-gray-600"
          }`}
        >
          {availability === "submitted"
            ? "Submitted"
            : availabilityLabels[availability]}
        </span>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <div>
          <h2 className="font-semibold text-Text-high-emphasis">
            {exam.title}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {exam.subject.name} ({exam.subject.code}) · {exam.session},{" "}
            {exam.term}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-neutral-300 p-3 text-xs text-gray-600">
          <span className="flex items-center gap-1.5">
            <Icon icon="material-symbols:schedule-outline-rounded" />
            {exam.duration_minutes} minutes
          </span>
          <span className="flex items-center gap-1.5">
            <Icon icon="material-symbols:rewarded-ads-outline-rounded" />
            {exam.total_marks} marks
          </span>
          <span className="col-span-2 flex items-center gap-1.5">
            <Icon icon="material-symbols:event-outline-rounded" />
            Opens {formatDate(exam.starts_at)}
          </span>
        </div>
        <div className="mt-5 border-t border-border-colour-light pt-4">
          {availability === "submitted" ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-success-dark">
                Your score
              </p>
              <p className="text-lg font-bold text-Text-high-emphasis">
                {exam.attempt?.score}/{exam.attempt?.total_marks} (
                {exam.attempt?.percentage}%)
              </p>
            </div>
          ) : (
            <button
              type="button"
              disabled={!canStart || isStarting}
              onClick={onStart}
              className="w-full rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-purple-800 disabled:cursor-not-allowed disabled:bg-gray-500"
            >
              {buttonLabels[availability]}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
