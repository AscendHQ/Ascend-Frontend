import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import BulkResultUpload from "@/components/portal/bulk-result-upload";
import PortalErrorState from "@/components/portal/portal-error-state";
import { Spinner } from "@/components/ui/Loading";

type AssignedClass = {
  _id: string;
  name: string;
  section?: string;
  other_section?: string;
};
type AssignedSubject = { _id: string; name: string; code: string };
type Assignment = { class: AssignedClass; subjects: AssignedSubject[] };
type ScoreValue = {
  mid_term_test: string;
  ca_score: string;
  exam_score: string;
};
type ResultStudent = {
  _id: string;
  registration_number: string;
  personal_information?: {
    first_name: string;
    middle_name?: string;
    last_name: string;
  };
  scores: null | {
    mid_term_test: number;
    ca_score: number;
    exam_score: number;
  };
};
type ResultRegister = {
  submission: null | {
    _id: string;
    status: "draft" | "pending" | "approved" | "rejected";
    review_note?: string;
  };
  students: ResultStudent[];
};

const EMPTY_SCORE: ScoreValue = {
  mid_term_test: "",
  ca_score: "",
  exam_score: "",
};

const getClassName = (item: AssignedClass) => {
  const section = item.other_section ?? item.section;
  return section ? `${item.name} - ${section}` : item.name;
};

const getStudentName = (student: ResultStudent) =>
  [
    student.personal_information?.last_name,
    student.personal_information?.first_name,
    student.personal_information?.middle_name,
  ]
    .filter(Boolean)
    .join(" ") || "Student name unavailable";

const hasAnyScore = (value: ScoreValue) =>
  Object.values(value).some(score => score !== "");
const isCompleteScore = (value?: ScoreValue) =>
  value ? Object.values(value).every(score => score !== "") : false;
const getTotal = (value: ScoreValue) =>
  Number(value.mid_term_test || 0) +
  Number(value.ca_score || 0) +
  Number(value.exam_score || 0);
const getGrade = (total: number) => {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 40) return "D";
  return "F";
};

function ScoreInput({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-xs font-medium text-gray-600">
      {label}
      <input
        type="number"
        min="0"
        step="0.01"
        disabled={disabled}
        value={value}
        onChange={event => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2 text-sm font-normal text-Text-high-emphasis outline-none focus:border-primary-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}

function ScoreSheet({
  students,
  scores,
  disabled,
  updateScore,
}: {
  students: ResultStudent[];
  scores: Record<string, ScoreValue>;
  disabled: boolean;
  updateScore: (
    studentId: string,
    field: keyof ScoreValue,
    value: string
  ) => void;
}) {
  return (
    <div className="divide-y divide-border-colour-light overflow-hidden rounded-lg border border-border-colour-light bg-white">
      {students.map(student => {
        const value = scores[student._id] ?? EMPTY_SCORE;
        const total = getTotal(value);
        return (
          <div
            key={student._id}
            className="grid gap-3 p-4 lg:grid-cols-[minmax(180px,1.5fr)_repeat(3,minmax(100px,1fr))_80px] lg:items-end"
          >
            <div>
              <p className="font-medium text-Text-high-emphasis">
                {getStudentName(student)}
              </p>
              <p className="text-xs text-Text-meduim-emphasis">
                {student.registration_number}
              </p>
            </div>
            <ScoreInput
              label="Mid-term"
              value={value.mid_term_test}
              disabled={disabled}
              onChange={score =>
                updateScore(student._id, "mid_term_test", score)
              }
            />
            <ScoreInput
              label="CA"
              value={value.ca_score}
              disabled={disabled}
              onChange={score => updateScore(student._id, "ca_score", score)}
            />
            <ScoreInput
              label="Exam"
              value={value.exam_score}
              disabled={disabled}
              onChange={score => updateScore(student._id, "exam_score", score)}
            />
            <div className="rounded-lg bg-neutral-300 p-2 text-center text-sm">
              <p className="text-xs text-Text-meduim-emphasis">Total</p>
              <p
                className={total > 100 ? "font-bold text-red-700" : "font-bold"}
              >
                {total} · {getGrade(total)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RegisterState({
  loading,
  error,
  students,
  retry,
  children,
}: {
  loading: boolean;
  error: boolean;
  students: ResultStudent[];
  retry: () => void;
  children: React.ReactNode;
}) {
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <PortalErrorState
        message="The result sheet could not be loaded."
        onRetry={retry}
      />
    );
  if (!students.length)
    return (
      <p className="rounded-lg border border-dashed border-border-colour-light bg-white p-8 text-center text-Text-meduim-emphasis">
        No student in this class is registered for the selected subject.
      </p>
    );
  return <>{children}</>;
}

export default function TeacherResults({
  assignments,
  session,
  term,
}: {
  assignments: Assignment[];
  session?: string;
  term?: string;
}) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [classId, setClassId] = React.useState("");
  const [subjectId, setSubjectId] = React.useState("");
  const [scores, setScores] = React.useState<Record<string, ScoreValue>>({});
  const safeAssignments = assignments.filter(
    item => item?.class?._id && Array.isArray(item.subjects)
  );
  const assignment = safeAssignments.find(item => item.class._id === classId);
  const assignedSubjects = (assignment?.subjects ?? []).filter(
    subject => subject?._id
  );
  const subjectIsAssigned = assignedSubjects.some(
    subject => subject._id === subjectId
  );

  React.useEffect(() => {
    if (!classId && safeAssignments[0]) {
      setClassId(safeAssignments[0].class._id);
    }
  }, [classId, safeAssignments]);
  React.useEffect(() => {
    if (!subjectIsAssigned) {
      setSubjectId(assignedSubjects[0]?._id ?? "");
    }
  }, [assignedSubjects, subjectIsAssigned]);

  const registerQuery = useQuery({
    queryKey: ["teacherResults", classId, subjectId, session, term],
    queryFn: () =>
      axiosInstance
        .get("/teacher-portals/me/results", {
          params: { class_id: classId, subject_id: subjectId, session, term },
        })
        .then(response => response.data as ResultRegister),
    enabled: Boolean(
      classId && subjectId && subjectIsAssigned && session && term
    ),
  });
  const students = React.useMemo(
    () => registerQuery.data?.students ?? [],
    [registerQuery.data]
  );

  React.useEffect(() => {
    setScores(
      Object.fromEntries(
        students.map(student => [
          student._id,
          student.scores
            ? {
                mid_term_test: String(student.scores.mid_term_test),
                ca_score: String(student.scores.ca_score),
                exam_score: String(student.scores.exam_score),
              }
            : { ...EMPTY_SCORE },
        ])
      )
    );
  }, [students]);

  const updateScore = (
    studentId: string,
    field: keyof ScoreValue,
    value: string
  ) =>
    setScores(current => ({
      ...current,
      [studentId]: { ...current[studentId], [field]: value },
    }));

  const enteredScores = Object.entries(scores).filter(([, value]) =>
    hasAnyScore(value)
  );
  const invalidScores = enteredScores.some(
    ([, value]) =>
      Object.values(value).some(score => Number(score) < 0) ||
      getTotal(value) > 100
  );
  const complete =
    students.length > 0 &&
    students.every(student => isCompleteScore(scores[student._id]));
  const status = registerQuery.data?.submission?.status;
  const locked = status === "pending" || status === "approved";

  const saveMutation = useMutation({
    mutationFn: (action: "draft" | "submit") =>
      axiosInstance.post("/teacher-portals/me/results", {
        class_id: classId,
        subject_id: subjectId,
        session,
        term,
        action,
        records: enteredScores.map(([student, value]) => ({
          student,
          mid_term_test: Number(value.mid_term_test || 0),
          ca_score: Number(value.ca_score || 0),
          exam_score: Number(value.exam_score || 0),
        })),
      }),
    onSuccess: (_, action) => {
      api.success({
        message:
          action === "submit"
            ? "Results submitted for approval"
            : "Draft results saved",
      });
      queryClient.invalidateQueries({ queryKey: ["teacherResults"] });
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Results could not be saved",
        description: error.response?.data ?? error.message,
      }),
  });

  if (!session || !term)
    return (
      <p className="rounded-lg border border-warning-main bg-warning-light p-5 text-warning-dark">
        The administrator must set the current session and term before results
        can be entered.
      </p>
    );
  if (!safeAssignments.length)
    return (
      <p className="rounded-lg border border-dashed border-border-colour-light bg-white p-8 text-center text-Text-meduim-emphasis">
        No class and subject assignments were found.
      </p>
    );

  return (
    <div className="space-y-5">
      {contextHolder}
      <section className="flex flex-wrap items-end gap-4 rounded-lg border border-border-colour-light bg-white p-5">
        <label className="min-w-[190px] flex-1 text-sm font-medium">
          Class
          <select
            value={classId}
            onChange={event => {
              setSubjectId("");
              setClassId(event.target.value);
            }}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          >
            {safeAssignments.map(item => (
              <option key={item.class._id} value={item.class._id}>
                {getClassName(item.class)}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-[190px] flex-1 text-sm font-medium">
          Subject
          <select
            value={subjectId}
            onChange={event => setSubjectId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          >
            {assignedSubjects.map(subject => (
              <option key={subject._id} value={subject._id}>
                {subject.name} ({subject.code})
              </option>
            ))}
          </select>
        </label>
        <p className="rounded-lg bg-neutral-300 px-3 py-2.5 text-sm">
          {session}, {term}
        </p>
        {status && (
          <span className="rounded-full border border-border-colour-light px-3 py-2 text-sm font-semibold capitalize">
            {status}
          </span>
        )}
      </section>
      {registerQuery.data?.submission?.review_note && (
        <p className="rounded-lg border border-warning-main bg-warning-light p-4 text-sm text-warning-dark">
          <strong>Admin note:</strong>{" "}
          {registerQuery.data.submission.review_note}
        </p>
      )}
      <BulkResultUpload
        students={students}
        endpoint="/teacher-portals/me/results/bulk"
        fields={{
          class_id: classId,
          subject_id: subjectId,
          session: session ?? "",
          term: term ?? "",
        }}
        fileName={`ascend-${getClassName(
          assignment?.class ?? safeAssignments[0].class
        )}-${
          assignedSubjects.find(subject => subject._id === subjectId)?.code ??
          "subject"
        }-${session}-${term}.csv`}
        locked={locked}
        teacher
      />
      <RegisterState
        loading={registerQuery.isLoading}
        error={registerQuery.isError}
        students={students}
        retry={() => void registerQuery.refetch()}
      >
        <ScoreSheet
          students={students}
          scores={scores}
          disabled={locked}
          updateScore={updateScore}
        />
        {!locked && (
          <div className="mt-5 flex flex-wrap justify-end gap-3">
            {invalidScores && (
              <p className="mr-auto self-center text-sm text-red-700">
                A student&apos;s total cannot exceed 100.
              </p>
            )}
            <button
              type="button"
              disabled={
                !enteredScores.length || invalidScores || saveMutation.isPending
              }
              onClick={() => saveMutation.mutate("draft")}
              className="rounded-lg border-1.5 border-primary-purple-700 px-5 py-3 text-sm font-semibold text-primary-purple-700 transition hover:bg-primary-purple-100 disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={!complete || invalidScores || saveMutation.isPending}
              onClick={() => saveMutation.mutate("submit")}
              className="rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-purple-800 disabled:opacity-50"
            >
              Submit for approval
            </button>
          </div>
        )}
        {status === "pending" && (
          <p className="mt-4 text-sm text-Text-meduim-emphasis">
            This sheet is awaiting administrator review and cannot be edited.
          </p>
        )}
        {status === "approved" && (
          <p className="mt-4 text-sm text-secondary-green-700">
            These scores are approved and visible in official results.
          </p>
        )}
      </RegisterState>
    </div>
  );
}
