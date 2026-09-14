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

  return (
    <div className="space-y-5">
      {contextHolder}
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-primary-purple-700 p-5 text-white shadow">
        <div>
          <p className="text-xs text-primary-purple-100">CBT examination</p>
          <h2 className="text-xl font-bold">{active.exam.title}</h2>
          <p className="text-sm">
            {active.exam.session}, {active.exam.term} ·{" "}
            {active.exam.total_marks} marks
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs">Time remaining</p>
          <p className="text-2xl font-bold tabular-nums">{timerLabel}</p>
        </div>
      </header>
      {active.exam.instructions && (
        <section className="rounded-xl border bg-white p-4 text-sm">
          <strong>Instructions:</strong> {active.exam.instructions}
        </section>
      )}
      {active.exam.questions.map((question, index) => (
        <article key={question._id} className="rounded-2xl border bg-white p-5">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold">
              {index + 1}. {question.prompt}
            </h3>
            <span className="whitespace-nowrap text-xs text-gray-800">
              {question.marks} mark{question.marks === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {question.options.map((option, optionIndex) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                  answers[question._id] === optionIndex
                    ? "border-primary-purple-700 bg-primary-purple-50"
                    : ""
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
                <span>{option}</span>
              </label>
            ))}
          </div>
        </article>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-800">
          {Object.keys(answers).length} of {active.exam.questions.length}{" "}
          answered
        </p>
        <button
          type="button"
          disabled={submit.isPending}
          onClick={() => {
            if (
              Object.keys(answers).length < active.exam.questions.length &&
              !window.confirm("Some questions are unanswered. Submit anyway?")
            )
              return;
            submitted.current = true;
            submit.mutate();
          }}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
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
        <section className="rounded-2xl bg-success-light p-6 text-success-dark">
          <h2 className="text-xl font-bold">Examination submitted</h2>
          <p className="mt-2 text-3xl font-bold">
            {result.score}/{result.total_marks} ({result.percentage}%)
          </p>
        </section>
      )}
      {exams.isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : !exams.data?.length ? (
        <section className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-lg font-bold">No CBT examinations available</h2>
          <p className="mt-2 text-sm text-gray-800">
            Published examinations for your class will appear here.
          </p>
        </section>
      ) : (
        exams.data.map(exam => (
          <StudentExamCard
            key={exam._id}
            exam={exam}
            isStarting={start.isPending}
            onStart={() => start.mutate(exam._id)}
          />
        ))
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
  return (
    <article className="rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">{exam.title}</h2>
          <p className="text-sm text-gray-800">
            {exam.subject.name} ({exam.subject.code}) · {exam.session},{" "}
            {exam.term}
          </p>
          <p className="mt-1 text-xs text-gray-800">
            {exam.duration_minutes} minutes · {exam.total_marks} marks · Opens{" "}
            {formatDate(exam.starts_at)}
          </p>
        </div>
        {availability === "submitted" ? (
          <div className="text-right">
            <p className="text-sm font-semibold text-success-dark">Submitted</p>
            <p className="text-xl font-bold">
              {exam.attempt?.score}/{exam.attempt?.total_marks} (
              {exam.attempt?.percentage}%)
            </p>
          </div>
        ) : (
          <button
            type="button"
            disabled={!canStart || isStarting}
            onClick={onStart}
            className="rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {buttonLabels[availability]}
          </button>
        )}
      </div>
    </article>
  );
}
