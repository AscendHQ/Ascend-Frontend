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
  if (timetableQuery.isLoading) return <div className="flex justify-center py-10"><Spinner /></div>;
  if (!timetableQuery.data) {
    return <section className="rounded-2xl border bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Class timetable</h2><p className="mt-3 text-sm text-gray-800">The school has not published a timetable for the current period yet.</p></section>;
  }
  const timetable = timetableQuery.data;
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Class timetable</h2>
      <p className="text-sm text-gray-800">{timetable.session}, {timetable.term}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        {DAYS.map(day => {
          const entries = timetable.entries.filter(entry => entry.day === day).sort((first, second) => first.start_time.localeCompare(second.start_time));
          return <div key={day} className="rounded-xl border"><h3 className="bg-grey-50 p-3 font-bold">{day}</h3><div className="space-y-2 p-3">{entries.length === 0 ? <p className="text-xs text-gray-800">No entries</p> : entries.map(entry => <div key={entry._id ?? `${entry.start_time}-${entry.subject}`} className="rounded-lg bg-neutral-300 p-3 text-sm"><p className="font-semibold">{entry.subject}</p><p className="text-xs text-gray-800">{entry.start_time}–{entry.end_time}</p>{entry.teacher && <p className="text-xs text-gray-800">{entry.teacher}</p>}</div>)}</div></div>;
        })}
      </div>
    </section>
  );
}
