import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_RESULT } from "@/config/links";
import { ResultBlockRecord, useResultById } from "@/templates/Result/hooks";

export default function ResultInfo() {
  const router = useRouter();
  const id = router.query.resultInfo as string;

  const { data: result, isLoading } = useResultById(id);

  const studentName = result
    ? `${result.student.personal_information.first_name} ${result.student.personal_information.last_name}`
    : "Result";

  return (
    <div>
      <Container headerTitle={studentName}>
        <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href={DASHBOARD_RESULT}
              className="inline-flex items-center gap-3 text-sm font-semibold text-primary-purple-700"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            {result && (
              <p className="rounded-full bg-neutral-300 px-3 py-1.5 text-xs font-semibold uppercase text-Text-high-emphasis">
                {result.session} | {result.term} | {result.status ?? "pending"}
              </p>
            )}
          </div>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !result ? (
            <div className="flex justify-center py-16 text-Text-meduim-emphasis">
              Result not found.
            </div>
          ) : (
            <ResultInformation result={result} studentName={studentName} />
          )}
        </main>
      </Container>
    </div>
  );
}

function ResultInformation({
  result,
  studentName,
}: {
  result: NonNullable<ReturnType<typeof useResultById>["data"]>;
  studentName: string;
}) {
  const className =
    typeof result.student.academic_details.class === "object"
      ? result.student.academic_details.class.name
      : "-";

  return (
    <div className="mt-8 grid gap-8 pb-12 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div>
        <h4 className="text-Text-high-emphasis font-semibold">
          Session information
        </h4>
        <p className="mt-1 text-sm tracking-tight text-Text-meduim-emphasis">
          This will be displayed on the student profile.
        </p>
      </div>
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <InfoField label="Session" value={result.session} />
        <InfoField label="Term" value={result.term} />
        <InfoField label="Student name" value={studentName} />
        <InfoField
          label="Student Registration number"
          value={result.student.registration_number}
        />
        <InfoField label="Student class" value={className} />

        <Table blocks={result.blocks} />
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="block mb-2 text-sm font-medium text-Text-high-emphasis">
        {label}
      </p>
      <p className="w-full rounded-lg border border-border-colour-light bg-neutral-300 px-3 py-2.5 text-Text-high-emphasis">
        {value}
      </p>
    </div>
  );
}

function Table({ blocks }: { blocks: ResultBlockRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-colour-light sm:col-span-2">
      <table className="w-full min-w-[720px] text-left text-sm text-Text-meduim-emphasis">
        <thead className="border-b border-border-colour-light bg-neutral-300 text-xs uppercase text-Text-high-emphasis">
          <tr>
            <th scope="col" className="pl-6 pr-3 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Mid-Term test
            </th>
            <th scope="col" className="px-6 py-3">
              CA Score
            </th>
            <th scope="col" className="px-6 py-3">
              Exam score
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {blocks.map(block => (
            <tr
              className="border-b border-border-colour-light bg-white last:border-0"
              key={block._id}
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium text-Text-high-emphasis">
                {typeof block.subject === "object" ? block.subject.name : "-"}
              </td>
              <td className="px-6 py-4">{block.mid_term_test}</td>
              <td className="px-6 py-4">{block.ca_score}</td>
              <td className="px-6 py-4">{block.exam_score}</td>
              <td className="px-6 py-4 font-semibold">{block.total}</td>
              <td className="px-6 py-4 font-semibold">{block.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
