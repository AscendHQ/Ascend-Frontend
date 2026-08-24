import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { PLATFORM_SCHOOLS } from "@/config/links";
import type { PlatformMetrics } from "@/types/platform-metrics";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Never";

const currency = (value: number) =>
  value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

const getPasswordError = (password: string, confirmation: string) => {
  if (!passwordPattern.test(password)) {
    return "Use at least 8 characters with uppercase, lowercase, number, and symbol.";
  }
  return password === confirmation ? undefined : "The passwords do not match";
};

const getStatusCopy = (isActive: boolean) =>
  isActive
    ? {
        badge: "Active",
        badgeClass: "bg-secondary-green-100 text-secondary-green-600",
        action: "Suspend school",
        actionClass: "bg-secondary-red-600",
        title: "Confirm school suspension",
        description:
          "All school accounts will be blocked immediately, including existing sessions.",
        confirmation: "Confirm suspension",
      }
    : {
        badge: "Suspended",
        badgeClass: "bg-warning-light text-warning-dark",
        action: "Reactivate school",
        actionClass: "bg-secondary-green-600",
        title: "Confirm reactivation",
        description:
          "School users will be able to sign in and continue working again.",
        confirmation: "Confirm reactivation",
      };

const getStatusFeedback = (isActive: boolean) =>
  isActive
    ? { message: "School reactivated", description: "Users can sign in again." }
    : {
        message: "School suspended",
        description: "Existing sessions have been blocked immediately.",
      };

const getCollectionRate = (billed: number, collected: number) =>
  billed ? Math.round((collected / billed) * 100) : 0;

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-colour-light bg-white p-4">
      <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function SchoolLoadState({ loading }: { loading: boolean }) {
  return (
    <Container headerTitle="School Management">
      <main className="m-6 rounded-xl bg-white p-10 text-center">
        <h1 className="text-xl font-bold">
          {loading ? "Loading school..." : "School could not be loaded"}
        </h1>
        {!loading && (
          <Link href={PLATFORM_SCHOOLS} className="mt-4 inline-block font-semibold text-primary-purple-700">
            Return to schools
          </Link>
        )}
      </main>
    </Container>
  );
}

export default function SchoolManagementPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const schoolId = String(router.query.schoolId ?? "");
  const [showStatusAction, setShowStatusAction] = React.useState(false);
  const [suspensionReason, setSuspensionReason] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const metricsQuery = useQuery({
    queryKey: ["platformMetrics"],
    queryFn: () =>
      axiosInstance
        .get("/organizations/metrics")
        .then(response => response.data as PlatformMetrics),
    enabled: router.isReady,
  });
  const school = metricsQuery.data?.schools.find(item => item.id === schoolId);

  const refreshMetrics = () =>
    queryClient.invalidateQueries({ queryKey: ["platformMetrics"] });
  const showRequestError = (
    error: Error & { response?: { data?: string } },
  ) =>
    api.error({
      message: "Request failed",
      description: error.response?.data ?? error.message,
    });

  const statusMutation = useMutation({
    mutationFn: ({ isActive, reason }: { isActive: boolean; reason?: string }) =>
      axiosInstance.patch(`/organizations/${schoolId}/status`, {
        is_active: isActive,
        reason,
      }),
    onSuccess: (_response, values) => {
      api.success(getStatusFeedback(values.isActive));
      setShowStatusAction(false);
      setSuspensionReason("");
      void refreshMetrics();
    },
    onError: showRequestError,
  });

  const passwordMutation = useMutation({
    mutationFn: () =>
      axiosInstance.put(`/organizations/${schoolId}/admin-password`, {
        password,
      }),
    onSuccess: () => {
      api.success({
        message: "Administrator password reset",
        description:
          "Previous administrator sessions have ended. Send the temporary password securely.",
      });
      setPassword("");
      setConfirmPassword("");
    },
    onError: showRequestError,
  });

  const resetPassword = () => {
    const passwordError = getPasswordError(password, confirmPassword);
    if (passwordError) {
      api.error({ message: "Password could not be reset", description: passwordError });
      return;
    }
    passwordMutation.mutate();
  };

  if (metricsQuery.isLoading || metricsQuery.isError || !school) {
    return <SchoolLoadState loading={metricsQuery.isLoading} />;
  }

  const collectionRate = getCollectionRate(school.billed, school.collected);
  const statusCopy = getStatusCopy(school.is_active);

  return (
    <Container headerTitle="School Management">
      <main className="min-h-full bg-neutral-300 p-6 lg:p-8">
        {contextHolder}
        <Link href={PLATFORM_SCHOOLS} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-purple-700">
          <Icon icon="material-symbols:arrow-back-rounded" /> Back to schools
        </Link>

        <section className="mt-5 rounded-xl border border-border-colour-light bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">{school.name}</h1>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusCopy.badgeClass}`}>
                  {statusCopy.badge}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Created {formatDate(school.created_at)} · Last active {formatDate(school.last_active)}
              </p>
            </div>
            <button
              onClick={() => setShowStatusAction(true)}
              className={`rounded-lg px-5 py-3 text-sm font-semibold text-white ${statusCopy.actionClass}`}
            >
              {statusCopy.action}
            </button>
          </div>
          {!school.is_active && (
            <div className="mt-5 rounded-lg bg-warning-light p-4 text-sm">
              <p className="font-semibold">Suspended {formatDate(school.suspended_at)}</p>
              <p className="mt-1">{school.suspension_reason}</p>
            </div>
          )}
        </section>

        {showStatusAction && (
          <section className="mt-5 rounded-xl border border-warning-main bg-white p-6">
            <h2 className="text-lg font-bold">
              {statusCopy.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {statusCopy.description}
            </p>
            {school.is_active && (
              <textarea
                value={suspensionReason}
                onChange={event => setSuspensionReason(event.target.value)}
                maxLength={500}
                placeholder="Reason for suspension"
                className="mt-4 h-24 w-full rounded-lg border border-border-colour-light p-3"
              />
            )}
            <div className="mt-4 flex gap-3">
              <button onClick={() => setShowStatusAction(false)} className="rounded-lg border border-border-colour-light px-5 py-2 text-sm font-semibold">Cancel</button>
              <button
                disabled={statusMutation.isPending || (school.is_active && !suspensionReason.trim())}
                onClick={() => statusMutation.mutate({ isActive: !school.is_active, reason: suspensionReason.trim() || undefined })}
                className="rounded-lg bg-primary-purple-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {statusMutation.isPending ? "Saving..." : statusCopy.confirmation}
              </button>
            </div>
          </section>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DetailCard label="Setup progress" value={`${school.setup_progress}%`} />
          <DetailCard label="Active students" value={school.active_students.toLocaleString()} />
          <DetailCard label="Staff" value={school.staff.toLocaleString()} />
          <DetailCard label="Collection rate" value={`${collectionRate}%`} />
          <DetailCard label="Attendance · 30 days" value={school.attendance_registers_30_days.toLocaleString()} />
          <DetailCard label="Result submissions · 30 days" value={school.result_submissions_30_days.toLocaleString()} />
          <DetailCard label="Amount billed" value={currency(school.billed)} />
          <DetailCard label="Amount collected" value={currency(school.collected)} />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <article className="rounded-xl border border-border-colour-light bg-white p-6">
            <h2 className="text-lg font-bold">School information</h2>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-gray-500">Administrator</dt><dd className="mt-1 font-semibold">{school.admin?.name || "Not assigned"}</dd></div>
              <div><dt className="text-gray-500">Login email</dt><dd className="mt-1 font-semibold">{school.admin?.email || "Not assigned"}</dd></div>
              <div><dt className="text-gray-500">Academic period</dt><dd className="mt-1 font-semibold">{school.current_session ? `${school.current_session}, ${school.current_term}` : "Not configured"}</dd></div>
              <div><dt className="text-gray-500">Portal accounts</dt><dd className="mt-1 font-semibold">{school.teacher_portals + school.parent_portals + school.student_portals}</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {school.attention_reasons.map(reason => <span key={reason} className="rounded-full bg-warning-light px-3 py-1 text-xs text-warning-dark">{reason}</span>)}
              {!school.attention_reasons.length && <span className="text-sm text-secondary-green-600">No attention flags</span>}
            </div>
          </article>

          <article className="rounded-xl border border-border-colour-light bg-white p-6">
            <h2 className="text-lg font-bold">Reset administrator password</h2>
            <p className="mt-1 text-sm text-gray-500">
              This ends previous administrator sessions. Send the new temporary password securely.
            </p>
            <div className="mt-5 space-y-4">
              <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="New temporary password" className="w-full rounded-lg border border-border-colour-light p-3" />
              <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Confirm temporary password" className="w-full rounded-lg border border-border-colour-light p-3" />
              <p className="text-xs text-gray-500">8+ characters with uppercase, lowercase, number, and symbol.</p>
              <button disabled={passwordMutation.isPending || !password || !confirmPassword} onClick={resetPassword} className="rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {passwordMutation.isPending ? "Resetting..." : "Reset password"}
              </button>
            </div>
          </article>
        </section>
      </main>
    </Container>
  );
}
