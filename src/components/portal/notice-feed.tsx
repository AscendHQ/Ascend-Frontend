import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import PortalErrorState from "@/components/portal/portal-error-state";
import { Spinner } from "@/components/ui/Loading";
import { PortalNotice } from "@/types/portal";

export default function NoticeFeed({
  showEmptyState = false,
}: {
  showEmptyState?: boolean;
}) {
  const noticeQuery = useQuery({
    queryKey: ["portalNotices"],
    queryFn: () =>
      axiosInstance
        .get("/communications/portal")
        .then(response => response.data as PortalNotice[]),
  });
  if (noticeQuery.isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  if (noticeQuery.isError) {
    return showEmptyState ? (
      <PortalErrorState
        message="Announcements could not be loaded."
        onRetry={() => void noticeQuery.refetch()}
      />
    ) : null;
  }
  if (!noticeQuery.data?.length) {
    return showEmptyState ? (
      <section className="rounded-lg border border-dashed border-border-colour-light bg-white p-8 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary-purple-100 text-primary-purple-700">
          <Icon
            icon="material-symbols:campaign-outline-rounded"
            className="text-xl"
          />
        </span>
        <h2 className="mt-4 font-semibold">No announcements yet</h2>
        <p className="mt-2 text-sm text-Text-meduim-emphasis">
          There are no announcements or events for you yet.
        </p>
      </section>
    ) : null;
  }
  return (
    <section className="mb-6 rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-purple-100 text-primary-purple-700">
          <Icon
            icon="material-symbols:campaign-outline-rounded"
            className="text-xl"
          />
        </span>
        <div>
          <h2 className="font-semibold">Announcements and events</h2>
          <p className="text-xs text-Text-meduim-emphasis">
            Latest updates from your school
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {noticeQuery.data.slice(0, 8).map(notice => (
          <article
            key={notice._id}
            className="rounded-lg border border-border-colour-light p-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-purple-700">
              <Icon
                icon={
                  notice.type === "event"
                    ? "material-symbols:event-outline-rounded"
                    : "material-symbols:campaign-outline-rounded"
                }
              />
              <span className="capitalize">{notice.type}</span>
            </div>
            <h3 className="mt-2 font-semibold">{notice.title}</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
              {notice.message}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-Text-meduim-emphasis">
              <Icon icon="material-symbols:schedule-outline-rounded" />
              {new Date(notice.starts_at).toLocaleString("en-NG", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              {notice.ends_at
                ? ` — ${new Date(notice.ends_at).toLocaleString("en-NG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}`
                : ""}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
