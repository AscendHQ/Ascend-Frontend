import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Spinner } from "@/components/ui/Loading";

type AttendanceStatus = "present" | "absent" | "late" | "excused";
type AssignedClass = {
  _id: string;
  name: string;
  section?: string;
  other_section?: string;
};
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

const getToday = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
};

const getClassName = (item: AssignedClass) => {
  const section = item.other_section ?? item.section;
  return section ? `${item.name} - ${section}` : item.name;
};

const getStudentName = (student: AttendanceStudent) =>
  [
    student.personal_information.last_name,
    student.personal_information.first_name,
    student.personal_information.middle_name,
  ]
    .filter(Boolean)
    .join(" ");

function AttendanceSummary({
  values,
}: {
  values: Record<string, AttendanceValue>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {STATUS_OPTIONS.map(option => (
        <div key={option.value} className="rounded-xl border bg-white p-4">
          <p className="text-xs text-gray-800">{option.label}</p>
          <p className="mt-1 text-2xl font-bold">
            {
              Object.values(values).filter(
                value => value.status === option.value
              ).length
            }
          </p>
        </div>
      ))}
    </div>
  );
}

function StudentRegister({
  students,
  values,
  updateValue,
}: {
  students: AttendanceStudent[];
  values: Record<string, AttendanceValue>;
  updateValue: (studentId: string, update: Partial<AttendanceValue>) => void;
}) {
  return (
    <div className="divide-y rounded-xl border bg-white">
      {students.map(student => {
        const name = getStudentName(student);
        return (
          <div
            key={student._id}
            className="grid gap-3 p-4 md:grid-cols-[minmax(180px,1fr)_150px_minmax(180px,1fr)] md:items-center"
          >
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-gray-800">
                {student.registration_number}
              </p>
            </div>
            <label className="text-xs font-semibold text-gray-800">
              Status
              <select
                aria-label={`Attendance status for ${name}`}
                value={values[student._id]?.status ?? "present"}
                onChange={event =>
                  updateValue(student._id, {
                    status: event.target.value as AttendanceStatus,
                  })
                }
                className="mt-1 w-full rounded border bg-white p-2 text-sm font-normal text-black"
              >
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-gray-800">
              Remark
              <input
                aria-label={`Attendance remark for ${name}`}
                maxLength={250}
                value={values[student._id]?.remark ?? ""}
                onChange={event =>
                  updateValue(student._id, { remark: event.target.value })
                }
                placeholder="Optional"
                className="mt-1 w-full rounded border p-2 text-sm font-normal text-black"
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

function RegisterContent({
  loading,
  error,
  students,
  values,
  pending,
  isRecorded,
  updateValue,
  markAllPresent,
  save,
}: {
  loading: boolean;
  error: boolean;
  students: AttendanceStudent[];
  values: Record<string, AttendanceValue>;
  pending: boolean;
  isRecorded: boolean;
  updateValue: (studentId: string, update: Partial<AttendanceValue>) => void;
  markAllPresent: () => void;
  save: () => void;
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <section className="rounded-xl border bg-white p-8 text-center text-secondary-red-600">
        The attendance register could not be loaded.
      </section>
    );
  }
  if (!students.length) {
    return (
      <section className="rounded-xl border bg-white p-8 text-center text-gray-800">
        No active students belong to this class for the current academic period.
      </section>
    );
  }
  return (
    <>
      <AttendanceSummary values={values} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Daily class register</h2>
          <p className="text-sm text-gray-800">
            {students.length} active student(s)
          </p>
        </div>
        <button
          type="button"
          onClick={markAllPresent}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold"
        >
          <Icon icon="material-symbols:done-all-rounded" /> Mark all present
        </button>
      </div>
      <StudentRegister
        students={students}
        values={values}
        updateValue={updateValue}
      />
      <div className="flex justify-end">
        <button
          type="button"
          disabled={pending}
          onClick={save}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : isRecorded
            ? "Update attendance"
            : "Save attendance"}
        </button>
      </div>
    </>
  );
}

export default function TeacherAttendance({
  classes,
  session,
  term,
}: {
  classes: AssignedClass[];
  session?: string;
  term?: string;
}) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [classId, setClassId] = React.useState("");
  const [date, setDate] = React.useState(getToday);
  const [values, setValues] = React.useState<Record<string, AttendanceValue>>(
    {}
  );

  React.useEffect(() => {
    if (!classId && classes[0]) setClassId(classes[0]._id);
  }, [classId, classes]);

  const registerQuery = useQuery({
    queryKey: ["teacherAttendance", classId, session, term, date],
    queryFn: () =>
      axiosInstance
        .get("/teacher-portals/me/attendance", {
          params: { class_id: classId, session, term, date },
        })
        .then(response => response.data as AttendanceRegister),
    enabled: Boolean(classId && session && term && date),
  });
  const students = React.useMemo(
    () => registerQuery.data?.students ?? [],
    [registerQuery.data]
  );

  React.useEffect(() => {
    setValues(
      Object.fromEntries(
        students.map(student => [
          student._id,
          {
            status: student.status ?? "present",
            remark: student.remark ?? "",
          },
        ])
      )
    );
  }, [students]);

  const updateValue = (studentId: string, update: Partial<AttendanceValue>) =>
    setValues(current => ({
      ...current,
      [studentId]: { ...current[studentId], ...update },
    }));

  const markAllPresent = () =>
    setValues(current =>
      Object.fromEntries(
        Object.entries(current).map(([studentId, value]) => [
          studentId,
          { ...value, status: "present" },
        ])
      )
    );

  const saveMutation = useMutation({
    mutationFn: () =>
      axiosInstance.post("/teacher-portals/me/attendance", {
        class_id: classId,
        session,
        term,
        date,
        records: students.map(student => ({
          student: student._id,
          status: values[student._id]?.status,
          remark: values[student._id]?.remark ?? "",
        })),
      }),
    onSuccess: () => {
      api.success({
        message: registerQuery.data?.is_recorded
          ? "Attendance updated"
          : "Attendance saved",
      });
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
      queryClient.invalidateQueries({ queryKey: ["teacherPortalDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["studentAttendance"] });
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Attendance could not be saved",
        description: error.response?.data ?? error.message,
      }),
  });

  if (!session || !term) {
    return (
      <section className="rounded-xl border border-warning-main bg-warning-main/10 p-5">
        The school administrator must set the current session and term before
        attendance can be recorded.
      </section>
    );
  }
  if (!classes.length) {
    return (
      <section className="rounded-xl border bg-white p-8 text-center text-gray-800">
        No class has been assigned to your teacher account.
      </section>
    );
  }

  return (
    <div className="space-y-5">
      {contextHolder}
      <section className="flex flex-wrap items-end gap-4 rounded-xl border bg-white p-5">
        <label className="min-w-[190px] flex-1 text-sm font-semibold">
          Class
          <select
            value={classId}
            onChange={event => setClassId(event.target.value)}
            className="mt-1 w-full rounded border bg-white p-2 font-normal"
          >
            {classes.map(item => (
              <option key={item._id} value={item._id}>
                {getClassName(item)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Date
          <input
            type="date"
            max={getToday()}
            value={date}
            onChange={event => setDate(event.target.value)}
            className="mt-1 block rounded border bg-white p-2 font-normal"
          />
        </label>
        <div className="text-sm">
          <p className="font-semibold">Academic period</p>
          <p className="rounded bg-neutral-300 px-3 py-2">
            {session}, {term}
          </p>
        </div>
        {registerQuery.data?.is_recorded && (
          <span className="rounded-full bg-secondary-green-100 px-3 py-2 text-sm font-semibold text-secondary-green-700">
            Saved register
          </span>
        )}
      </section>

      <RegisterContent
        loading={registerQuery.isLoading}
        error={registerQuery.isError}
        students={students}
        values={values}
        pending={saveMutation.isPending}
        isRecorded={Boolean(registerQuery.data?.is_recorded)}
        updateValue={updateValue}
        markAllPresent={markAllPresent}
        save={() => saveMutation.mutate()}
      />
    </div>
  );
}
