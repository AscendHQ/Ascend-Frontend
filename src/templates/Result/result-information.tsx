import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { DASHBOARD_RESULT } from "@/config/links";
import { useOrganization } from "@/templates/Settings/hooks";

import AddNewResultTable, { SubjectScores } from "./add-new-result-table";
import {
  CreateResultPayload,
  ResultBlockInput,
  useAllStudentsForResult,
  useCreateResult,
  useStudentSubjectsForResult,
} from "./hooks";

const TERM_OPTIONS = ["1st Term", "2nd Term", "3rd Term"];

const getSessionOptions = (configuredSession?: string) => {
  const currentYear = new Date().getFullYear();
  const sessions = Array.from({ length: 7 }, (_, index) => {
    const year = currentYear + 1 - index;
    return `${year}/${year + 1}`;
  });
  return configuredSession && !sessions.includes(configuredSession)
    ? [configuredSession, ...sessions]
    : sessions;
};

function computeGrade(total: number): ResultBlockInput["grade"] {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 40) return "D";
  return "F";
}

const buildResultBlocks = (scores: SubjectScores): ResultBlockInput[] =>
  Object.entries(scores)
    .filter(([, row]) => row.mid_term_test || row.ca_score || row.exam_score)
    .map(([subjectId, row]) => {
      const mid_term_test = Number(row.mid_term_test) || 0;
      const ca_score = Number(row.ca_score) || 0;
      const exam_score = Number(row.exam_score) || 0;
      const total = mid_term_test + ca_score + exam_score;

      return {
        subject: subjectId,
        mid_term_test,
        ca_score,
        exam_score,
        total,
        grade: computeGrade(total),
      };
    });

const hasInvalidScoreValues = (scores: SubjectScores) =>
  Object.values(scores).some(row => {
    const values = [row.mid_term_test, row.ca_score, row.exam_score].map(Number);
    return (
      values.some(value => !Number.isFinite(value) || value < 0) ||
      values.reduce((total, value) => total + value, 0) > 100
    );
  });

function ResultSubjectFields({
  isLoading,
  isError,
  hasSelection,
  hasRegistration,
  subjects,
  scores,
  onChange,
}: {
  isLoading: boolean;
  isError: boolean;
  hasSelection: boolean;
  hasRegistration: boolean;
  subjects: Parameters<typeof AddNewResultTable>[0]["subjects"];
  scores: SubjectScores;
  onChange: (
    subjectId: string,
    field: "mid_term_test" | "ca_score" | "exam_score",
    value: string
  ) => void;
}) {
  if (isLoading) {
    return (
      <p className="text-sm text-Text-meduim-emphasis">
        Loading the student&apos;s registered subjects...
      </p>
    );
  }
  if (isError) {
    return (
      <p className="text-sm text-secondary-red-600">
        Registered subjects could not be loaded. Please try again.
      </p>
    );
  }
  if (!hasSelection) {
    return (
      <p className="rounded border p-4 text-sm text-gray-800">
        Select a student, session, and term to load registered subjects.
      </p>
    );
  }
  if (hasSelection && !hasRegistration) {
    return (
      <p className="rounded border border-warning-main bg-warning-main/10 p-4 text-sm">
        This student has no subject registration for the selected session and
        term. Complete Subject Registration before entering results.
      </p>
    );
  }
  if (hasRegistration && subjects.length === 0) {
    return (
      <p className="rounded border p-4 text-sm text-gray-800">
        No subjects were selected in this student&apos;s registration.
      </p>
    );
  }
  return (
    <AddNewResultTable
      subjects={subjects}
      scores={scores}
      onChange={onChange}
    />
  );
}

export default function ResultInformation() {
  const [api, contextHolder] = notification.useNotification();

  const { data: studentsData, isLoading: isLoadingStudents } =
    useAllStudentsForResult();
  const { data: organization } = useOrganization();
  const { createResult, isCreatingResult } = useCreateResult(api);

  const students = studentsData?.students ?? [];
  const sessionOptions = React.useMemo(
    () => getSessionOptions(organization?.academic_settings?.current_session),
    [organization?.academic_settings?.current_session]
  );

  const [selectedStudentId, setSelectedStudentId] = React.useState("");
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [scores, setScores] = React.useState<SubjectScores>({});

  const selectedStudent = students.find(s => s._id === selectedStudentId);
  const selectedClassId =
    selectedStudent && typeof selectedStudent.academic_details.class === "object"
      ? selectedStudent.academic_details.class._id
      : "";
  const {
    data: registrationData,
    isLoading: isLoadingSubjects,
    isError: isSubjectsError,
  } = useStudentSubjectsForResult({
    studentId: selectedStudentId,
    classId: selectedClassId,
    session,
    term,
  });
  const subjects = registrationData?.registration?.selected_subjects ?? [];

  React.useEffect(() => {
    const settings = organization?.academic_settings;
    if (settings?.current_session && settings.current_term) {
      setSession(settings.current_session);
      setTerm(settings.current_term);
    }
  }, [organization?.academic_settings]);

  React.useEffect(() => {
    setScores({});
  }, [selectedStudentId, session, term]);

  const handleScoreChange = (
    subjectId: string,
    field: "mid_term_test" | "ca_score" | "exam_score",
    value: string
  ) => {
    setScores(prev => ({
      ...prev,
      [subjectId]: {
        mid_term_test: prev[subjectId]?.mid_term_test ?? "",
        ca_score: prev[subjectId]?.ca_score ?? "",
        exam_score: prev[subjectId]?.exam_score ?? "",
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    if (!selectedStudentId || !session || !term) {
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">
            Missing information
          </h3>
        ),
        description: "Please select a student, session, and term.",
        duration: 5,
        className: "ant-toast",
      });
      return;
    }

    if (hasInvalidScoreValues(scores)) {
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">
            Invalid scores
          </h3>
        ),
        description:
          "Scores must be positive numbers and the subject total cannot exceed 100.",
        duration: 5,
        className: "ant-toast",
      });
      return;
    }

    const blocks = buildResultBlocks(scores);

    if (!blocks.length) {
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">
            No scores entered
          </h3>
        ),
        description: "Enter at least one subject's scores before saving.",
        duration: 5,
        className: "ant-toast",
      });
      return;
    }

    const payload: CreateResultPayload = {
      student: selectedStudentId,
      session,
      term,
      blocks,
    };

    createResult(payload);
  };

  return (
    <section>
      {contextHolder}
      <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
        <div className="w-96">
          <h4 className="text-Text-high-emphasis font-semibold">
            Session information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on the student profile.
          </p>
        </div>
        <div className="flex flex-1 min-w-[60%] flex-wrap gap-5">
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="session"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Session
            </label>
            <select
              id="session"
              value={session}
              onChange={e => setSession(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            >
              <option value="">Select a session</option>
              {sessionOptions.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="term"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Term
            </label>
            <select
              id="term"
              value={term}
              onChange={e => setTerm(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            >
              <option value="">Select a term</option>
              {TERM_OPTIONS.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="student"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Select Student
            </label>
            <select
              id="student"
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            >
              <option value="">
                {isLoadingStudents ? "Loading students..." : "Select a student"}
              </option>
              {students.map(student => (
                <option key={student._id} value={student._id}>
                  {student.personal_information.first_name}{" "}
                  {student.personal_information.last_name} (
                  {student.registration_number})
                </option>
              ))}
            </select>
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="student_class"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Student class
            </label>
            <input
              type="text"
              id="student_class"
              readOnly
              value={
                selectedStudent &&
                typeof selectedStudent.academic_details.class === "object"
                  ? selectedStudent.academic_details.class.name
                  : ""
              }
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="-"
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="student_registration_number"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Student Registration number
            </label>
            <input
              type="text"
              id="student_registration_number"
              readOnly
              value={selectedStudent?.registration_number ?? ""}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="-"
            />
          </div>

          <ResultSubjectFields
            isLoading={isLoadingSubjects}
            isError={isSubjectsError}
            hasSelection={Boolean(selectedStudentId && session && term)}
            hasRegistration={Boolean(registrationData?.registration)}
            subjects={subjects}
            scores={scores}
            onChange={handleScoreChange}
          />
        </div>
      </div>
      <ul className="flex gap-2 justify-end">
        <li>
          <Link
            href={DASHBOARD_RESULT}
            className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-14 font-semibold text-sm inline-block"
          >
            Cancel
          </Link>
        </li>
        <li>
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-16 font-semibold text-sm disabled:opacity-50"
            onClick={handleSave}
            disabled={isCreatingResult}
          >
            Save
          </button>
        </li>
      </ul>
    </section>
  );
}
