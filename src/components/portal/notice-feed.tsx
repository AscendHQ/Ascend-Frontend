import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";
import { PortalNotice } from "@/types/portal";

export default function NoticeFeed() {
  const noticeQuery = useQuery({
    queryKey: ["portalNotices"],
    queryFn: () =>
      axiosInstance
        .get("/communications/portal")
        .then(response => response.data as PortalNotice[]),
  });
  if (noticeQuery.isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;
  if (!noticeQuery.data?.length) return null;
  return (
    <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Announcements and events</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {noticeQuery.data.slice(0, 8).map(notice => (
          <article key={notice._id} className="rounded-xl border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-purple-700">
              <Icon icon={notice.type === "event" ? "material-symbols:event-outline-rounded" : "material-symbols:campaign-outline-rounded"} />
              <span className="capitalize">{notice.type}</span>
            </div>
            <h3 className="mt-2 font-bold">{notice.title}</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-gray-800">{notice.message}</p>
            <p className="mt-3 text-xs text-gray-800">
              {new Date(notice.starts_at).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}
              {notice.ends_at ? ` — ${new Date(notice.ends_at).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}` : ""}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
