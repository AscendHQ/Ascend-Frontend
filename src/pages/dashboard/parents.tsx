import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { ParentStudent } from "@/types/parent";

type ParentProfile = {
  _id: string;
  account: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    account_type: "parent";
  };
  children: ParentStudent[];
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

function StudentChecklist({
  students,
  selectedIds,
  onChange,
}: {
  students: ParentStudent[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [search, setSearch] = React.useState("");
  const filteredStudents = students.filter(student =>
    `${getStudentName(student)} ${student.registration_number}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const toggleStudent = (studentId: string) => {
    onChange(
      selectedIds.includes(studentId)
        ? selectedIds.filter(id => id !== studentId)
        : [...selectedIds, studentId]
    );
  };
  return (
    <div>
      <input
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search student name or registration number"
        className={controlClassName}
      />
      <div className="mt-2 max-h-64 space-y-1 overflow-y-auto rounded-lg border border-border-colour-light p-2">
        {filteredStudents.map(student => (
          <label
            key={student._id}
            className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-neutral-300"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(student._id)}
              onChange={() => toggleStudent(student._id)}
            />
            <span>
              <strong>{getStudentName(student)}</strong>
              <span className="ml-2 text-xs text-Text-meduim-emphasis">
                {student.registration_number}
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CreateParentForm({
  students,
  onClose,
}: {
  students: ParentStudent[];
  onClose: () => void;
}) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [studentIds, setStudentIds] = React.useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post("/parents", {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          student_ids: studentIds,
        })
        .then(response => response.data),
    onSuccess: () => {
      api.success({
        message: "Parent account created",
        description:
          "The parent can now sign in with the supplied email and temporary password.",
      });
      queryClient.invalidateQueries({ queryKey: ["parentAccounts"] });
      onClose();
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Parent account could not be created",
        description: error.response?.data ?? error.message,
      }),
  });
  const isComplete =
    firstName && lastName && email && password && studentIds.length > 0;
  return (
    <section className="mt-6 rounded-lg border-1.5 border-border-colour-light bg-white">
      {contextHolder}
      <div className="flex justify-between gap-4 border-b border-border-colour-light px-4 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold">Create parent account</h2>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Link one parent to one or more students.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close parent form"
          className="self-start rounded-lg p-2 text-gray-600 hover:bg-neutral-300"
        >
          <Icon icon="carbon:close-outline" className="text-2xl" />
        </button>
      </div>
      <div className="grid gap-4 px-4 py-5 sm:px-6 md:grid-cols-2">
        <label className="text-sm font-medium">
          First name
          <input
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            className={controlClassName}
          />
        </label>
        <label className="text-sm font-medium">
          Last name
          <input
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            className={controlClassName}
          />
        </label>
        <label className="text-sm font-medium">
          Email
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className={controlClassName}
          />
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
            At least 8 characters with uppercase, lowercase, number, and symbol.
          </span>
        </label>
      </div>
      <div className="px-4 pb-5 sm:px-6">
        <p className="mb-2 text-sm font-semibold">Linked students</p>
        <StudentChecklist
          students={students}
          selectedIds={studentIds}
          onChange={setStudentIds}
        />
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
          disabled={!isComplete || mutation.isPending}
          onClick={() => mutation.mutate()}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-purple-800 disabled:opacity-50"
        >
          {mutation.isPending ? "Creating account..." : "Create parent account"}
        </button>
      </div>
    </section>
  );
}

function EditChildren({
  parent,
  students,
  onClose,
}: {
  parent: ParentProfile;
  students: ParentStudent[];
  onClose: () => void;
}) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [studentIds, setStudentIds] = React.useState(
    parent.children.map(child => child._id)
  );
  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .put(`/parents/${parent._id}/children`, { student_ids: studentIds })
        .then(response => response.data),
    onSuccess: () => {
      api.success({ message: "Linked students updated" });
      queryClient.invalidateQueries({ queryKey: ["parentAccounts"] });
      onClose();
    },
    onError: (error: Error & { response?: { data?: string } }) =>
      api.error({
        message: "Links could not be updated",
        description: error.response?.data ?? error.message,
      }),
  });
  return (
    <section className="mt-6 rounded-lg border-1.5 border-border-colour-light bg-white">
      {contextHolder}
      <div className="flex justify-between gap-4 border-b border-border-colour-light px-4 py-5 sm:px-6">
        <h2 className="text-lg font-semibold">
          Edit children for {parent.account.first_name}{" "}
          {parent.account.last_name}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close linked students form"
          className="self-start rounded-lg p-2 text-gray-600 hover:bg-neutral-300"
        >
          <Icon icon="carbon:close-outline" className="text-2xl" />
        </button>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <StudentChecklist
          students={students}
          selectedIds={studentIds}
          onChange={setStudentIds}
        />
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
          disabled={studentIds.length === 0 || mutation.isPending}
          onClick={() => mutation.mutate()}
          className="rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-purple-800 disabled:opacity-50"
        >
          Save linked students
        </button>
      </div>
    </section>
  );
}

export default function ParentsManagement() {
  const [showCreate, setShowCreate] = React.useState(false);
  const [editingParent, setEditingParent] =
    React.useState<ParentProfile | null>(null);
  const parentsQuery = useQuery({
    queryKey: ["parentAccounts"],
    queryFn: () =>
      axiosInstance
        .get("/parents")
        .then(response => response.data as ParentProfile[]),
  });
  const studentsQuery = useQuery({
    queryKey: ["parentEligibleStudents"],
    queryFn: () =>
      axiosInstance
        .get("/students", { params: { limit: 1000, is_active: true } })
        .then(response => response.data as { students: ParentStudent[] }),
  });
  const students = studentsQuery.data?.students ?? [];
  return (
    <Container headerTitle="Parents">
      <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Parent accounts</h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Create portal access and control which children each parent can
              view.
            </p>
          </div>
          <DashboardButton
            variant="primary"
            onClick={() => {
              setEditingParent(null);
              setShowCreate(true);
            }}
            leftElement={
              <Icon icon="material-symbols:person-add-outline-rounded" />
            }
            className="m-0"
          >
            Add parent
          </DashboardButton>
        </div>
        {showCreate && (
          <CreateParentForm
            students={students}
            onClose={() => setShowCreate(false)}
          />
        )}
        {editingParent && (
          <EditChildren
            parent={editingParent}
            students={students}
            onClose={() => setEditingParent(null)}
          />
        )}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Registered parents</h2>
          {parentsQuery.isLoading || studentsQuery.isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !parentsQuery.data?.length ? (
            <p className="mt-5 rounded-lg border border-dashed border-border-colour-light py-12 text-center text-Text-meduim-emphasis">
              No parent accounts have been created yet.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-lg border border-border-colour-light">
              <table className="w-full min-w-[750px] text-left text-sm text-gray-600">
                <thead className="bg-neutral-300 text-xs font-semibold text-Text-high-emphasis">
                  <tr>
                    <th className="p-3">Parent</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Linked students</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {parentsQuery.data.map(parent => (
                    <tr
                      key={parent._id}
                      className="border-t border-border-colour-light"
                    >
                      <td className="p-3 font-semibold text-Text-high-emphasis">
                        {parent.account.first_name} {parent.account.last_name}
                      </td>
                      <td className="p-3">{parent.account.email}</td>
                      <td className="p-3">
                        {parent.children.map(getStudentName).join(", ")}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreate(false);
                            setEditingParent(parent);
                          }}
                          className="font-semibold text-primary-purple-700"
                        >
                          Edit children
                        </button>
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
