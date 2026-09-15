import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { PortalNotice } from "@/types/portal";

import { useFetchClassInfo } from "./database/classes";

const controlClassName =
  "mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500 focus:ring-2 focus:ring-primary-purple-100";

const getClassLabel = (classInfo: classInfoProp) => {
  const section =
    classInfo.level === "junior" ? classInfo.other_section : classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

function NoticeForm({
  classes,
  onClose,
}: {
  classes: classInfoProp[];
  onClose: () => void;
}) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<"announcement" | "event">(
    "announcement"
  );
  const [audience, setAudience] = React.useState("all");
  const [startsAt, setStartsAt] = React.useState("");
  const [endsAt, setEndsAt] = React.useState("");
  const [classIds, setClassIds] = React.useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/communications", {
          title,
          message,
          type,
          audience,
          starts_at: startsAt,
          ends_at: endsAt || undefined,
          class_ids: classIds,
          is_published: true,
        })
        .then(response => response.data),
    onSuccess: () => {
      api.success({
        message: `${type === "event" ? "Event" : "Announcement"} published`,
      });
      queryClient.invalidateQueries({ queryKey: ["adminNotices"] });
      queryClient.invalidateQueries({ queryKey: ["portalNotices"] });
      onClose();
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Could not publish",
        description: error.response?.data ?? error.message,
      }),
  });
  return (
    <section className="mt-6 rounded-lg border-1.5 border-border-colour-light bg-white">
      {contextHolder}
      <div className="flex justify-between gap-4 border-b border-border-colour-light px-4 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold">New announcement or event</h2>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Leave classes empty to publish school-wide.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="self-start rounded-lg p-2 text-gray-600 hover:bg-neutral-300"
          aria-label="Close notice form"
        >
          <Icon icon="carbon:close-outline" className="text-2xl" />
        </button>
      </div>
      <div className="grid gap-4 px-4 py-5 sm:px-6 md:grid-cols-2">
        <label className="text-sm font-medium">
          Title
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            className={controlClassName}
          />
        </label>
        <label className="text-sm font-medium">
          Type
          <select
            value={type}
            onChange={event =>
              setType(event.target.value as "announcement" | "event")
            }
            className={controlClassName}
          >
            <option value="announcement">Announcement</option>
            <option value="event">Calendar event</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Audience
          <select
            value={audience}
            onChange={event => setAudience(event.target.value)}
            className={controlClassName}
          >
            <option value="all">Parents and students</option>
            <option value="parents">Parents only</option>
            <option value="students">Students only</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Starts
          <input
            type="datetime-local"
            value={startsAt}
            onChange={event => setStartsAt(event.target.value)}
            className={controlClassName}
          />
        </label>
        {type === "event" && (
          <label className="text-sm font-medium">
            Ends (optional)
            <input
              type="datetime-local"
              value={endsAt}
              onChange={event => setEndsAt(event.target.value)}
              className={controlClassName}
            />
          </label>
        )}
        <label className="text-sm font-medium">
          Classes (optional)
          <select
            multiple
            value={classIds}
            onChange={event =>
              setClassIds(
                Array.from(event.target.selectedOptions, option => option.value)
              )
            }
            className={`${controlClassName} h-32`}
          >
            {classes.map(classInfo => (
              <option key={classInfo._id} value={classInfo._id}>
                {getClassLabel(classInfo)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Message
          <textarea
            value={message}
            maxLength={3000}
            onChange={event => setMessage(event.target.value)}
            className={`${controlClassName} min-h-[120px] resize-y`}
          />
        </label>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-border-colour-light px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border-1.5 border-border-colour-light px-6 py-3 text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!title || !message || !startsAt || mutation.isPending}
          onClick={() => mutation.mutate()}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-purple-800 disabled:opacity-50"
        >
          {mutation.isPending ? "Publishing..." : "Publish"}
        </button>
      </div>
    </section>
  );
}

export default function Communications() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);
  const classQuery = useFetchClassInfo();
  const noticeQuery = useQuery({
    queryKey: ["adminNotices"],
    queryFn: () =>
      axiosInstance
        .get("/communications")
        .then(response => response.data as PortalNotice[]),
  });
  const deleteMutation = useMutation({
    mutationFn: (noticeId: string) =>
      axiosInstance.delete(`/communications/${noticeId}`),
    onSuccess: () => {
      api.success({ message: "Notice deleted" });
      queryClient.invalidateQueries({ queryKey: ["adminNotices"] });
      queryClient.invalidateQueries({ queryKey: ["portalNotices"] });
    },
    onError: () => api.error({ message: "Notice could not be deleted" }),
  });
  const classes: classInfoProp[] = classQuery.data?.classes ?? [];
  return (
    <Container headerTitle="Announcements">
      <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10">
        {contextHolder}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">
              Announcements and calendar
            </h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Publish school-wide or class-specific information.
            </p>
          </div>
          <DashboardButton
            variant="primary"
            onClick={() => setShowForm(true)}
            leftElement={<Icon icon="tabler:plus" />}
            className="m-0"
          >
            New notice
          </DashboardButton>
        </div>
        {showForm && (
          <NoticeForm classes={classes} onClose={() => setShowForm(false)} />
        )}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Published notices</h2>
          {noticeQuery.isLoading || classQuery.isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !noticeQuery.data?.length ? (
            <p className="mt-5 rounded-lg border border-dashed border-border-colour-light py-12 text-center text-Text-meduim-emphasis">
              No announcements or events yet.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {noticeQuery.data.map(notice => (
                <article
                  key={notice._id}
                  className="rounded-lg border border-border-colour-light p-5"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-primary-purple-700">
                        {notice.type} · {notice.audience}
                      </p>
                      <h3 className="mt-1 font-semibold">{notice.title}</h3>
                    </div>
                    <button
                      type="button"
                      aria-label="Delete notice"
                      onClick={() => {
                        if (window.confirm("Delete this notice?"))
                          deleteMutation.mutate(notice._id);
                      }}
                    >
                      <Icon
                        icon="material-symbols:delete-outline-rounded"
                        className="text-xl text-secondary-red-600"
                      />
                    </button>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm text-gray-600">
                    {notice.message}
                  </p>
                  <p className="mt-3 text-xs text-Text-meduim-emphasis">
                    {new Date(notice.starts_at).toLocaleString("en-NG")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </Container>
  );
}
