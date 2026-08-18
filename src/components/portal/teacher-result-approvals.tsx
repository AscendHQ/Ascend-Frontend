import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";

type Submission = {
  _id: string;
  teacher_profile: {
    staff: {
      surname: string;
      other_names: string;
      staff_no: string;
    };
  };
  class: {
    name: string;
    section?: string;
    other_section?: string;
  };
  subject: { name: string; code: string };
  session: string;
  term: string;
  records: Array<{
    student: {
      _id: string;
      registration_number: string;
      personal_information: { first_name: string; last_name: string };
    };
    mid_term_test: number;
    ca_score: number;
    exam_score: number;
    total: number;
    grade: string;
  }>;
};

const getClassName = (item: Submission["class"]) => {
  const section = item.other_section ?? item.section;
  return section ? `${item.name} - ${section}` : item.name;
};

function SubmissionCard({
  submission,
  pending,
  review,
}: {
  submission: Submission;
  pending: boolean;
  review: (decision: "approved" | "rejected", note: string) => void;
}) {
  const [note, setNote] = React.useState("");
  const staff = submission.teacher_profile.staff;
  return (
    <article className="rounded-xl border bg-white p-5">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h3 className="font-bold">
            {getClassName(submission.class)} · {submission.subject.name}
          </h3>
          <p className="text-sm text-gray-800">
            {staff.surname} {staff.other_names} ({staff.staff_no}) ·{" "}
            {submission.session}, {submission.term}
          </p>
        </div>
        <span className="text-sm font-semibold">
          {submission.records.length} student(s)
        </span>
      </div>
      <div className="mt-4 max-h-72 overflow-auto rounded border">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="sticky top-0 bg-grey-50 text-xs uppercase">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Mid-term</th>
              <th className="p-3">CA</th>
              <th className="p-3">Exam</th>
              <th className="p-3">Total</th>
              <th className="p-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {submission.records.map(record => (
              <tr key={record.student._id} className="border-t">
                <td className="p-3">
                  <span className="font-semibold">
                    {record.student.personal_information.last_name}{" "}
                    {record.student.personal_information.first_name}
                  </span>
                  <span className="ml-2 text-xs text-gray-800">
                    {record.student.registration_number}
                  </span>
                </td>
                <td className="p-3">{record.mid_term_test}</td>
                <td className="p-3">{record.ca_score}</td>
                <td className="p-3">{record.exam_score}</td>
                <td className="p-3 font-semibold">{record.total}</td>
                <td className="p-3 font-semibold">{record.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="min-w-[240px] flex-1 text-sm font-semibold">
          Review note (required when rejecting)
          <input
            value={note}
            maxLength={500}
            onChange={event => setNote(event.target.value)}
            className="mt-1 w-full rounded border p-2 font-normal"
            placeholder="Optional approval note"
          />
        </label>
        <button
          type="button"
          disabled={pending || !note.trim()}
          onClick={() => review("rejected", note)}
          className="rounded-lg border border-red-700 px-4 py-2 font-semibold text-red-700 disabled:opacity-50"
        >
          Reject
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => review("approved", note)}
          className="rounded-lg bg-primary-purple-700 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          Approve results
        </button>
      </div>
    </article>
  );
}

export default function TeacherResultApprovals() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const submissionsQuery = useQuery({
    queryKey: ["teacherResultSubmissions", "pending"],
    queryFn: () =>
      axiosInstance
        .get("/results/teacher-submissions", {
          params: { status: "pending" },
        })
        .then(response => response.data as Submission[]),
  });
  const reviewMutation = useMutation({
    mutationFn: ({
      id,
      decision,
      note,
    }: {
      id: string;
      decision: "approved" | "rejected";
      note: string;
    }) =>
      axiosInstance.put(`/results/teacher-submissions/${id}/review`, {
        decision,
        note,
      }),
    onSuccess: (_, variables) => {
      api.success({
        message:
          variables.decision === "approved"
            ? "Teacher results approved"
            : "Teacher results returned for correction",
      });
      queryClient.invalidateQueries({ queryKey: ["teacherResultSubmissions"] });
      queryClient.invalidateQueries({ queryKey: ["allResults"] });
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Submission could not be reviewed",
        description: error.response?.data ?? error.message,
      }),
  });

  if (submissionsQuery.isLoading) {
    return (
      <div className="flex justify-center rounded-xl border py-10">
        <Spinner />
      </div>
    );
  }
  if (submissionsQuery.isError) return null;
  const submissions = submissionsQuery.data ?? [];
  if (!submissions.length) return null;
  return (
    <section className="mt-6 rounded-xl border bg-neutral-300 p-5">
      {contextHolder}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Teacher results awaiting approval</h2>
        <p className="text-sm text-gray-800">
          Review each full class and subject sheet before publishing it.
        </p>
      </div>
      <div className="space-y-4">
        {submissions.map(submission => (
          <SubmissionCard
            key={submission._id}
            submission={submission}
            pending={reviewMutation.isPending}
            review={(decision, note) =>
              reviewMutation.mutate({ id: submission._id, decision, note })
            }
          />
        ))}
      </div>
    </section>
  );
}
