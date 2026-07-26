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
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_RESULT}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            {result && (
              <p className="uppercase text-sm">
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
            <ResultInformation
              result={result}
              studentName={studentName}
            />
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
    <div className="lg:min-w-[250px] flex-1">
      <p className="block mb-2 text-sm font-medium text-Text-high-emphasis">
        {label}
      </p>
      <p className="border border-border-colour-light w-full rounded-lg bg-neutral-300 px-3 py-2 text-Text-high-emphasis">
        {value}
      </p>
    </div>
  );
}

function Table({ blocks }: { blocks: ResultBlockRecord[] }) {
  return (
    <div className="overflow-scroll shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-b border-grey-300 bg-gray-50 ">
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
            <tr className="bg-white border-b " key={block._id}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {typeof block.subject === "object"
                  ? block.subject.name
                  : "-"}
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
