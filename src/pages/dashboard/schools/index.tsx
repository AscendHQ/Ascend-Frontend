import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { NEW_SCHOOL, PLATFORM_SCHOOL_DETAILS } from "@/config/links";
import type { PlatformMetrics } from "@/types/platform-metrics";
import type { PlatformSchoolMetric } from "@/types/platform-metrics";

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString("en-NG") : "Never";

function HealthBadge({ school }: { school: PlatformSchoolMetric }) {
  if (!school.is_active) {
    return (
      <span className="rounded-full bg-warning-light px-2.5 py-1 text-xs font-semibold text-warning-dark">
        Suspended
      </span>
    );
  }
  if (school.attention_reasons.length) {
    return (
      <span className="rounded-full bg-warning-light px-2.5 py-1 text-xs font-semibold text-warning-dark">
        Needs attention
      </span>
    );
  }
  return (
    <span className="rounded-full bg-secondary-green-100 px-2.5 py-1 text-xs font-semibold text-secondary-green-600">
      Healthy
    </span>
  );
}

function MobileSchoolCard({ school }: { school: PlatformSchoolMetric }) {
  return (
    <article className="rounded-lg border border-border-colour-light p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-Text-high-emphasis">
            {school.name}
          </h2>
          <p className="mt-1 truncate text-sm text-Text-meduim-emphasis">
            {school.admin?.email || "No administrator assigned"}
          </p>
        </div>
        <HealthBadge school={school} />
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-Text-meduim-emphasis">Students</dt>
          <dd className="mt-1 font-semibold">
            {school.active_students.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-Text-meduim-emphasis">Staff</dt>
          <dd className="mt-1 font-semibold">
            {school.staff.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-Text-meduim-emphasis">Setup</dt>
          <dd className="mt-1 font-semibold">{school.setup_progress}%</dd>
        </div>
        <div>
          <dt className="text-Text-meduim-emphasis">Last active</dt>
          <dd className="mt-1 font-semibold">
            {formatDate(school.last_active)}
          </dd>
        </div>
      </dl>
      <Link
        href={PLATFORM_SCHOOL_DETAILS(school.id)}
        className="mt-4 block rounded-lg border border-primary-purple-700 px-4 py-2.5 text-center text-sm font-semibold text-primary-purple-700"
      >
        Manage school
      </Link>
    </article>
  );
}

export default function PlatformSchoolsPage() {
  const [search, setSearch] = React.useState("");
  const metricsQuery = useQuery({
    queryKey: ["platformMetrics"],
    queryFn: () =>
      axiosInstance
        .get("/organizations/metrics")
        .then(response => response.data as PlatformMetrics),
  });
  const normalizedSearch = search.trim().toLowerCase();
  const schools = (metricsQuery.data?.schools ?? []).filter(school =>
    [school.name, school.admin?.name, school.admin?.email].some(
      value => value?.toLowerCase().includes(normalizedSearch)
    )
  );

  return (
    <Container headerTitle="Schools">
      <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
              Schools
            </h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Monitor every school onboarded to Ascend.
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

        <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
          <label className="flex max-w-lg items-center gap-3 rounded-lg border border-border-colour-light px-4 py-3">
            <Icon
              icon="material-symbols:search-rounded"
              className="text-xl text-Text-meduim-emphasis"
            />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search school or administrator"
              className="w-full border-0 bg-transparent text-sm outline-none"
            />
          </label>

          {metricsQuery.isLoading ? (
            <p className="p-10 text-center text-Text-meduim-emphasis">
              Loading schools...
            </p>
          ) : metricsQuery.isError ? (
            <div className="p-10 text-center">
              <p className="font-semibold">Schools could not be loaded.</p>
              <button
                onClick={() => void metricsQuery.refetch()}
                className="mt-3 text-sm font-semibold text-primary-purple-700"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="mt-5 space-y-3 md:hidden">
                {schools.map(school => (
                  <MobileSchoolCard key={school.id} school={school} />
                ))}
                {!schools.length && (
                  <p className="rounded-lg border border-dashed border-border-colour-light p-10 text-center text-Text-meduim-emphasis">
                    No matching schools found.
                  </p>
                )}
              </div>
              <div className="mt-5 hidden overflow-x-auto rounded-lg border border-border-colour-light md:block">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-neutral-300 text-xs uppercase text-Text-meduim-emphasis">
                    <tr>
                      <th className="p-3">School</th>
                      <th className="p-3">Administrator</th>
                      <th className="p-3">Current period</th>
                      <th className="p-3">Students</th>
                      <th className="p-3">Staff</th>
                      <th className="p-3">Setup</th>
                      <th className="p-3">Last active</th>
                      <th className="p-3">Attention</th>
                      <th className="p-3">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map(school => (
                      <tr
                        key={school.id}
                        className="border-t border-border-colour-light align-top hover:bg-neutral-300/40"
                      >
                        <td className="p-3 font-semibold">{school.name}</td>
                        <td className="p-3">
                          <span className="block">
                            {school.admin?.name || "Not assigned"}
                          </span>
                          <span className="text-xs text-Text-meduim-emphasis">
                            {school.admin?.email}
                          </span>
                        </td>
                        <td className="p-3">
                          {school.current_session
                            ? `${school.current_session}, ${school.current_term}`
                            : "Not configured"}
                        </td>
                        <td className="p-3">{school.active_students}</td>
                        <td className="p-3">{school.staff}</td>
                        <td className="p-3 font-semibold">
                          {school.setup_progress}%
                        </td>
                        <td className="p-3">
                          {formatDate(school.last_active)}
                        </td>
                        <td className="p-3">
                          <div className="flex max-w-xs flex-wrap gap-1">
                            {school.attention_reasons.map(reason => (
                              <span
                                key={reason}
                                className="rounded-full bg-warning-light px-2 py-1 text-xs text-warning-dark"
                              >
                                {reason}
                              </span>
                            ))}
                            {!school.attention_reasons.length && (
                              <HealthBadge school={school} />
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <Link
                            href={PLATFORM_SCHOOL_DETAILS(school.id)}
                            className="font-semibold text-primary-purple-700"
                          >
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {!schools.length && (
                      <tr>
                        <td
                          colSpan={9}
                          className="p-10 text-center text-Text-meduim-emphasis"
                        >
                          No matching schools found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </main>
    </Container>
  );
}
