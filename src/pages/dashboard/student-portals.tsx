import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { ParentStudent } from "@/types/parent";

type StudentPortalProfile = {
  _id: string;
  account: { _id: string; login_id?: string };
  student: ParentStudent;
};

const controlClassName =
  "mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500 focus:ring-2 focus:ring-primary-purple-100";

const getStudentName = (student: ParentStudent) =>
  [
    student.personal_information.first_name,
    student.personal_information.middle_name,
    student.personal_information.last_name,
  ]
    .filter(Boolean)
    .join(" ");

export default function StudentPortalAccounts() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);
  const [studentId, setStudentId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const profilesQuery = useQuery({
    queryKey: ["studentPortalAccounts"],
    queryFn: () =>
      axiosInstance
        .get("/student-portals")
        .then(response => response.data as StudentPortalProfile[]),
  });
  const studentsQuery = useQuery({
    queryKey: ["studentPortalEligibleStudents"],
    queryFn: () =>
      axiosInstance
        .get("/students", { params: { limit: 1000, is_active: true } })
        .then(response => response.data as { students: ParentStudent[] }),
  });
  const linkedIds = new Set(
    profilesQuery.data?.map(profile => profile.student._id) ?? []
  );
  const eligibleStudents = (studentsQuery.data?.students ?? []).filter(
    student => !linkedIds.has(student._id)
  );
  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/student-portals", { student_id: studentId, password })
        .then(response => response.data),
    onSuccess: () => {
      api.success({
        message: "Student portal account created",
        description:
          "The student can sign in with their registration number and temporary password.",
      });
      setStudentId("");
      setPassword("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["studentPortalAccounts"] });
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Account could not be created",
        description: error.response?.data ?? error.message,
      }),
  });
  return (
    <Container headerTitle="Student Portals">
      <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10">
        {contextHolder}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Student portal accounts</h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Give each student secure access to their own information.
            </p>
          </div>
          <DashboardButton
            variant="primary"
            onClick={() => setShowForm(true)}
            leftElement={
              <Icon icon="material-symbols:person-add-outline-rounded" />
            }
            className="m-0"
          >
            Add student account
          </DashboardButton>
        </div>
        {showForm && (
          <section className="mt-6 rounded-lg border-1.5 border-border-colour-light bg-white">
            <div className="flex justify-between gap-4 border-b border-border-colour-light px-4 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold">
                  Create student account
                </h2>
                <p className="mt-1 text-sm text-Text-meduim-emphasis">
                  The selected student&apos;s registration number will be their
                  login ID.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close account form"
                className="self-start rounded-lg p-2 text-gray-600 hover:bg-neutral-300"
              >
                <Icon icon="carbon:close-outline" className="text-2xl" />
              </button>
            </div>
            <div className="grid gap-4 px-4 py-5 sm:px-6 md:grid-cols-2">
              <label className="text-sm font-medium">
                Student
                <select
                  value={studentId}
                  onChange={event => setStudentId(event.target.value)}
                  className={controlClassName}
                >
                  <option value="">Select student</option>
                  {eligibleStudents.map(student => (
                    <option key={student._id} value={student._id}>
                      {getStudentName(student)} — {student.registration_number}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium">
                Temporary password
                <input
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className={controlClassName}
                />
                <span className="mt-1 block text-xs font-normal text-Text-meduim-emphasis">
                  8+ characters with uppercase, lowercase, number, and symbol.
                </span>
              </label>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-border-colour-light px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border-1.5 border-border-colour-light px-6 py-3 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!studentId || !password || mutation.isPending}
                onClick={() => mutation.mutate()}
                className="rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-purple-800 disabled:opacity-50"
              >
                {mutation.isPending ? "Creating..." : "Create account"}
              </button>
            </div>
          </section>
        )}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Registered student accounts</h2>
          {profilesQuery.isLoading || studentsQuery.isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !profilesQuery.data?.length ? (
            <p className="mt-5 rounded-lg border border-dashed border-border-colour-light py-12 text-center text-Text-meduim-emphasis">
              No student portal accounts yet.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-lg border border-border-colour-light">
              <table className="w-full min-w-[650px] text-left text-sm text-gray-600">
                <thead className="bg-neutral-300 text-xs font-semibold text-Text-high-emphasis">
                  <tr>
                    <th className="p-3">Student</th>
                    <th className="p-3">Registration number</th>
                    <th className="p-3">Login ID</th>
                  </tr>
                </thead>
                <tbody>
                  {profilesQuery.data.map(profile => (
                    <tr
                      key={profile._id}
                      className="border-t border-border-colour-light"
                    >
                      <td className="p-3 font-semibold text-Text-high-emphasis">
                        {getStudentName(profile.student)}
                      </td>
                      <td className="p-3">
                        {profile.student.registration_number}
                      </td>
                      <td className="p-3 font-semibold">
                        {profile.student.registration_number}
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
