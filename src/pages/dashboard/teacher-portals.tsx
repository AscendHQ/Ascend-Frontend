import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { classInfoProp } from "@/templates/Database/class/class-types";

type TeacherStaff = {
  _id: string;
  staff_no: string;
  surname: string;
  other_names: string;
  status: string;
};
type TeacherSubject = {
  _id: string;
  name: string;
  code: string;
  classes: Array<string | { _id: string }>;
};
type TeacherAssignment = { class: classInfoProp; subjects: TeacherSubject[] };
type TeacherProfile = {
  _id: string;
  account: { email: string };
  staff: TeacherStaff;
  assignments: TeacherAssignment[];
};
type AssignmentDraft = { key: string; classId: string; subjectIds: string[] };
type AssignmentPayload = { class_id: string; subject_ids: string[] };

const className = (item: classInfoProp) => {
  const section = item.level === "junior" ? item.other_section : item.section;
  return section ? `${item.name} - ${section}` : item.name;
};
const newAssignment = (): AssignmentDraft => ({
  key: `${Date.now()}-${Math.random()}`,
  classId: "",
  subjectIds: [],
});
const subjectBelongsToClass = (subject: TeacherSubject, classId: string) =>
  (subject.classes ?? []).some(item =>
    typeof item === "string" ? item === classId : item._id === classId
  );
const toPayload = (items: AssignmentDraft[]): AssignmentPayload[] =>
  items.map(item => ({ class_id: item.classId, subject_ids: item.subjectIds }));

function AssignmentEditor({
  assignments,
  setAssignments,
  classes,
  subjects,
}: {
  assignments: AssignmentDraft[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDraft[]>>;
  classes: classInfoProp[];
  subjects: TeacherSubject[];
}) {
  const update = (key: string, values: Partial<AssignmentDraft>) =>
    setAssignments(current =>
      current.map(item => (item.key === key ? { ...item, ...values } : item))
    );
  return (
    <div className="space-y-4 md:col-span-2">
      <div>
        <h3 className="text-sm font-semibold">Class and subject assignments</h3>
        <p className="text-xs text-gray-800">
          Add one row per class, then select only the subjects this teacher
          handles in that class.
        </p>
      </div>
      {assignments.map((assignment, index) => {
        const availableSubjects = subjects.filter(subject =>
          subjectBelongsToClass(subject, assignment.classId)
        );
        const selectedElsewhere = new Set(
          assignments
            .filter(item => item.key !== assignment.key)
            .map(item => item.classId)
        );
        return (
          <div
            key={assignment.key}
            className="grid gap-3 rounded-lg border bg-grey-50 p-4 md:grid-cols-[1fr_2fr_auto]"
          >
            <label className="text-sm font-semibold">
              Class {index + 1}
              <select
                value={assignment.classId}
                onChange={event =>
                  update(assignment.key, {
                    classId: event.target.value,
                    subjectIds: [],
                  })
                }
                className="mt-1 w-full rounded border bg-white p-2 font-normal"
              >
                <option value="">Select class</option>
                {classes.map(item => (
                  <option
                    key={item._id}
                    value={item._id}
                    disabled={selectedElsewhere.has(item._id)}
                  >
                    {className(item)}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Subjects taught in this class
              <select
                multiple
                value={assignment.subjectIds}
                disabled={!assignment.classId}
                onChange={event =>
                  update(assignment.key, {
                    subjectIds: Array.from(
                      event.target.selectedOptions,
                      option => option.value
                    ),
                  })
                }
                className="mt-1 h-28 w-full rounded border bg-white p-2 font-normal disabled:bg-gray-100"
              >
                {availableSubjects.map(subject => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
              {assignment.classId && availableSubjects.length === 0 && (
                <span className="mt-1 block text-xs font-normal text-red-700">
                  No subjects are registered for this class yet.
                </span>
              )}
            </label>
            <button
              type="button"
              aria-label={`Remove class assignment ${index + 1}`}
              disabled={assignments.length === 1}
              onClick={() =>
                setAssignments(current =>
                  current.filter(item => item.key !== assignment.key)
                )
              }
              className="self-center rounded p-2 text-red-700 disabled:opacity-30"
            >
              <Icon
                icon="material-symbols:delete-outline-rounded"
                className="text-xl"
              />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => setAssignments(current => [...current, newAssignment()])}
        className="flex items-center gap-2 rounded border border-primary-purple-700 px-4 py-2 text-sm font-semibold text-primary-purple-700"
      >
        <Icon icon="material-symbols:add-rounded" /> Add another class
      </button>
    </div>
  );
}

function TeacherForm({
  profile,
  teachers,
  classes,
  subjects,
  pending,
  onCancel,
  onCreate,
  onUpdate,
}: {
  profile?: TeacherProfile;
  teachers: TeacherStaff[];
  classes: classInfoProp[];
  subjects: TeacherSubject[];
  pending: boolean;
  onCancel: () => void;
  onCreate: (value: {
    staff_id: string;
    email: string;
    password: string;
    assignments: AssignmentPayload[];
  }) => void;
  onUpdate: (assignments: AssignmentPayload[]) => void;
}) {
  const [staffId, setStaffId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [assignments, setAssignments] = React.useState<AssignmentDraft[]>(() =>
    profile
      ? profile.assignments.map(item => ({
          key: `${item.class._id}-${Math.random()}`,
          classId: item.class._id,
          subjectIds: item.subjects
            .filter(subject => subjectBelongsToClass(subject, item.class._id))
            .map(subject => subject._id),
        }))
      : [newAssignment()]
  );
  const validAssignments = assignments.every(
    item => item.classId && item.subjectIds.length > 0
  );
  const save = () =>
    profile
      ? onUpdate(toPayload(assignments))
      : onCreate({
          staff_id: staffId,
          email,
          password,
          assignments: toPayload(assignments),
        });
  return (
    <section className="mt-6 rounded-xl border bg-white p-6">
      <div className="flex justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {profile ? "Edit teacher assignments" : "Create teacher account"}
          </h2>
          <p className="text-sm text-gray-800">
            {profile
              ? `${profile.staff.surname} ${profile.staff.other_names} · ${profile.account.email}`
              : "Every class assignment must include at least one subject."}
          </p>
        </div>
        <button type="button" onClick={onCancel}>
          <Icon icon="carbon:close-outline" className="text-2xl" />
        </button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {!profile && (
          <>
            <label className="text-sm font-semibold">
              Teaching staff
              <select
                value={staffId}
                onChange={event => setStaffId(event.target.value)}
                className="mt-1 w-full rounded border bg-white p-2 font-normal"
              >
                <option value="">Select teacher</option>
                {teachers.map(staff => (
                  <option key={staff._id} value={staff._id}>
                    {staff.surname} {staff.other_names} — {staff.staff_no}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Login email
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="mt-1 w-full rounded border p-2 font-normal"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              Temporary password
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="mt-1 w-full rounded border p-2 font-normal"
              />
              <span className="mt-1 block text-xs font-normal text-gray-800">
                8+ characters with uppercase, lowercase, number, and symbol.
              </span>
            </label>
          </>
        )}
        <AssignmentEditor
          assignments={assignments}
          setAssignments={setAssignments}
          classes={classes}
          subjects={subjects}
        />
      </div>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          disabled={
            !validAssignments ||
            (!profile && (!staffId || !email || !password)) ||
            pending
          }
          onClick={save}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : profile
            ? "Save assignments"
            : "Create account"}
        </button>
      </div>
    </section>
  );
}

function ProfilesTable({
  profiles,
  onEdit,
}: {
  profiles: TeacherProfile[];
  onEdit: (profile: TeacherProfile) => void;
}) {
  if (!profiles.length)
    return (
      <p className="py-12 text-center text-gray-800">
        No teacher portal accounts yet.
      </p>
    );
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-grey-50 text-xs uppercase text-gray-800">
          <tr>
            <th className="p-3">Teacher</th>
            <th className="p-3">Email</th>
            <th className="p-3">Class → subjects</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile._id} className="border-t align-top">
              <td className="p-3 font-semibold">
                {profile.staff.surname} {profile.staff.other_names}
              </td>
              <td className="p-3">{profile.account.email}</td>
              <td className="p-3">
                <div className="space-y-2">
                  {profile.assignments.map(assignment => (
                    <p key={assignment.class._id}>
                      <span className="font-semibold">
                        {className(assignment.class)}:
                      </span>{" "}
                      {assignment.subjects
                        .map(subject => subject.name)
                        .join(", ") || "—"}
                    </p>
                  ))}
                </div>
              </td>
              <td className="p-3">
                <button
                  type="button"
                  onClick={() => onEdit(profile)}
                  className="rounded border border-primary-purple-700 px-3 py-2 font-semibold text-primary-purple-700"
                >
                  Edit assignments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeacherPortalAccounts() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = React.useState(false);
  const [editingProfile, setEditingProfile] = React.useState<TeacherProfile>();
  const profilesQuery = useQuery({
    queryKey: ["teacherPortalAccounts"],
    queryFn: () =>
      axiosInstance
        .get("/teacher-portals")
        .then(response => response.data as TeacherProfile[]),
  });
  const staffQuery = useQuery({
    queryKey: ["teacherPortalStaff"],
    queryFn: () =>
      axiosInstance
        .get("/staffs", { params: { limit: 1000, status: "teaching" } })
        .then(response => response.data as { staffs: TeacherStaff[] }),
  });
  const classQuery = useQuery({
    queryKey: ["teacherPortalClasses"],
    queryFn: () =>
      axiosInstance
        .get("/classes")
        .then(response => response.data as { classes: classInfoProp[] }),
  });
  const subjectQuery = useQuery({
    queryKey: ["teacherPortalSubjects"],
    queryFn: () =>
      axiosInstance
        .get("/subjects")
        .then(response => response.data as { subjects: TeacherSubject[] }),
  });
  const refresh = () => {
    setShowCreate(false);
    setEditingProfile(undefined);
    queryClient.invalidateQueries({ queryKey: ["teacherPortalAccounts"] });
  };
  const showError = (error: Error & { response?: { data?: string } }) =>
    api.error({
      message: "Teacher assignments could not be saved",
      description: error.response?.data ?? error.message,
    });
  const createMutation = useMutation({
    mutationFn: (value: {
      staff_id: string;
      email: string;
      password: string;
      assignments: AssignmentPayload[];
    }) => axiosInstance.post("/teacher-portals", value),
    onSuccess: () => {
      api.success({ message: "Teacher portal account created" });
      refresh();
    },
    onError: showError,
  });
  const updateMutation = useMutation({
    mutationFn: (assignments: AssignmentPayload[]) =>
      axiosInstance.put(`/teacher-portals/${editingProfile?._id}/assignments`, {
        assignments,
      }),
    onSuccess: () => {
      api.success({ message: "Teacher assignments updated" });
      refresh();
    },
    onError: showError,
  });
  const linkedStaffIds = new Set(
    profilesQuery.data?.map(profile => profile.staff._id) ?? []
  );
  const teachers = (staffQuery.data?.staffs ?? []).filter(
    staff => !linkedStaffIds.has(staff._id)
  );
  const loading =
    profilesQuery.isLoading ||
    staffQuery.isLoading ||
    classQuery.isLoading ||
    subjectQuery.isLoading;
  return (
    <Container headerTitle="Teacher Portals">
      <main className="min-h-full bg-neutral-300 p-6 lg:p-10">
        {contextHolder}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Teacher portal accounts</h1>
            <p className="text-sm text-gray-800">
              Assign each teacher to exact class and subject combinations.
              Students are included automatically from their current class.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingProfile(undefined);
              setShowCreate(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"
          >
            <Icon icon="material-symbols:person-add-outline-rounded" /> Add
            teacher account
          </button>
        </div>
        {(showCreate || editingProfile) && (
          <TeacherForm
            key={editingProfile?._id ?? "create"}
            profile={editingProfile}
            teachers={teachers}
            classes={classQuery.data?.classes ?? []}
            subjects={subjectQuery.data?.subjects ?? []}
            pending={createMutation.isPending || updateMutation.isPending}
            onCancel={() => {
              setShowCreate(false);
              setEditingProfile(undefined);
            }}
            onCreate={value => createMutation.mutate(value)}
            onUpdate={value => updateMutation.mutate(value)}
          />
        )}
        <section className="mt-6 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold">Registered teacher accounts</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : (
            <ProfilesTable
              profiles={profilesQuery.data ?? []}
              onEdit={profile => {
                setShowCreate(false);
                setEditingProfile(profile);
              }}
            />
          )}
        </section>
      </main>
    </Container>
  );
}
