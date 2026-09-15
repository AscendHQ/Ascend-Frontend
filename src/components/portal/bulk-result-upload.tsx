import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";

export type BulkResultStudent = {
  _id: string;
  registration_number: string;
  personal_information?: {
    first_name: string;
    middle_name?: string;
    last_name: string;
  };
};
type ImportError = { row: number; field: string; message: string };
type ApiError = Error & {
  response?: { data?: string | { message?: string; errors?: ImportError[] } };
};

const csvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;
const studentName = (student: BulkResultStudent) =>
  [
    student.personal_information?.last_name,
    student.personal_information?.first_name,
    student.personal_information?.middle_name,
  ]
    .filter(Boolean)
    .join(" ");

const downloadRoster = (students: BulkResultStudent[], fileName: string) => {
  const header =
    "registration_number,student_name,mid_term_test,ca_score,exam_score";
  const rows = students.map(student =>
    [
      csvValue(student.registration_number),
      csvValue(studentName(student)),
      "",
      "",
      "",
    ].join(",")
  );
  const url = URL.createObjectURL(
    new Blob([[header, ...rows].join("\n")], { type: "text/csv" })
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
};

const readError = (error: ApiError) => {
  const data = error.response?.data;
  if (typeof data === "string") return { message: data, errors: [] };
  return {
    message: data?.message ?? "Results could not be uploaded",
    errors: data?.errors ?? [],
  };
};

export default function BulkResultUpload({
  students,
  endpoint,
  fields,
  fileName,
  locked = false,
  teacher = false,
}: {
  students: BulkResultStudent[];
  endpoint: string;
  fields: Record<string, string>;
  fileName: string;
  locked?: boolean;
  teacher?: boolean;
}) {
  const queryClient = useQueryClient();
  const [file, setFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<ImportError[]>([]);
  const [action, setAction] = React.useState<"draft" | "submit">("submit");
  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Choose the completed CSV file");
      const body = new FormData();
      body.append("csv", file);
      Object.entries(fields).forEach(([key, value]) => body.append(key, value));
      if (teacher) body.append("action", action);
      return axiosInstance.post(endpoint, body).then(response => response.data);
    },
    onSuccess: response => {
      setErrors([]);
      setFile(null);
      notification.success({
        message:
          teacher && action === "submit"
            ? "Results submitted"
            : "Results uploaded",
        description: response?.message ?? "Every student result was accepted.",
      });
      queryClient.invalidateQueries({ queryKey: ["allResults"] });
      queryClient.invalidateQueries({ queryKey: ["teacherResults"] });
    },
    onError: (error: ApiError) => {
      const problem = readError(error);
      setErrors(problem.errors);
      notification.error({
        message: "Upload needs attention",
        description: problem.message,
        duration: 8,
      });
    },
  });

  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">Bulk result upload</h2>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Download this class roster, enter all scores, then upload it
            unchanged.
          </p>
        </div>
        <button
          type="button"
          disabled={!students.length}
          onClick={() => downloadRoster(students, fileName)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary-purple-700 px-4 py-2.5 text-sm font-semibold text-primary-purple-700 transition-colors hover:bg-primary-purple-100 disabled:opacity-50 sm:w-auto"
        >
          <Icon icon="material-symbols:download-rounded" />
          Download roster CSV
        </button>
      </div>
      {!locked && students.length > 0 && (
        <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={event => {
              setErrors([]);
              setFile(event.target.files?.[0] ?? null);
            }}
            className="max-w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2 text-sm"
          />
          {teacher && (
            <select
              value={action}
              onChange={event =>
                setAction(event.target.value as "draft" | "submit")
              }
              className="rounded-lg border border-border-colour-light bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-purple-700"
            >
              <option value="submit">Submit for approval</option>
              <option value="draft">Save as draft</option>
            </select>
          )}
          <button
            type="button"
            disabled={!file || mutation.isPending}
            onClick={() => mutation.mutate()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {mutation.isPending ? (
              <Spinner />
            ) : (
              <Icon icon="material-symbols:upload-rounded" />
            )}
            Validate and upload
          </button>
        </div>
      )}
      {locked && (
        <p className="mt-4 text-sm text-Text-meduim-emphasis">
          This result sheet is locked while pending or approved.
        </p>
      )}
      {errors.length > 0 && (
        <div className="mt-5 overflow-x-auto rounded-lg border border-secondary-red-300">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="bg-secondary-red-100">
                <th className="p-3">CSV row</th>
                <th className="p-3">Column</th>
                <th className="p-3">Problem</th>
              </tr>
            </thead>
            <tbody>
              {errors.map(error => (
                <tr
                  key={`${error.row}-${error.field}-${error.message}`}
                  className="border-t"
                >
                  <td className="p-3">{error.row || "Roster"}</td>
                  <td className="p-3 font-medium">{error.field}</td>
                  <td className="p-3">{error.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
