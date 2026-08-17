import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";
import { useOrganization } from "@/templates/Settings/hooks";

import { useFetchClassInfo } from "./database/classes";

type AttendanceStatus = "present" | "absent" | "late" | "excused";

type AttendanceStudent = {
  _id: string;
  registration_number: string;
  personal_information: {
    first_name: string;
    middle_name?: string;
    last_name: string;
  };
  status?: AttendanceStatus;
  remark: string;
};

type AttendanceRegister = {
  is_recorded: boolean;
  students: AttendanceStudent[];
};

type AttendanceValue = { status: AttendanceStatus; remark: string };

const STATUS_OPTIONS: Array<{ value: AttendanceStatus; label: string }> = [
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "excused", label: "Excused" },
];

const getSessionOptions = (configuredSession?: string) => {
  const currentYear = new Date().getFullYear();
  const sessions = Array.from({ length: 7 }, (_, index) => {
    const year = currentYear + 1 - index;
    return `${year}/${year + 1}`;
  });
  return configuredSession && !sessions.includes(configuredSession)
    ? [configuredSession, ...sessions]
    : sessions;
};

const getToday = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
};

const getClassLabel = (classInfo: classInfoProp) => {
  const section =
    classInfo.level === "junior"
      ? classInfo.other_section
      : classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

const getStudentName = (student: AttendanceStudent) =>
  [
    student.personal_information.first_name,
    student.personal_information.middle_name,
    student.personal_information.last_name,
  ]
    .filter(Boolean)
    .join(" ");

function AttendanceSummary({ values }: { values: Record<string, AttendanceValue> }) {
  const counts = STATUS_OPTIONS.map(option => ({
    ...option,
    count: Object.values(values).filter(item => item.status === option.value)
      .length,
  }));

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {counts.map(item => (
        <div key={item.value} className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-800">{item.label}</p>
          <p className="text-2xl font-bold">{item.count}</p>
        </div>
      ))}
    </div>
  );
}

function AttendanceRegisterState({
  isLoading,
  isError,
  students,
  values,
  updateValue,
}: {
  isLoading: boolean;
  isError: boolean;
  students: AttendanceStudent[];
  values: Record<string, AttendanceValue>;
  updateValue: (studentId: string, update: Partial<AttendanceValue>) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <p className="py-16 text-center text-secondary-red-600">
        The attendance register could not be loaded.
      </p>
    );
  }
  if (students.length === 0) {
    return (
      <p className="py-16 text-center text-gray-800">
        No active students are assigned to this class.
      </p>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="bg-grey-50 text-xs uppercase text-gray-800">
          <tr>
            <th className="p-4">Student</th>
            <th className="p-4">Registration number</th>
            <th className="p-4">Status</th>
            <th className="p-4">Remark</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => {
            const studentName = getStudentName(student);
            return (
              <tr key={student._id} className="border-t">
                <td className="p-4 font-semibold">{studentName}</td>
                <td className="p-4">{student.registration_number}</td>
                <td className="p-4">
                  <select
                    aria-label={`Attendance status for ${studentName}`}
                    value={values[student._id]?.status ?? "present"}
                    onChange={event =>
                      updateValue(student._id, {
                        status: event.target.value as AttendanceStatus,
                      })
                    }
                    className="min-w-[130px] rounded border p-2 capitalize"
                  >
                    {STATUS_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <input
                    aria-label={`Attendance remark for ${studentName}`}
                    maxLength={250}
                    value={values[student._id]?.remark ?? ""}
                    onChange={event =>
                      updateValue(student._id, { remark: event.target.value })
                    }
                    placeholder="Optional remark"
                    className="w-full min-w-[220px] rounded border p-2"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Attendance() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const { data: organization } = useOrganization();
  const classQuery = useFetchClassInfo();
  const classes = React.useMemo<classInfoProp[]>(
    () => classQuery.data?.classes ?? [],
    [classQuery.data]
  );
  const settings = organization?.academic_settings;
  const sessionOptions = React.useMemo(
    () => getSessionOptions(settings?.current_session),
    [settings?.current_session]
  );
  const [classId, setClassId] = React.useState("");
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [date, setDate] = React.useState(getToday);
  const [values, setValues] = React.useState<Record<string, AttendanceValue>>({});

  React.useEffect(() => {
    if (!classId && classes[0]) setClassId(classes[0]._id);
  }, [classId, classes]);

  React.useEffect(() => {
    if (settings?.current_session && settings.current_term) {
      setSession(settings.current_session);
      setTerm(settings.current_term);
    }
  }, [settings]);

  const attendanceQuery = useQuery({
    queryKey: ["attendanceRegister", classId, session, term, date],
    queryFn: () =>
      axiosInstance
        .get("/attendance", {
          params: { class_id: classId, session, term, date },
        })
        .then(response => response.data as AttendanceRegister),
    enabled: Boolean(classId && session && term && date),
  });
  const students = React.useMemo(
    () => attendanceQuery.data?.students ?? [],
    [attendanceQuery.data]
  );

  React.useEffect(() => {
    const nextValues: Record<string, AttendanceValue> = {};
    for (const student of students) {
      nextValues[student._id] = {
        status: student.status ?? "present",
        remark: student.remark ?? "",
      };
    }
    setValues(nextValues);
  }, [students]);

  const updateValue = (studentId: string, update: Partial<AttendanceValue>) => {
    setValues(current => ({
      ...current,
      [studentId]: { ...current[studentId], ...update },
    }));
  };

  const markAllPresent = () => {
    setValues(current =>
      Object.fromEntries(
        Object.entries(current).map(([studentId, value]) => [
          studentId,
          { ...value, status: "present" },
        ])
      )
    );
  };

  const saveMutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/attendance", {
          class_id: classId,
          session,
          term,
          date,
          records: students.map(student => ({
            student: student._id,
            status: values[student._id]?.status,
            remark: values[student._id]?.remark ?? "",
          })),
        })
        .then(response => response.data),
    onSuccess: () => {
      api.success({
        message: "Attendance saved",
        description: `The register for ${date} has been saved successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["attendanceRegister"] });
      queryClient.invalidateQueries({ queryKey: ["studentAttendance"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Attendance could not be saved",
        description: error.response?.data ?? error.message,
      });
    },
  });

  const hasAcademicSettings = Boolean(session && term);

  return (
    <Container headerTitle="Attendance">
      <main className="bg-white p-10">
        {contextHolder}
        {!hasAcademicSettings ? (
          <div className="rounded-lg border border-warning-main bg-warning-main/10 p-5">
            Save the current session and term in General Settings before taking
            attendance.
          </div>
        ) : (
          <>
            <section className="flex flex-wrap items-end gap-4 rounded-lg bg-neutral-300 p-5">
              <div>
                <label htmlFor="attendance-class" className="mb-1 block font-semibold">
                  Class
                </label>
                <select
                  id="attendance-class"
                  value={classId}
                  onChange={event => setClassId(event.target.value)}
                  className="min-w-[180px] rounded border bg-white p-2"
                >
                  {classes.map(classInfo => (
                    <option key={classInfo._id} value={classInfo._id}>
                      {getClassLabel(classInfo)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="attendance-date" className="mb-1 block font-semibold">
                  Date
                </label>
                <input
                  id="attendance-date"
                  type="date"
                  max={getToday()}
                  value={date}
                  onChange={event => setDate(event.target.value)}
                  className="rounded border bg-white p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="attendance-session"
                  className="mb-1 block font-semibold"
                >
                  Session
                </label>
                <select
                  id="attendance-session"
                  value={session}
                  onChange={event => setSession(event.target.value)}
                  className="rounded border bg-white p-2"
                >
                  {sessionOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="attendance-term" className="mb-1 block font-semibold">
                  Term
                </label>
                <select
                  id="attendance-term"
                  value={term}
                  onChange={event => setTerm(event.target.value)}
                  className="rounded border bg-white p-2"
                >
                  <option value="1st Term">1st Term</option>
                  <option value="2nd Term">2nd Term</option>
                  <option value="3rd Term">3rd Term</option>
                </select>
              </div>
              <div className="ml-auto">
                {attendanceQuery.data?.is_recorded && (
                  <span className="rounded-full bg-secondary-green-100 px-3 py-2 text-sm font-semibold text-secondary-green-700">
                    Saved register
                  </span>
                )}
              </div>
            </section>

            <div className="mt-5">
              <AttendanceSummary values={values} />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Daily class register</h2>
                <p className="text-sm text-gray-800">
                  Students belonging to this class in the selected session and term are shown.
                </p>
              </div>
              <button
                type="button"
                onClick={markAllPresent}
                disabled={students.length === 0}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold disabled:opacity-50"
              >
                <Icon icon="material-symbols:done-all-rounded" />
                Mark all present
              </button>
            </div>

            <AttendanceRegisterState
              isLoading={attendanceQuery.isLoading || classQuery.isLoading}
              isError={attendanceQuery.isError}
              students={students}
              values={values}
              updateValue={updateValue}
            />

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => saveMutation.mutate()}
                disabled={students.length === 0 || saveMutation.isPending}
                className="rounded-lg bg-primary-purple-700 px-8 py-3 font-semibold text-white disabled:opacity-50"
              >
                {saveMutation.isPending
                  ? "Saving attendance..."
                  : attendanceQuery.data?.is_recorded
                    ? "Update attendance"
                    : "Save attendance"}
              </button>
            </div>
          </>
        )}
      </main>
    </Container>
  );
}
