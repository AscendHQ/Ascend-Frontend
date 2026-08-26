import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_STUDENT_INFO } from "@/config/links";
import {
  FinancialOverviewResponse,
  StudentFinancialBalance,
} from "@/types/fees";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

const getStudentName = (account: StudentFinancialBalance) =>
  [
    account.student.personal_information.first_name,
    account.student.personal_information.middle_name,
    account.student.personal_information.last_name,
  ]
    .filter(Boolean)
    .join(" ");

function OverviewCards({ data }: { data: FinancialOverviewResponse }) {
  const cards = [
    ["Expected this term", formatCurrency(data.summary.expected)],
    ["Collected for this term", formatCurrency(data.summary.collected)],
    ["This term outstanding", formatCurrency(data.summary.current_outstanding)],
    ["Previous arrears", formatCurrency(data.summary.previous_arrears)],
    ["Total receivable", formatCurrency(data.summary.total_receivable)],
    ["Collection rate", `${data.summary.collection_rate}%`],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {cards.map(([label, value]) => (
        <div key={label} className="rounded-lg border bg-white p-4">
          <p className="text-xs text-gray-800">{label}</p>
          <p className="mt-1 text-xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}

function PaymentStatusCounts({ data }: { data: FinancialOverviewResponse }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 text-sm">
      <span className="rounded-full bg-success-light px-3 py-1 font-semibold text-success-dark">
        {data.summary.fully_paid} fully paid
      </span>
      <span className="rounded-full bg-warning-light px-3 py-1 font-semibold text-warning-dark">
        {data.summary.partially_paid} partially paid
      </span>
      <span className="rounded-full bg-secondary-red-500/10 px-3 py-1 font-semibold text-secondary-red-600">
        {data.summary.unpaid} unpaid
      </span>
    </div>
  );
}

function StudentAccounts({
  accounts,
}: {
  accounts: StudentFinancialBalance[];
}) {
  const [search, setSearch] = React.useState("");
  const normalized = search.trim().toLowerCase();
  const filtered = normalized
    ? accounts.filter(account =>
        [getStudentName(account), account.student.registration_number].some(
          value => value.toLowerCase().includes(normalized)
        )
      )
    : accounts;
  return (
    <section className="mt-6 rounded-lg border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Student account overview</h2>
          <p className="text-sm text-gray-800">
            Current balances and the earlier periods that produced arrears.
          </p>
        </div>
        <label className="flex w-full max-w-sm items-center gap-2 rounded-lg border px-3 py-2">
          <Icon icon="material-symbols:search-rounded" />
          <span className="sr-only">Search students</span>
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Name or registration number"
            className="w-full border-0 bg-transparent text-sm outline-none"
          />
        </label>
      </div>
      {!filtered.length ? (
        <p className="py-10 text-center text-sm text-gray-800">
          No student accounts match this view.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-grey-50 text-xs uppercase text-gray-800">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Expected</th>
                <th className="p-3">Paid</th>
                <th className="p-3">This term</th>
                <th className="p-3">Previous arrears</th>
                <th className="p-3">Total outstanding</th>
                <th className="p-3">Arrears source</th>
                <th className="p-3">Statement</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(account => (
                <tr key={account.student._id} className="border-t align-top">
                  <td className="p-3">
                    <p className="font-semibold">{getStudentName(account)}</p>
                    <p className="text-xs text-gray-800">
                      {account.student.registration_number}
                    </p>
                  </td>
                  <td className="p-3">
                    {formatCurrency(account.current_expected)}
                  </td>
                  <td className="p-3 text-secondary-green-600">
                    {formatCurrency(account.current_paid)}
                  </td>
                  <td className="p-3">
                    {formatCurrency(account.current_balance)}
                  </td>
                  <td className="p-3">
                    {formatCurrency(account.arrears_balance)}
                  </td>
                  <td className="p-3 font-bold">
                    {formatCurrency(account.total_outstanding)}
                  </td>
                  <td className="p-3">
                    {account.arrears_sources.length ? (
                      <div className="space-y-1">
                        {account.arrears_sources.map(source => (
                          <p
                            key={source.period}
                            className="whitespace-nowrap text-xs"
                          >
                            {source.period}: {formatCurrency(source.amount)}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-800">None</span>
                    )}
                  </td>
                  <td className="p-3">
                    <Link
                      href={DASHBOARD_STUDENT_INFO(account.student._id)}
                      className="font-semibold text-primary-purple-700"
                    >
                      View account
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function FinancialOverview({
  session,
  term,
  classId,
}: {
  session: string;
  term: string;
  classId: string;
}) {
  const overviewQuery = useQuery({
    queryKey: ["feeFinancialOverview", session, term, classId],
    queryFn: () =>
      axiosInstance
        .get("/fees/overview", {
          params: { session, term, class_id: classId || undefined },
        })
        .then(response => response.data as FinancialOverviewResponse),
    enabled: Boolean(session && term),
  });
  if (overviewQuery.isLoading) {
    return (
      <div className="flex justify-center rounded-lg bg-white py-12">
        <Spinner />
      </div>
    );
  }
  if (!overviewQuery.data) {
    return (
      <p className="rounded-lg border bg-white p-6 text-center text-secondary-red-600">
        Financial overview could not be loaded.
      </p>
    );
  }
  return (
    <>
      <OverviewCards data={overviewQuery.data} />
      <PaymentStatusCounts data={overviewQuery.data} />
      <StudentAccounts accounts={overviewQuery.data.students} />
    </>
  );
}
