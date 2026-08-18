import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { NEW_SCHOOL } from "@/config/links";
import type { PlatformMetrics } from "@/types/platform-metrics";

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString("en-NG") : "Never";

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
    [school.name, school.admin?.name, school.admin?.email].some(value =>
      value?.toLowerCase().includes(normalizedSearch),
    ),
  );

  return (
    <Container headerTitle="Schools">
      <main className="min-h-full bg-neutral-300 p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Schools</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor every school onboarded to Ascend.
            </p>
          </div>
          <Link
            href={NEW_SCHOOL}
            className="rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white"
          >
            + Add school
          </Link>
        </div>

        <section className="mt-6 rounded-xl border border-border-colour-light bg-white p-5">
          <label className="flex max-w-lg items-center gap-3 rounded-lg border border-border-colour-light px-4 py-3">
            <Icon icon="material-symbols:search-rounded" className="text-xl text-gray-500" />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search school or administrator"
              className="w-full border-0 bg-transparent text-sm outline-none"
            />
          </label>

          {metricsQuery.isLoading ? (
            <p className="p-10 text-center text-gray-500">Loading schools...</p>
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
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-neutral-300 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="p-3">School</th>
                    <th className="p-3">Administrator</th>
                    <th className="p-3">Current period</th>
                    <th className="p-3">Students</th>
                    <th className="p-3">Staff</th>
                    <th className="p-3">Setup</th>
                    <th className="p-3">Last active</th>
                    <th className="p-3">Attention</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map(school => (
                    <tr key={school.id} className="border-t border-border-colour-light align-top">
                      <td className="p-3 font-semibold">{school.name}</td>
                      <td className="p-3">
                        <span className="block">{school.admin?.name || "Not assigned"}</span>
                        <span className="text-xs text-gray-500">{school.admin?.email}</span>
                      </td>
                      <td className="p-3">{school.current_session ? `${school.current_session}, ${school.current_term}` : "Not configured"}</td>
                      <td className="p-3">{school.active_students}</td>
                      <td className="p-3">{school.staff}</td>
                      <td className="p-3 font-semibold">{school.setup_progress}%</td>
                      <td className="p-3">{formatDate(school.last_active)}</td>
                      <td className="p-3">
                        <div className="flex max-w-xs flex-wrap gap-1">
                          {school.attention_reasons.map(reason => (
                            <span key={reason} className="rounded-full bg-warning-light px-2 py-1 text-xs text-warning-dark">{reason}</span>
                          ))}
                          {!school.attention_reasons.length && <span className="text-secondary-green-600">Healthy</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!schools.length && (
                    <tr><td colSpan={8} className="p-10 text-center text-gray-500">No matching schools found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </Container>
  );
}
