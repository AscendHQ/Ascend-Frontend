import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { useOrganization } from "@/templates/Settings/hooks";
import { PortalTimetableRecord, TimetableEntry } from "@/types/portal";

import { useFetchClassInfo } from "../database/classes";

type EditableEntry = TimetableEntry & { localId: string };

const DAYS: TimetableEntry["day"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const TERMS = ["1st Term", "2nd Term", "3rd Term"];

const makeEntry = (): EditableEntry => ({
  localId: `${Date.now()}-${Math.random()}`,
  day: "Monday",
  start_time: "08:00",
  end_time: "08:40",
  subject: "",
  teacher: "",
  room: "",
  type: "lesson",
});

const getClassLabel = (classInfo: classInfoProp) => {
  const section =
    classInfo.level === "junior"
      ? classInfo.other_section
      : classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

const toPayloadEntry = (entry: EditableEntry): TimetableEntry => ({
  day: entry.day,
  start_time: entry.start_time,
  end_time: entry.end_time,
  subject: entry.subject,
  teacher: entry.teacher,
  room: entry.room,
  type: entry.type,
});

export default function Timetable() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const classQuery = useFetchClassInfo();
  const { data: organization, isLoading: isLoadingOrganization } =
    useOrganization();
  const classes = React.useMemo<classInfoProp[]>(
    () => classQuery.data?.classes ?? [],
    [classQuery.data]
  );
  const [classId, setClassId] = React.useState("");
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("1st Term");
  const [entries, setEntries] = React.useState<EditableEntry[]>([makeEntry()]);

  React.useEffect(() => {
    if (!classId && classes[0]) setClassId(classes[0]._id);
  }, [classId, classes]);

  React.useEffect(() => {
    const settings = organization?.academic_settings;
    if (!session && settings?.current_session) {
      setSession(settings.current_session);
    }
    if (settings?.current_term) setTerm(settings.current_term);
  }, [organization, session]);

  const timetableQuery = useQuery({
    queryKey: ["adminTimetable", classId, session, term],
    queryFn: () =>
      axiosInstance
        .get("/timetables", {
          params: { class_id: classId, session, term },
        })
        .then(response => response.data as PortalTimetableRecord[]),
    enabled: Boolean(classId && session && term),
  });

  React.useEffect(() => {
    if (!timetableQuery.isSuccess) return;
    const savedEntries = timetableQuery.data[0]?.entries;
    setEntries(
      savedEntries?.length
        ? savedEntries.map(entry => ({
            ...entry,
            localId: entry._id ?? `${Date.now()}-${Math.random()}`,
          }))
        : [makeEntry()]
    );
  }, [timetableQuery.data, timetableQuery.isSuccess]);

  const saveMutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/timetables", {
          class_id: classId,
          session,
          term,
          entries: entries.map(toPayloadEntry),
        })
        .then(response => response.data as PortalTimetableRecord),
    onSuccess: () => {
      api.success({ message: "Timetable published" });
      queryClient.invalidateQueries({ queryKey: ["adminTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["portalTimetable"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Timetable could not be saved",
        description: error.response?.data ?? error.message,
      });
    },
  });

  const updateEntry = (localId: string, update: Partial<EditableEntry>) => {
    setEntries(current =>
      current.map(entry =>
        entry.localId === localId ? { ...entry, ...update } : entry
      )
    );
  };

  const removeEntry = (localId: string) => {
    setEntries(current => current.filter(entry => entry.localId !== localId));
  };

  const hasInvalidEntry = entries.some(
    entry =>
      !entry.subject.trim() ||
      !entry.start_time ||
      !entry.end_time ||
      entry.start_time >= entry.end_time
  );

  if (classQuery.isLoading || isLoadingOrganization) {
    return (
      <Container headerTitle="Timetable">
        <div className="flex min-h-[400px] items-center justify-center bg-white">
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <Container headerTitle="Timetable">
      <main className="min-h-full bg-neutral-300 p-6 lg:p-10">
        {contextHolder}
        <div>
          <h1 className="text-2xl font-bold">Class timetable</h1>
          <p className="mt-1 text-sm text-gray-800">
            Create the timetable parents and students will see for the selected
            academic period.
          </p>
        </div>

        <section className="mt-6 rounded-xl border bg-white p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm font-semibold">
              Class
              <select
                value={classId}
                onChange={event => setClassId(event.target.value)}
                className="mt-1 w-full rounded border bg-white p-2 font-normal"
              >
                {classes.map(classInfo => (
                  <option value={classInfo._id} key={classInfo._id}>
                    {getClassLabel(classInfo)}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Session
              <input
                value={session}
                onChange={event => setSession(event.target.value)}
                placeholder="2026/2027"
                className="mt-1 w-full rounded border p-2 font-normal"
              />
            </label>
            <label className="text-sm font-semibold">
              Term
              <select
                value={term}
                onChange={event => setTerm(event.target.value)}
                className="mt-1 w-full rounded border bg-white p-2 font-normal"
              >
                {TERMS.map(termOption => (
                  <option key={termOption}>{termOption}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="mt-5 rounded-xl border bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Periods</h2>
              <p className="text-sm text-gray-800">
                Add lessons, breaks, assemblies, and activities in display
                order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEntries(current => [...current, makeEntry()])}
              className="flex items-center gap-2 rounded-lg border border-primary-purple-700 px-4 py-2 font-semibold text-primary-purple-700"
            >
              <Icon icon="material-symbols:add-rounded" /> Add period
            </button>
          </div>

          {timetableQuery.isFetching ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {entries.map((entry, index) => (
                <div
                  key={entry.localId}
                  className="grid items-end gap-3 rounded-lg border bg-grey-50 p-4 md:grid-cols-2 xl:grid-cols-[130px_110px_110px_1fr_1fr_100px_130px_40px]"
                >
                  <label className="text-xs font-semibold">
                    Day
                    <select
                      value={entry.day}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          day: event.target.value as TimetableEntry["day"],
                        })
                      }
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    >
                      {DAYS.map(day => (
                        <option key={day}>{day}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-semibold">
                    Starts
                    <input
                      type="time"
                      value={entry.start_time}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          start_time: event.target.value,
                        })
                      }
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    />
                  </label>
                  <label className="text-xs font-semibold">
                    Ends
                    <input
                      type="time"
                      value={entry.end_time}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          end_time: event.target.value,
                        })
                      }
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    />
                  </label>
                  <label className="text-xs font-semibold">
                    Subject / title
                    <input
                      value={entry.subject}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          subject: event.target.value,
                        })
                      }
                      placeholder="Mathematics"
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    />
                  </label>
                  <label className="text-xs font-semibold">
                    Teacher (optional)
                    <input
                      value={entry.teacher ?? ""}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          teacher: event.target.value,
                        })
                      }
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    />
                  </label>
                  <label className="text-xs font-semibold">
                    Room
                    <input
                      value={entry.room ?? ""}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          room: event.target.value,
                        })
                      }
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    />
                  </label>
                  <label className="text-xs font-semibold">
                    Type
                    <select
                      value={entry.type}
                      onChange={event =>
                        updateEntry(entry.localId, {
                          type: event.target.value as TimetableEntry["type"],
                        })
                      }
                      className="mt-1 w-full rounded border bg-white p-2 font-normal"
                    >
                      <option value="lesson">Lesson</option>
                      <option value="break">Break</option>
                      <option value="assembly">Assembly</option>
                      <option value="activity">Activity</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    aria-label={`Remove period ${index + 1}`}
                    onClick={() => removeEntry(entry.localId)}
                    className="flex h-10 items-center justify-center rounded text-secondary-red-600"
                  >
                    <Icon
                      icon="material-symbols:delete-outline-rounded"
                      className="text-xl"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={
                !classId ||
                !/^\d{4}\/\d{4}$/.test(session) ||
                entries.length === 0 ||
                hasInvalidEntry ||
                saveMutation.isPending
              }
              onClick={() => saveMutation.mutate()}
              className="rounded-lg bg-primary-purple-700 px-7 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saveMutation.isPending ? "Publishing..." : "Publish timetable"}
            </button>
          </div>
        </section>
      </main>
    </Container>
  );
}
