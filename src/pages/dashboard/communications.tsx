import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { PortalNotice } from "@/types/portal";

import { useFetchClassInfo } from "./database/classes";

const getClassLabel = (classInfo: classInfoProp) => {
  const section = classInfo.level === "junior" ? classInfo.other_section : classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

function NoticeForm({ classes, onClose }: { classes: classInfoProp[]; onClose: () => void }) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<"announcement" | "event">("announcement");
  const [audience, setAudience] = React.useState("all");
  const [startsAt, setStartsAt] = React.useState("");
  const [endsAt, setEndsAt] = React.useState("");
  const [classIds, setClassIds] = React.useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: () => axiosInstance.post("/communications", { title, message, type, audience, starts_at: startsAt, ends_at: endsAt || undefined, class_ids: classIds, is_published: true }).then(response => response.data),
    onSuccess: () => { api.success({ message: `${type === "event" ? "Event" : "Announcement"} published` }); queryClient.invalidateQueries({ queryKey: ["adminNotices"] }); queryClient.invalidateQueries({ queryKey: ["portalNotices"] }); onClose(); },
    onError: (error: Error & { response?: { data?: string } }) => api.error({ message: "Could not publish", description: error.response?.data ?? error.message }),
  });
  return (
    <section className="mt-6 rounded-xl border bg-white p-6">{contextHolder}<div className="flex justify-between"><div><h2 className="text-xl font-bold">New announcement or event</h2><p className="text-sm text-gray-800">Leave classes empty to publish school-wide.</p></div><button type="button" onClick={onClose}><Icon icon="carbon:close-outline" className="text-2xl" /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold">Title<input value={title} onChange={event => setTitle(event.target.value)} className="mt-1 w-full rounded border p-2 font-normal" /></label><label className="text-sm font-semibold">Type<select value={type} onChange={event => setType(event.target.value as "announcement" | "event")} className="mt-1 w-full rounded border bg-white p-2 font-normal"><option value="announcement">Announcement</option><option value="event">Calendar event</option></select></label><label className="text-sm font-semibold">Audience<select value={audience} onChange={event => setAudience(event.target.value)} className="mt-1 w-full rounded border bg-white p-2 font-normal"><option value="all">Parents and students</option><option value="parents">Parents only</option><option value="students">Students only</option></select></label><label className="text-sm font-semibold">Starts<input type="datetime-local" value={startsAt} onChange={event => setStartsAt(event.target.value)} className="mt-1 w-full rounded border p-2 font-normal" /></label>{type === "event" && <label className="text-sm font-semibold">Ends (optional)<input type="datetime-local" value={endsAt} onChange={event => setEndsAt(event.target.value)} className="mt-1 w-full rounded border p-2 font-normal" /></label>}<label className="text-sm font-semibold">Classes (optional)<select multiple value={classIds} onChange={event => setClassIds(Array.from(event.target.selectedOptions, option => option.value))} className="mt-1 h-32 w-full rounded border bg-white p-2 font-normal">{classes.map(classInfo => <option key={classInfo._id} value={classInfo._id}>{getClassLabel(classInfo)}</option>)}</select></label><label className="text-sm font-semibold md:col-span-2">Message<textarea value={message} maxLength={3000} onChange={event => setMessage(event.target.value)} className="mt-1 min-h-[120px] w-full rounded border p-2 font-normal" /></label></div><div className="mt-5 flex justify-end"><button type="button" disabled={!title || !message || !startsAt || mutation.isPending} onClick={() => mutation.mutate()} className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50">{mutation.isPending ? "Publishing..." : "Publish"}</button></div></section>
  );
}

export default function Communications() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);
  const classQuery = useFetchClassInfo();
  const noticeQuery = useQuery({ queryKey: ["adminNotices"], queryFn: () => axiosInstance.get("/communications").then(response => response.data as PortalNotice[]) });
  const deleteMutation = useMutation({
    mutationFn: (noticeId: string) => axiosInstance.delete(`/communications/${noticeId}`),
    onSuccess: () => { api.success({ message: "Notice deleted" }); queryClient.invalidateQueries({ queryKey: ["adminNotices"] }); queryClient.invalidateQueries({ queryKey: ["portalNotices"] }); },
    onError: () => api.error({ message: "Notice could not be deleted" }),
  });
  const classes: classInfoProp[] = classQuery.data?.classes ?? [];
  return (
    <Container headerTitle="Announcements"><main className="min-h-full bg-neutral-300 p-6 lg:p-10">{contextHolder}<div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-bold">Announcements and calendar</h1><p className="text-sm text-gray-800">Publish school-wide or class-specific information.</p></div><button type="button" onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"><Icon icon="material-symbols:add-rounded" /> New notice</button></div>{showForm && <NoticeForm classes={classes} onClose={() => setShowForm(false)} />}<section className="mt-6 rounded-xl border bg-white p-6"><h2 className="text-lg font-bold">Published notices</h2>{noticeQuery.isLoading || classQuery.isLoading ? <div className="flex justify-center py-16"><Spinner /></div> : !noticeQuery.data?.length ? <p className="py-12 text-center text-gray-800">No announcements or events yet.</p> : <div className="mt-4 grid gap-4 lg:grid-cols-2">{noticeQuery.data.map(notice => <article key={notice._id} className="rounded-xl border p-4"><div className="flex justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-primary-purple-700">{notice.type} · {notice.audience}</p><h3 className="mt-1 font-bold">{notice.title}</h3></div><button type="button" aria-label="Delete notice" onClick={() => { if (window.confirm("Delete this notice?")) deleteMutation.mutate(notice._id); }}><Icon icon="material-symbols:delete-outline-rounded" className="text-xl text-secondary-red-600" /></button></div><p className="mt-2 whitespace-pre-line text-sm text-gray-800">{notice.message}</p><p className="mt-3 text-xs text-gray-800">{new Date(notice.starts_at).toLocaleString("en-NG")}</p></article>)}</div>}</section></main></Container>
  );
}
