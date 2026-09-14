import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";
import { PortalTimetableRecord } from "@/types/portal";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function StudentTimetable({ studentId }: { studentId: string }) {
  const timetableQuery = useQuery({
    queryKey: ["portalTimetable", studentId],
    queryFn: () =>
      axiosInstance
        .get(`/timetables/portal/${studentId}`)
        .then(response => response.data as PortalTimetableRecord | null),
    enabled: Boolean(studentId),
  });
  if (timetableQuery.isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  if (!timetableQuery.data) {
    return (
      <section className="rounded-lg border border-dashed border-border-colour-light bg-white p-8 text-center">
        <h2 className="font-semibold">No timetable published</h2>
        <p className="mt-2 text-sm text-Text-meduim-emphasis">
          The school has not published a timetable for the current period yet.
        </p>
      </section>
    );
  }
  const timetable = timetableQuery.data;
  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
      <h2 className="font-semibold">Class timetable</h2>
      <p className="mt-1 text-sm text-Text-meduim-emphasis">
        {timetable.session}, {timetable.term}
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        {DAYS.map(day => {
          const entries = timetable.entries
            .filter(entry => entry.day === day)
            .sort((first, second) =>
              first.start_time.localeCompare(second.start_time)
            );
          return (
            <div
              key={day}
              className="overflow-hidden rounded-lg border border-border-colour-light"
            >
              <h3 className="border-b border-border-colour-light bg-neutral-300 p-3 text-sm font-semibold">
                {day}
              </h3>
              <div className="space-y-2 p-3">
                {entries.length === 0 ? (
                  <p className="py-3 text-center text-xs text-Text-meduim-emphasis">
                    No entries
                  </p>
                ) : (
                  entries.map(entry => (
                    <div
                      key={entry._id ?? `${entry.start_time}-${entry.subject}`}
                      className="rounded-lg border-l-2 border-primary-purple-500 bg-neutral-100 p-3 text-sm"
                    >
                      <p className="font-medium">{entry.subject}</p>
                      <p className="mt-1 text-xs text-Text-meduim-emphasis">
                        {entry.start_time}–{entry.end_time}
                      </p>
                      {entry.teacher && (
                        <p className="text-xs text-Text-meduim-emphasis">
                          {entry.teacher}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
