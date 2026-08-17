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

type TeacherSubject = { _id: string; name: string; code: string };

type TeacherProfile = {
  _id: string;
  account: { email: string };
  staff: TeacherStaff;
  classes: classInfoProp[];
  subjects: TeacherSubject[];
};

const className = (item: classInfoProp) => {
  const section = item.level === "junior" ? item.other_section : item.section;
  return section ? `${item.name} - ${section}` : item.name;
};

export default function TeacherPortalAccounts() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);
  const [staffId, setStaffId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [classIds, setClassIds] = React.useState<string[]>([]);
  const [subjectIds, setSubjectIds] = React.useState<string[]>([]);

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

  const linkedStaffIds = new Set(
    profilesQuery.data?.map(profile => profile.staff._id) ?? []
  );
  const teachers = (staffQuery.data?.staffs ?? []).filter(
    staff => !linkedStaffIds.has(staff._id)
  );

  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/teacher-portals", {
          staff_id: staffId,
          email,
          password,
          class_ids: classIds,
          subject_ids: subjectIds,
        })
        .then(response => response.data),
    onSuccess: () => {
      api.success({
        message: "Teacher portal account created",
        description: "The teacher can now sign in with their email.",
      });
      setStaffId("");
      setEmail("");
      setPassword("");
      setClassIds([]);
      setSubjectIds([]);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["teacherPortalAccounts"] });
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Teacher account could not be created",
        description: error.response?.data ?? error.message,
      }),
  });

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
              Link teaching staff to the classes and subjects they may access.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"
          >
            <Icon icon="material-symbols:person-add-outline-rounded" /> Add
            teacher account
          </button>
        </div>

        {showForm && (
          <section className="mt-6 rounded-xl border bg-white p-6">
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Create teacher account</h2>
                <p className="text-sm text-gray-800">
                  At least one class must be assigned.
                </p>
              </div>
              <button type="button" onClick={() => setShowForm(false)}>
                <Icon icon="carbon:close-outline" className="text-2xl" />
              </button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
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
              <label className="text-sm font-semibold">
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
              <label className="text-sm font-semibold">
                Assigned classes
                <select
                  multiple
                  value={classIds}
                  onChange={event =>
                    setClassIds(
                      Array.from(
                        event.target.selectedOptions,
                        option => option.value
                      )
                    )
                  }
                  className="mt-1 h-32 w-full rounded border bg-white p-2 font-normal"
                >
                  {(classQuery.data?.classes ?? []).map(item => (
                    <option key={item._id} value={item._id}>
                      {className(item)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Assigned subjects
                <select
                  multiple
                  value={subjectIds}
                  onChange={event =>
                    setSubjectIds(
                      Array.from(
                        event.target.selectedOptions,
                        option => option.value
                      )
                    )
                  }
                  className="mt-1 h-32 w-full rounded border bg-white p-2 font-normal"
                >
                  {(subjectQuery.data?.subjects ?? []).map(subject => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                disabled={
                  !staffId ||
                  !email ||
                  !password ||
                  classIds.length === 0 ||
                  mutation.isPending
                }
                onClick={() => mutation.mutate()}
                className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
              >
                {mutation.isPending ? "Creating..." : "Create account"}
              </button>
            </div>
          </section>
        )}

        <section className="mt-6 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold">Registered teacher accounts</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !profilesQuery.data?.length ? (
            <p className="py-12 text-center text-gray-800">
              No teacher portal accounts yet.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-grey-50 text-xs uppercase text-gray-800">
                  <tr>
                    <th className="p-3">Teacher</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Classes</th>
                    <th className="p-3">Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  {profilesQuery.data.map(profile => (
                    <tr key={profile._id} className="border-t">
                      <td className="p-3 font-semibold">
                        {profile.staff.surname} {profile.staff.other_names}
                      </td>
                      <td className="p-3">{profile.account.email}</td>
                      <td className="p-3">
                        {profile.classes.map(className).join(", ")}
                      </td>
                      <td className="p-3">
                        {profile.subjects.map(subject => subject.name).join(", ") || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </Container>
  );
}
