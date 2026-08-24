import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import BulkResultUpload, {
  BulkResultStudent,
} from "@/components/portal/bulk-result-upload";
import { Spinner } from "@/components/ui/Loading";
import { useOrganization } from "@/templates/Settings/hooks";

type ClassOption = {
  _id: string;
  name: string;
  section?: string;
  other_section?: string;
};
type SubjectOption = {
  _id: string;
  name: string;
  code?: string;
  classes?: Array<string | { _id: string }>;
};
type Roster = {
  students: BulkResultStudent[];
  class: ClassOption;
  subject: SubjectOption;
};
const terms = ["1st Term", "2nd Term", "3rd Term"];
const className = (item: ClassOption) => {
  const section = item.other_section ?? item.section;
  return section ? `${item.name} - ${section}` : item.name;
};
const belongsToClass = (subject: SubjectOption, classId: string) =>
  (subject.classes ?? []).some(item =>
    typeof item === "string" ? item === classId : item._id === classId
  );

export default function BulkResults() {
  const { data: organization } = useOrganization();
  const [classId, setClassId] = React.useState("");
  const [subjectId, setSubjectId] = React.useState("");
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("");
  React.useEffect(() => {
    const settings = organization?.academic_settings;
    if (settings) {
      setSession(current => current || settings.current_session || "");
      setTerm(current => current || settings.current_term || "1st Term");
    }
  }, [organization?.academic_settings]);
  const classesQuery = useQuery({
    queryKey: ["bulkResultClasses"],
    queryFn: () =>
      axiosInstance
        .get("/classes")
        .then(response => response.data as { classes: ClassOption[] }),
  });
  const subjectsQuery = useQuery({
    queryKey: ["bulkResultSubjects"],
    queryFn: () =>
      axiosInstance
        .get("/subjects")
        .then(response => response.data as { subjects: SubjectOption[] }),
  });
  const classes = classesQuery.data?.classes ?? [];
  const subjects = (subjectsQuery.data?.subjects ?? []).filter(subject =>
    belongsToClass(subject, classId)
  );
  React.useEffect(() => {
    if (subjectId && !subjects.some(subject => subject._id === subjectId))
      setSubjectId("");
  }, [subjectId, subjects]);
  const rosterQuery = useQuery({
    queryKey: ["bulkResultRoster", classId, subjectId, session, term],
    queryFn: () =>
      axiosInstance
        .get("/results/bulk/roster", {
          params: { class_id: classId, subject_id: subjectId, session, term },
        })
        .then(response => response.data as Roster),
    enabled: Boolean(classId && subjectId && session && term),
  });
  const selectedClass = classes.find(item => item._id === classId);
  const selectedSubject = subjects.find(item => item._id === subjectId);
  const sessions = React.useMemo(() => {
    const year = new Date().getFullYear();
    const values = Array.from(
      { length: 7 },
      (_, index) => `${year + 1 - index}/${year + 2 - index}`
    );
    return session && !values.includes(session) ? [session, ...values] : values;
  }, [session]);

  return (
    <Container headerTitle="Bulk results">
      <main className="min-h-full bg-neutral-300 p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-5xl space-y-5">
          <Link
            href="/dashboard/results"
            className="inline-flex text-sm font-semibold text-primary-purple-700"
          >
            ← Back to results
          </Link>
          <section className="rounded-xl bg-white p-5 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-primary-purple-700">
              BULK RESULTS
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              Upload a class subject result
            </h1>
            <p className="mt-2 text-sm text-gray-800">
              Choose the exact class, subject, session, and term before
              downloading its populated roster.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold">
                Class
                <select
                  value={classId}
                  onChange={event => {
                    setClassId(event.target.value);
                    setSubjectId("");
                  }}
                  className="mt-1 w-full rounded border bg-white p-2 font-normal"
                >
                  <option value="">Select class</option>
                  {classes.map(item => (
                    <option key={item._id} value={item._id}>
                      {className(item)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Subject
                <select
                  value={subjectId}
                  disabled={!classId}
                  onChange={event => setSubjectId(event.target.value)}
                  className="mt-1 w-full rounded border bg-white p-2 font-normal disabled:bg-gray-100"
                >
                  <option value="">Select subject</option>
                  {subjects.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                      {item.code ? ` (${item.code})` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor="bulk-result-session"
                className="text-sm font-semibold"
              >
                Session
                <Select
                  id="bulk-result-session"
                  value={session || undefined}
                  onChange={setSession}
                  options={sessions.map(value => ({ value, label: value }))}
                  className="mt-1 w-full"
                />
              </label>
              <label
                htmlFor="bulk-result-term"
                className="text-sm font-semibold"
              >
                Term
                <Select
                  id="bulk-result-term"
                  value={term || undefined}
                  onChange={setTerm}
                  options={terms.map(value => ({ value, label: value }))}
                  className="mt-1 w-full"
                />
              </label>
            </div>
          </section>
          {rosterQuery.isLoading && (
            <div className="flex justify-center rounded-xl bg-white py-16">
              <Spinner />
            </div>
          )}
          {rosterQuery.isError && (
            <p className="rounded-xl border border-secondary-red-500 bg-white p-6 text-center">
              The roster could not be loaded. Confirm the selected subject
              belongs to this class.
            </p>
          )}
          {rosterQuery.data && rosterQuery.data.students.length === 0 && (
            <p className="rounded-xl bg-white p-8 text-center">
              No student in this class is registered for the selected subject.
            </p>
          )}
          {rosterQuery.data &&
            rosterQuery.data.students.length > 0 &&
            selectedClass &&
            selectedSubject && (
              <BulkResultUpload
                students={rosterQuery.data.students}
                endpoint="/results/bulk"
                fields={{
                  class_id: classId,
                  subject_id: subjectId,
                  session,
                  term,
                }}
                fileName={`ascend-${className(selectedClass)}-${
                  selectedSubject.code ?? "subject"
                }-${session}-${term}.csv`}
              />
            )}
        </div>
      </main>
    </Container>
  );
}
