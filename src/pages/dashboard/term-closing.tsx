import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import {
  ACCOUNT_SETTING_GENERALSETTING,
  DASHBOARD_RESULT,
  STUDENT_PROGRESSION,
  SUBJECT_REGISTRATION,
} from "@/config/links";
import { useOrganization } from "@/templates/Settings/hooks";

type ClassReadiness = {
  class_id: string;
  class_name: string;
  level: string;
  section?: string;
  other_section?: string;
  total_students: number;
  registered_students: number;
  students_with_results: number;
  progressed_students: number;
  ready_for_progression: boolean;
  complete: boolean;
};

type TermClosingSummary = {
  session: string;
  term: string;
  next_period: { session: string; term: string };
  already_closed: boolean;
  ready_to_close: boolean;
  classes: ClassReadiness[];
};

const getClassLabel = (classSummary: ClassReadiness) => {
  const section =
    classSummary.level === "junior"
      ? classSummary.other_section
      : classSummary.section;
  return section
    ? `${classSummary.class_name} - ${section}`
    : classSummary.class_name;
};

function CompletionCount({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const isComplete = completed === total;
  return (
    <span
      className={
        isComplete ? "text-secondary-green-600" : "text-secondary-red-600"
      }
    >
      {completed}/{total}
    </span>
  );
}

function ReadinessRow({
  classSummary,
  session,
  term,
}: {
  classSummary: ClassReadiness;
  session: string;
  term: string;
}) {
  const progressionUrl = `${STUDENT_PROGRESSION}?${new URLSearchParams({
    classId: classSummary.class_id,
    session,
    term,
  }).toString()}`;

  return (
    <tr className="border-t">
      <td className="p-4 font-semibold">{getClassLabel(classSummary)}</td>
      <td className="p-4 text-center">{classSummary.total_students}</td>
      <td className="p-4 text-center">
        <CompletionCount
          completed={classSummary.registered_students}
          total={classSummary.total_students}
        />
      </td>
      <td className="p-4 text-center">
        <CompletionCount
          completed={classSummary.students_with_results}
          total={classSummary.total_students}
        />
      </td>
      <td className="p-4 text-center">
        <CompletionCount
          completed={classSummary.progressed_students}
          total={classSummary.total_students}
        />
      </td>
      <td className="p-4">
        {classSummary.total_students === 0 ? (
          <span className="text-gray-800">No students</span>
        ) : classSummary.complete ? (
          <span className="font-semibold text-secondary-green-600">Complete</span>
        ) : classSummary.ready_for_progression ? (
          <Link
            href={progressionUrl}
            className="font-semibold text-primary-purple-700 hover:underline"
          >
            Process progression
          </Link>
        ) : (
          <div className="flex flex-col gap-1 text-sm">
            {classSummary.registered_students < classSummary.total_students && (
              <Link href={SUBJECT_REGISTRATION} className="text-primary-purple-700">
                Complete registration
              </Link>
            )}
            {classSummary.students_with_results < classSummary.total_students && (
              <Link href={DASHBOARD_RESULT} className="text-primary-purple-700">
                Complete results
              </Link>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

function ClosedPeriodHistory({
  history,
}: {
  history: Array<{ session: string; term: string; closed_at: string }>;
}) {
  if (history.length === 0) return null;
  const sortedHistory = [...history].sort(
    (first, second) =>
      new Date(second.closed_at).getTime() - new Date(first.closed_at).getTime()
  );

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold">Previously closed periods</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedHistory.map(period => (
          <div
            key={`${period.session}-${period.term}`}
            className="rounded-lg border p-4"
          >
            <p className="font-semibold">
              {period.session} — {period.term}
            </p>
            <p className="mt-1 text-xs text-gray-800">
              Closed {new Date(period.closed_at).toLocaleDateString("en-NG")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TermClosing() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const { data: organization, isLoading: isLoadingOrganization } =
    useOrganization();
  const settings = organization?.academic_settings;
  const session = settings?.current_session ?? "";
  const term = settings?.current_term ?? "";

  const readinessQuery = useQuery({
    queryKey: ["termClosingReadiness", session, term],
    queryFn: () =>
      axiosInstance
        .get("/students/term-closing", { params: { session, term } })
        .then(response => response.data as TermClosingSummary),
    enabled: Boolean(session && term),
  });

  const closeTermMutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/students/term-closing", { session, term })
        .then(
          response =>
            response.data as {
              current_period: { session: string; term: string };
            }
        ),
    onSuccess: response => {
      api.success({
        message: "Academic term closed",
        description: `The current period is now ${response.current_period.session}, ${response.current_period.term}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["organizationSettings"] });
      queryClient.invalidateQueries({ queryKey: ["termClosingReadiness"] });
      queryClient.invalidateQueries({ queryKey: ["studentProgression"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "The term could not be closed",
        description: error.response?.data ?? error.message,
      });
    },
  });

  const handleCloseTerm = () => {
    const summary = readinessQuery.data;
    if (!summary?.ready_to_close) return;

    const confirmed = window.confirm(
      `Close ${session}, ${term} and make ${summary.next_period.session}, ${summary.next_period.term} the current period?`
    );
    if (confirmed) closeTermMutation.mutate();
  };

  if (isLoadingOrganization) {
    return (
      <Container headerTitle="Term Closing">
        <div className="flex min-h-[400px] items-center justify-center bg-white">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (!session || !term) {
    return (
      <Container headerTitle="Term Closing">
        <div className="bg-white p-10">
          <h2 className="text-xl font-semibold">Academic settings are required</h2>
          <p className="mt-2 text-gray-800">
            Save the school&apos;s current session and term before closing a period.
          </p>
          <Link
            href={ACCOUNT_SETTING_GENERALSETTING}
            className="mt-5 inline-block rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white"
          >
            Open General Settings
          </Link>
        </div>
      </Container>
    );
  }

  const summary = readinessQuery.data;
  const totalStudents =
    summary?.classes.reduce((total, item) => total + item.total_students, 0) ?? 0;
  const progressedStudents =
    summary?.classes.reduce(
      (total, item) => total + item.progressed_students,
      0
    ) ?? 0;

  return (
    <Container headerTitle="Term Closing">
      <main className="bg-white p-10">
        {contextHolder}
        <section className="flex flex-wrap items-center justify-between gap-5 rounded-lg bg-neutral-300 p-6">
          <div>
            <p className="text-sm text-gray-800">Current academic period</p>
            <h2 className="text-2xl font-bold">
              {session} — {term}
            </h2>
          </div>
          {summary?.next_period && (
            <div className="flex items-center gap-3">
              <Icon icon="material-symbols:arrow-forward-rounded" fontSize={28} />
              <div>
                <p className="text-sm text-gray-800">Next period</p>
                <p className="font-semibold">
                  {summary.next_period.session} — {summary.next_period.term}
                </p>
              </div>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-800">Progression completed</p>
            <p className="text-xl font-bold">
              {progressedStudents}/{totalStudents}
            </p>
          </div>
        </section>

        <div className="mt-6 rounded-lg border border-primary-purple-200 bg-primary-purple-100 p-4 text-sm">
          A term can close only after every student has subject registration,
          results, and a completed progression decision. Empty classes do not
          block closure.
        </div>

        {readinessQuery.isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Spinner />
          </div>
        ) : readinessQuery.isError ? (
          <div className="py-16 text-center text-secondary-red-600">
            Term readiness could not be loaded. Refresh and try again.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-grey-50 text-xs uppercase text-gray-800">
                <tr>
                  <th className="p-4">Class</th>
                  <th className="p-4 text-center">Students</th>
                  <th className="p-4 text-center">Registered</th>
                  <th className="p-4 text-center">Results</th>
                  <th className="p-4 text-center">Progressed</th>
                  <th className="p-4">Next action</th>
                </tr>
              </thead>
              <tbody>
                {(summary?.classes ?? []).map(classSummary => (
                  <ReadinessRow
                    key={classSummary.class_id}
                    classSummary={classSummary}
                    session={session}
                    term={term}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-5 rounded-lg border p-5">
          <div>
            <h3 className="font-semibold">Final confirmation</h3>
            <p className="text-sm text-gray-800">
              Closing is recorded permanently and advances the school&apos;s current
              academic period.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseTerm}
            disabled={!summary?.ready_to_close || closeTermMutation.isPending}
            className="rounded-lg bg-primary-purple-700 px-8 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {closeTermMutation.isPending ? "Closing term..." : "Close term"}
          </button>
        </div>
        <ClosedPeriodHistory
          history={organization?.academic_period_history ?? []}
        />
      </main>
    </Container>
  );
}
