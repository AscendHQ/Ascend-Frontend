import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { axiosInstance } from "@/api";
import {
  NEW_SCHOOL,
  PLATFORM_SCHOOL_DETAILS,
  PLATFORM_SCHOOLS,
} from "@/config/links";
import type {
  PlatformMetrics,
  PlatformSchoolMetric,
} from "@/types/platform-metrics";

const getMetrics = () =>
  axiosInstance
    .get("/organizations/metrics")
    .then(response => response.data as PlatformMetrics);

const formatCurrency = (value: number) =>
  value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Never";

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
}) {
  return (
    <article className="rounded-lg border border-border-colour-light bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-Text-meduim-emphasis">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-Text-high-emphasis">
            {value}
          </p>
          <p className="mt-1 text-xs text-Text-meduim-emphasis">{detail}</p>
        </div>
        <span className="rounded-lg bg-primary-purple-100 p-2 text-primary-purple-700">
          <Icon icon={icon} className="text-2xl" />
        </span>
      </div>
    </article>
  );
}

function AdoptionRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage = total
    ? Math.min(100, Math.round((value / total) * 100))
    : 0;
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-Text-meduim-emphasis">
          {value.toLocaleString()} accounts
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-300">
        <div
          className="h-full rounded-full bg-primary-purple-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function RecentSchools({ schools }: { schools: PlatformSchoolMetric[] }) {
  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Recent schools</h2>
          <p className="text-sm text-Text-meduim-emphasis">
            Newest schools on Ascend
          </p>
        </div>
        <Link
          href={PLATFORM_SCHOOLS}
          className="text-sm font-semibold text-primary-purple-700"
        >
          View all
        </Link>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-neutral-300 text-xs uppercase text-Text-meduim-emphasis">
            <tr>
              <th className="p-3">School</th>
              <th className="p-3">Administrator</th>
              <th className="p-3">Students</th>
              <th className="p-3">Setup</th>
              <th className="p-3">Last active</th>
            </tr>
          </thead>
          <tbody>
            {schools.map(school => (
              <tr
                key={school.id}
                className="border-t border-border-colour-light"
              >
                <td className="p-3 font-semibold">
                  <Link
                    href={PLATFORM_SCHOOL_DETAILS(school.id)}
                    className="text-primary-purple-700 hover:underline"
                  >
                    {school.name}
                  </Link>
                </td>
                <td className="p-3">
                  <span className="block">
                    {school.admin?.name || "Not assigned"}
                  </span>
                  <span className="text-xs text-Text-meduim-emphasis">
                    {school.admin?.email}
                  </span>
                </td>
                <td className="p-3">
                  {school.active_students.toLocaleString()}
                </td>
                <td className="p-3">
                  <span className="font-semibold">
                    {school.setup_progress}%
                  </span>
                  <div className="mt-1 h-1.5 w-24 overflow-hidden rounded bg-neutral-300">
                    <div
                      className="h-full bg-primary-purple-600"
                      style={{ width: `${school.setup_progress}%` }}
                    />
                  </div>
                </td>
                <td className="p-3">{formatDate(school.last_active)}</td>
              </tr>
            ))}
            {!schools.length && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-Text-meduim-emphasis"
                >
                  No schools have been onboarded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AttentionList({ schools }: { schools: PlatformSchoolMetric[] }) {
  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
      <h2 className="text-lg font-bold">Schools needing attention</h2>
      <p className="text-sm text-Text-meduim-emphasis">
        Operational risks worth following up
      </p>
      <div className="mt-4 space-y-3">
        {schools.slice(0, 6).map(school => (
          <div
            key={school.id}
            className="rounded-lg border border-border-colour-light p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <Link
                href={PLATFORM_SCHOOL_DETAILS(school.id)}
                className="font-semibold text-primary-purple-700 hover:underline"
              >
                {school.name}
              </Link>
              <span className="text-xs text-Text-meduim-emphasis">
                {school.setup_progress}% setup
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {school.attention_reasons.map(reason => (
                <span
                  key={reason}
                  className="rounded-full bg-warning-light px-2 py-1 text-xs text-warning-dark"
                >
                  {reason}
                </span>
              ))}
            </div>
          </div>
        ))}
        {!schools.length && (
          <p className="rounded-lg bg-secondary-green-100 p-4 text-sm text-secondary-green-600">
            No schools currently need attention.
          </p>
        )}
      </div>
    </section>
  );
}

export default function MetricsDashboard() {
  const metricsQuery = useQuery({
    queryKey: ["platformMetrics"],
    queryFn: getMetrics,
  });

  if (metricsQuery.isLoading) {
    return (
      <div className="m-4 rounded-lg border border-border-colour-light bg-white p-10 text-center text-Text-meduim-emphasis sm:m-6">
        Loading platform metrics...
      </div>
    );
  }
  if (metricsQuery.isError || !metricsQuery.data) {
    const error = metricsQuery.error as {
      response?: { status?: number; data?: string };
    };
    const status = error.response?.status;
    const message =
      status === 403
        ? "Your owner session could not be verified. Log out, sign in again, and retry."
        : status === 404
        ? "The metrics service is not available on the deployed backend yet."
        : error.response?.data ??
          "The metrics service encountered an error. Your owner access is not the problem.";
    return (
      <div className="m-4 rounded-lg border border-secondary-red-500 bg-white p-8 text-center sm:m-6">
        <h2 className="font-bold">Metrics could not be loaded</h2>
        <p className="mt-2 text-sm text-Text-meduim-emphasis">{message}</p>
        <button
          onClick={() => void metricsQuery.refetch()}
          className="mt-4 rounded-lg bg-primary-purple-700 px-5 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const { totals, recent_schools, schools_needing_attention } =
    metricsQuery.data;
  return (
    <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
            Platform overview
          </h1>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Monitor school adoption, setup, activity, and collections across
            Ascend.
          </p>
        </div>
        <Link
          href={NEW_SCHOOL}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white sm:w-auto"
        >
          <Icon
            icon="material-symbols:add-business-outline-rounded"
            className="text-lg"
          />{" "}
          Add school
        </Link>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Schools"
          value={totals.schools.toLocaleString()}
          detail={`${totals.new_schools_30_days} added in 30 days`}
          icon="material-symbols:domain-rounded"
        />
        <MetricCard
          label="Active schools"
          value={totals.active_schools_30_days.toLocaleString()}
          detail={`${totals.active_schools_7_days} active in 7 days`}
          icon="material-symbols:bolt-rounded"
        />
        <MetricCard
          label="Onboarding complete"
          value={`${totals.onboarding_complete}/${totals.schools}`}
          detail={`${totals.average_setup_progress}% average progress`}
          icon="material-symbols:task-alt-rounded"
        />
        <MetricCard
          label="Active students"
          value={totals.active_students.toLocaleString()}
          detail={`${totals.staff.toLocaleString()} staff records`}
          icon="material-symbols:groups-rounded"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <article className="rounded-lg border border-border-colour-light bg-white p-5">
          <h2 className="text-lg font-bold">Portal adoption</h2>
          <p className="text-sm text-Text-meduim-emphasis">
            Accounts created across every school
          </p>
          <div className="mt-5 space-y-5">
            <AdoptionRow
              label="Student portals"
              value={totals.student_portals}
              total={totals.active_students}
            />
            <AdoptionRow
              label="Parent portals"
              value={totals.parent_portals}
              total={totals.active_students}
            />
            <AdoptionRow
              label="Teacher portals"
              value={totals.teacher_portals}
              total={totals.staff}
            />
          </div>
        </article>

        <article className="rounded-lg border border-border-colour-light bg-white p-5">
          <h2 className="text-lg font-bold">Academic activity</h2>
          <p className="text-sm text-Text-meduim-emphasis">
            Recorded during the last 30 days
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-primary-purple-100 p-4">
              <p className="text-3xl font-bold">
                {totals.attendance_registers_30_days.toLocaleString()}
              </p>
              <p className="mt-1 text-sm">Attendance registers</p>
            </div>
            <div className="rounded-lg bg-secondary-green-100 p-4">
              <p className="text-3xl font-bold">
                {totals.result_submissions_30_days.toLocaleString()}
              </p>
              <p className="mt-1 text-sm">Result submissions</p>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-border-colour-light bg-white p-5">
          <h2 className="text-lg font-bold">Fee collection</h2>
          <p className="text-sm text-Text-meduim-emphasis">
            Recorded invoices and payments
          </p>
          <p className="mt-5 text-3xl font-bold">{totals.collection_rate}%</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-300">
            <div
              className="h-full rounded-full bg-secondary-green-600"
              style={{ width: `${Math.min(totals.collection_rate, 100)}%` }}
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-Text-meduim-emphasis">Billed</p>
              <p className="font-bold">{formatCurrency(totals.billed)}</p>
            </div>
            <div>
              <p className="text-Text-meduim-emphasis">Collected</p>
              <p className="font-bold">{formatCurrency(totals.collected)}</p>
            </div>
            <div>
              <p className="text-Text-meduim-emphasis">Invoices</p>
              <p className="font-bold">{totals.invoices}</p>
            </div>
            <div>
              <p className="text-Text-meduim-emphasis">Overdue</p>
              <p className="font-bold text-secondary-red-600">
                {totals.overdue_invoices}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 2xl:grid-cols-[2fr_1fr]">
        <RecentSchools schools={recent_schools} />
        <AttentionList schools={schools_needing_attention} />
      </section>
    </main>
  );
}
