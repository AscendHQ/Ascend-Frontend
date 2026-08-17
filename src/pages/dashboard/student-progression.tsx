import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { useOrganization } from "@/templates/Settings/hooks";

import { useFetchClassInfo } from "./database/classes";
import type { ClassInfoData } from "./register-subject";

type Decision = "advanced" | "promoted" | "repeated" | "graduated";

type ProgressionStudent = {
  _id: string;
  registration_number: string;
  personal_information: {
    first_name: string;
    middle_name?: string;
    last_name: string;
  };
  result_average?: number;
  has_result: boolean;
  already_processed: boolean;
};

type StudentChoice = {
  selected: boolean;
  decision?: Decision;
  targetClassId?: string;
};

const getClassLabel = (classInfo: classInfoProp) =>
  classInfo.level === "junior"
    ? `${classInfo.name} - ${classInfo.other_section}`
    : `${classInfo.name} - ${classInfo.section}`;

const getNextPeriod = (session: string, term: string) => {
  if (term === "1st Term") return { session, term: "2nd Term" };
  if (term === "2nd Term") return { session, term: "3rd Term" };

  const startYear = Number(session.split("/")[0]);
  return {
    session: Number.isFinite(startYear)
      ? `${startYear + 1}/${startYear + 2}`
      : session,
    term: "1st Term",
  };
};

const getStudentName = (student: ProgressionStudent) =>
  [
    student.personal_information.first_name,
    student.personal_information.middle_name,
    student.personal_information.last_name,
  ]
    .filter(Boolean)
    .join(" ");

function ProgressionRecommendation({
  student,
  isYearEnd,
  nextTerm,
  passMark,
}: {
  student: ProgressionStudent;
  isYearEnd: boolean;
  nextTerm: string;
  passMark: number;
}) {
  if (student.already_processed) {
    return <span className="text-secondary-green-600">Processed</span>;
  }
  if (!isYearEnd) return <>Advance to {nextTerm}</>;
  if (!student.has_result) {
    return <span className="text-gray-800">Review manually</span>;
  }
  if (Number(student.result_average) >= passMark) {
    return <span className="text-secondary-green-600">Pass — promote</span>;
  }
  return (
    <span className="text-secondary-red-600">Below pass mark — repeat</span>
  );
}

function ProgressionRow({
  student,
  choice,
  classes,
  isYearEnd,
  nextTerm,
  passMark,
  updateChoice,
  handleDecisionChange,
}: {
  student: ProgressionStudent;
  choice?: StudentChoice;
  classes: classInfoProp[];
  isYearEnd: boolean;
  nextTerm: string;
  passMark: number;
  updateChoice: (studentId: string, update: Partial<StudentChoice>) => void;
  handleDecisionChange: (studentId: string, decision?: Decision) => void;
}) {
  const studentName = getStudentName(student);
  const isGraduating = choice?.decision === "graduated";

  return (
    <tr className="border-t">
      <td className="p-4">
        <input
          type="checkbox"
          aria-label={`Select ${studentName}`}
          checked={Boolean(choice?.selected)}
          disabled={student.already_processed}
          onChange={event =>
            updateChoice(student._id, { selected: event.target.checked })
          }
        />
      </td>
      <td className="p-4">
        <div className="font-semibold">{studentName}</div>
        <div className="text-xs text-gray-800">
          {student.registration_number}
        </div>
      </td>
      <td className="p-4">
        {student.has_result ? `${student.result_average}%` : "No result"}
      </td>
      <td className="p-4">
        <ProgressionRecommendation
          student={student}
          isYearEnd={isYearEnd}
          nextTerm={nextTerm}
          passMark={passMark}
        />
      </td>
      {isYearEnd && (
        <td className="p-4">
          <select
            aria-label={`Decision for ${studentName}`}
            value={choice?.decision ?? ""}
            disabled={student.already_processed}
            onChange={event =>
              handleDecisionChange(
                student._id,
                (event.target.value || undefined) as Decision | undefined
              )
            }
            className="rounded border p-2"
          >
            <option value="">Choose decision</option>
            <option value="promoted">Promote</option>
            <option value="repeated">Repeat class</option>
            <option value="graduated">Graduate</option>
          </select>
        </td>
      )}
      {isYearEnd && (
        <td className="p-4">
          {isGraduating ? (
            "Leaves active students"
          ) : (
            <select
              aria-label={`Destination class for ${studentName}`}
              value={choice?.targetClassId ?? ""}
              disabled={student.already_processed || !choice?.decision}
              onChange={event =>
                updateChoice(student._id, {
                  targetClassId: event.target.value,
                })
              }
              className="min-w-[170px] rounded border p-2"
            >
              <option value="">Choose class</option>
              {classes.map(classInfo => (
                <option value={classInfo._id} key={classInfo._id}>
                  {getClassLabel(classInfo)}
                </option>
              ))}
            </select>
          )}
        </td>
      )}
    </tr>
  );
}

export default function StudentProgression() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const { data: organization, isLoading: isLoadingOrganization } =
    useOrganization();
  const classQuery = useFetchClassInfo();
  const classes = React.useMemo(
    () => (classQuery.data as ClassInfoData | undefined)?.classes ?? [],
    [classQuery.data]
  );
  const settings = organization?.academic_settings;
  const hasCompleteSettings = Boolean(
    settings?.current_session && settings.current_term
  );
  const [classId, setClassId] = React.useState("");
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("1st Term");
  const [choices, setChoices] = React.useState<Record<string, StudentChoice>>(
    {}
  );

  React.useEffect(() => {
    if (!classId && classes[0]) setClassId(classes[0]._id);
  }, [classId, classes]);

  React.useEffect(() => {
    if (settings?.current_session && settings.current_term) {
      setSession(settings.current_session);
      setTerm(settings.current_term);
    }
  }, [settings]);

  const progressionQuery = useQuery({
    queryKey: ["studentProgression", classId, session, term],
    queryFn: () => {
      const params = new URLSearchParams({ class_id: classId, session, term });
      return axiosInstance
        .get(`/students/progression?${params.toString()}`)
        .then(response => response.data as ProgressionStudent[]);
    },
    enabled: Boolean(classId && session && term),
  });

  const students = React.useMemo(
    () => progressionQuery.data ?? [],
    [progressionQuery.data]
  );
  const isYearEnd = term === "3rd Term";
  const nextPeriod = getNextPeriod(session, term);

  React.useEffect(() => {
    setChoices(current => {
      const next: Record<string, StudentChoice> = {};
      for (const student of students) {
        const existing = current[student._id];
        next[student._id] = existing ?? {
          selected: !student.already_processed,
          decision: isYearEnd ? undefined : "advanced",
          targetClassId: isYearEnd ? undefined : classId,
        };
      }
      return next;
    });
  }, [classId, isYearEnd, students]);

  const updateChoice = (studentId: string, update: Partial<StudentChoice>) => {
    setChoices(current => ({
      ...current,
      [studentId]: { ...current[studentId], ...update },
    }));
  };

  const handleDecisionChange = (studentId: string, decision?: Decision) => {
    updateChoice(studentId, {
      decision,
      targetClassId:
        decision === "repeated"
          ? classId
          : decision === "graduated"
          ? undefined
          : choices[studentId]?.targetClassId === classId
          ? undefined
          : choices[studentId]?.targetClassId,
    });
  };

  const mutation = useMutation({
    mutationFn: (
      entries: Array<{
        student_id: string;
        decision: Decision;
        target_class_id?: string;
      }>
    ) =>
      axiosInstance
        .post("/students/progression", {
          from_session: session,
          from_term: term,
          from_class_id: classId,
          to_session: nextPeriod.session,
          to_term: nextPeriod.term,
          entries,
        })
        .then(response => response.data as { processed: number }),
    onSuccess: response => {
      api.success({
        message: "Progression saved",
        description: `${response.processed} student(s) moved to ${nextPeriod.session}, ${nextPeriod.term}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["studentProgression"] });
      queryClient.invalidateQueries({ queryKey: ["allStudent"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Progression could not be saved",
        description: error.response?.data ?? error.message,
      });
    },
  });

  const handleSubmit = () => {
    const selectedStudents = students.filter(
      student => choices[student._id]?.selected && !student.already_processed
    );
    const incomplete = selectedStudents.some(student => {
      const choice = choices[student._id];
      return (
        !choice?.decision ||
        (choice.decision !== "graduated" && !choice.targetClassId)
      );
    });

    if (selectedStudents.length === 0) {
      api.warning({ message: "Select at least one student" });
      return;
    }
    if (incomplete) {
      api.warning({
        message: "Complete every selected decision",
        description: "Promoted students must also have a destination class.",
      });
      return;
    }
    if (
      !window.confirm(
        `Move ${selectedStudents.length} student(s) to ${nextPeriod.session}, ${nextPeriod.term}? This will be kept in their history.`
      )
    ) {
      return;
    }

    mutation.mutate(
      selectedStudents.map(student => ({
        student_id: student._id,
        decision: choices[student._id].decision!,
        target_class_id: choices[student._id].targetClassId,
      }))
    );
  };

  if (isLoadingOrganization || classQuery.isLoading) {
    return (
      <Container headerTitle="Student Progression">
        <div className="flex min-h-[400px] items-center justify-center bg-white">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (!hasCompleteSettings) {
    return (
      <Container headerTitle="Student Progression">
        <div className="bg-white p-10">
          <h2 className="text-xl font-semibold">
            Set the academic timeline first
          </h2>
          <p className="mt-2 text-gray-800">
            Open Account Settings → General Settings and save the current
            session, term, and promotion pass mark.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container headerTitle="Student Progression">
      <main className="bg-white p-10">
        {contextHolder}
        <div className="flex flex-wrap items-end gap-4 rounded-lg bg-neutral-300 p-5">
          <div>
            <label
              htmlFor="progression-session"
              className="mb-1 block font-semibold"
            >
              From session
            </label>
            <input
              id="progression-session"
              value={session}
              onChange={event => setSession(event.target.value)}
              className="rounded border bg-white p-2"
            />
          </div>
          <div>
            <label
              htmlFor="progression-term"
              className="mb-1 block font-semibold"
            >
              From term
            </label>
            <select
              id="progression-term"
              value={term}
              onChange={event => setTerm(event.target.value)}
              className="rounded border bg-white p-2"
            >
              <option>1st Term</option>
              <option>2nd Term</option>
              <option>3rd Term</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="progression-class"
              className="mb-1 block font-semibold"
            >
              Current class
            </label>
            <select
              id="progression-class"
              value={classId}
              onChange={event => setClassId(event.target.value)}
              className="min-w-[180px] rounded border bg-white p-2"
            >
              {classes.map(classInfo => (
                <option value={classInfo._id} key={classInfo._id}>
                  {getClassLabel(classInfo)}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-auto rounded-lg bg-white px-5 py-3">
            <span className="text-sm text-gray-800">Moving to</span>
            <strong className="ml-2">
              {nextPeriod.session}, {nextPeriod.term}
            </strong>
          </div>
        </div>

        {isYearEnd && (
          <p className="mt-4 rounded border border-warning-main bg-warning-main/10 p-4 text-sm">
            Pass mark: <strong>{settings?.pass_mark ?? 50}%</strong>. The result
            is a recommendation only; an administrator must confirm Promote,
            Repeat, or Graduate for each student.
          </p>
        )}

        {progressionQuery.isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Spinner />
          </div>
        ) : progressionQuery.isError ? (
          <p className="p-10 text-center text-secondary-red-600">
            Students could not be loaded for this period.
          </p>
        ) : students.length === 0 ? (
          <p className="p-10 text-center text-gray-800">
            No active students are in this class.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-grey-50 text-xs uppercase text-gray-800">
                <tr>
                  <th className="p-4">Select</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Average</th>
                  <th className="p-4">Recommendation</th>
                  {isYearEnd && <th className="p-4">Decision</th>}
                  {isYearEnd && <th className="p-4">Destination class</th>}
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <ProgressionRow
                    key={student._id}
                    student={student}
                    choice={choices[student._id]}
                    classes={classes}
                    isYearEnd={isYearEnd}
                    nextTerm={nextPeriod.term}
                    passMark={settings?.pass_mark ?? 50}
                    updateChoice={updateChoice}
                    handleDecisionChange={handleDecisionChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={mutation.isPending || students.length === 0}
            className="rounded-lg bg-primary-purple-700 px-8 py-3 font-semibold text-white disabled:opacity-50"
          >
            {mutation.isPending
              ? "Saving progression..."
              : `Move selected to ${nextPeriod.term}`}
          </button>
        </div>
      </main>
    </Container>
  );
}
