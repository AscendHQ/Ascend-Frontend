export type PortalNotice = {
  _id: string;
  title: string;
  message: string;
  type: "announcement" | "event";
  audience: "all" | "parents" | "students";
  classes: Array<{ _id: string; name: string; section?: string; other_section?: string }>;
  starts_at: string;
  ends_at?: string;
  is_published: boolean;
};

export type TimetableEntry = {
  _id?: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  start_time: string;
  end_time: string;
  subject: string;
  teacher?: string;
  room?: string;
  type: "lesson" | "break" | "assembly" | "activity";
};

export type PortalTimetableRecord = {
  _id: string;
  class: { _id: string; name: string; section?: string; other_section?: string } | string;
  session: string;
  term: string;
  entries: TimetableEntry[];
};
