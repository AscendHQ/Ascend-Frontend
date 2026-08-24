import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_TEACHER } from "@/config/links";

type ImportError = {
  row: number;
  field: string;
  message: string;
};

type ImportResponse = {
  imported: number;
  message: string;
};

type ApiError = Error & {
  response?: {
    data?: string | { message?: string; errors?: ImportError[] };
  };
};

const CSV_HEADERS = [
  "staff_number",
  "surname",
  "other_names",
  "sex",
  "status",
  "employment_type",
  "denomination",
  "department",
  "qualifications",
  "post",
  "address",
  "phone_number",
  "employment_date",
];

const CSV_SAMPLE = [
  "",
  "Adebayo",
  "Grace Oluwaseun",
  "female",
  "teaching",
  "permanent",
  "adventist",
  "Science",
  "BSc;PGDE",
  "Biology Teacher",
  "12 School Road",
  "08012345678",
  "2026-09-01",
];

const downloadTemplate = () => {
  const content = `${CSV_HEADERS.join(",")}\n${CSV_SAMPLE.join(",")}\n`;
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ascend-staff-import-template.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};

const getApiError = (error: ApiError) => {
  const data = error.response?.data;
  if (typeof data === "string") {
    return { message: data, errors: [] as ImportError[] };
  }

  return {
    message: data?.message ?? "Staff could not be imported",
    errors: data?.errors ?? [],
  };
};

export default function ImportStaff() {
  const queryClient = useQueryClient();
  const [file, setFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<ImportError[]>([]);
  const [result, setResult] = React.useState<ImportResponse | null>(null);

  const importMutation = useMutation({
    mutationFn: async (csvFile: File) => {
      const formData = new FormData();
      formData.append("csv", csvFile);
      return axiosInstance
        .post("/staffs/bulk", formData)
        .then(response => response.data as ImportResponse);
    },
    onSuccess: response => {
      setErrors([]);
      setResult(response);
      queryClient.invalidateQueries({ queryKey: ["allStaff"] });
      queryClient.invalidateQueries({ queryKey: ["schoolSetupStatus"] });
      notification.success({
        message: "Staff imported",
        description: response.message,
      });
    },
    onError: (error: ApiError) => {
      const apiError = getApiError(error);
      setResult(null);
      setErrors(apiError.errors);
      notification.error({
        message: "Import needs attention",
        description: apiError.message,
        duration: 8,
      });
    },
  });

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setErrors([]);
    setResult(null);

    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setFile(null);
      notification.error({
        message: "File is too large",
        description: "Choose a CSV file smaller than 2 MB.",
      });
      return;
    }

    setFile(selectedFile);
  };

  const submitImport = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      notification.error({
        message: "Choose a CSV file",
        description: "Download the template, complete it, then select the file.",
      });
      return;
    }
    importMutation.mutate(file);
  };

  return (
    <Container headerTitle="Import staff">
      <main className="min-h-full bg-neutral-300 p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href={DASHBOARD_TEACHER}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium"
          >
            <Icon icon="material-symbols:arrow-back-rounded" />
            Back to staff
          </Link>

          <section className="rounded-xl bg-white p-5 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-primary-purple-700">
              BULK STAFF IMPORT
            </p>
            <h1 className="mt-1 text-2xl font-bold text-Text-high-emphasis">
              Register staff from a CSV file
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-800">
              Download the template and keep its column names unchanged.
              Blank staff numbers will be generated automatically. Use the
              listed values for status, employment type and denomination.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["1", "Download template", "Use the Ascend CSV structure."],
                ["2", "Complete the rows", "One staff member per row; maximum 500."],
                ["3", "Upload and review", "Nothing imports until every row is valid."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-lg border border-border-colour-light p-4"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-purple-100 text-sm font-bold text-primary-purple-700">
                    {number}
                  </span>
                  <p className="mt-3 text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-800">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={downloadTemplate}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary-purple-700 px-4 py-2.5 text-sm font-semibold text-primary-purple-700"
            >
              <Icon icon="material-symbols:download-rounded" />
              Download CSV template
            </button>

            <form onSubmit={submitImport} className="mt-6">
              <label
                htmlFor="staff-csv"
                className="block rounded-xl border-2 border-dashed border-primary-purple-300 bg-primary-purple-100 p-6 text-center"
              >
                <Icon
                  icon="material-symbols:upload-file-outline"
                  className="mx-auto text-4xl text-primary-purple-700"
                />
                <span className="mt-2 block text-sm font-semibold">
                  Choose the completed CSV file
                </span>
                <span className="mt-1 block text-xs text-gray-800">
                  CSV only, up to 2 MB
                </span>
                <input
                  id="staff-csv"
                  type="file"
                  accept=".csv,text/csv"
                  onChange={selectFile}
                  className="mx-auto mt-4 block max-w-full text-sm"
                />
              </label>

              {file && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-neutral-300 p-3 text-sm">
                  <Icon icon="material-symbols:description-outline-rounded" />
                  <span className="break-all font-medium">{file.name}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || importMutation.isPending}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {importMutation.isPending ? <Spinner /> : null}
                {importMutation.isPending ? "Checking file..." : "Import staff"}
              </button>
            </form>
          </section>

          {result && (
            <section className="mt-5 rounded-xl border border-secondary-green-300 bg-secondary-green-100 p-5">
              <h2 className="font-semibold text-secondary-green-700">
                Staff import completed
              </h2>
              <p className="mt-1 text-sm">{result.message}</p>
              <Link
                href={DASHBOARD_TEACHER}
                className="mt-3 inline-flex text-sm font-semibold text-primary-purple-700"
              >
                View staff
              </Link>
            </section>
          )}

          {errors.length > 0 && (
            <section className="mt-5 rounded-xl bg-white p-5">
              <h2 className="font-semibold text-secondary-red-700">
                Fix these rows and upload again
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3">CSV row</th>
                      <th className="p-3">Column</th>
                      <th className="p-3">Problem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map(error => (
                      <tr
                        key={`${error.row}-${error.field}-${error.message}`}
                        className="border-b border-neutral-500"
                      >
                        <td className="p-3">{error.row}</td>
                        <td className="p-3 font-medium">{error.field}</td>
                        <td className="p-3">{error.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </Container>
  );
}
