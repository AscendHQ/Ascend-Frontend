import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { ParentStudent } from "@/types/parent";

type StudentPortalProfile = {
  _id: string;
  account: { _id: string; email: string };
  student: ParentStudent;
};

const getStudentName = (student: ParentStudent) =>
  [student.personal_information.first_name, student.personal_information.middle_name, student.personal_information.last_name]
    .filter(Boolean)
    .join(" ");

export default function StudentPortalAccounts() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);
  const [studentId, setStudentId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const profilesQuery = useQuery({
    queryKey: ["studentPortalAccounts"],
    queryFn: () => axiosInstance.get("/student-portals").then(response => response.data as StudentPortalProfile[]),
  });
  const studentsQuery = useQuery({
    queryKey: ["studentPortalEligibleStudents"],
    queryFn: () => axiosInstance.get("/students", { params: { limit: 1000, is_active: true } }).then(response => response.data as { students: ParentStudent[] }),
  });
  const linkedIds = new Set(profilesQuery.data?.map(profile => profile.student._id) ?? []);
  const eligibleStudents = (studentsQuery.data?.students ?? []).filter(student => !linkedIds.has(student._id));
  const mutation = useMutation({
    mutationFn: () => axiosInstance.post("/student-portals", { student_id: studentId, email, password }).then(response => response.data),
    onSuccess: () => {
      api.success({ message: "Student portal account created", description: "The student can sign in with the supplied email and temporary password." });
      setStudentId(""); setEmail(""); setPassword(""); setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["studentPortalAccounts"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => api.error({ message: "Account could not be created", description: error.response?.data ?? error.message }),
  });
  return (
    <Container headerTitle="Student Portals">
      <main className="min-h-full bg-neutral-300 p-6 lg:p-10">
        {contextHolder}
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-bold">Student portal accounts</h1><p className="text-sm text-gray-800">Give each student secure access to their own information.</p></div><button type="button" onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"><Icon icon="material-symbols:person-add-outline-rounded" /> Add student account</button></div>
        {showForm && <section className="mt-6 rounded-xl border bg-white p-6"><div className="flex justify-between"><h2 className="text-xl font-bold">Create student account</h2><button type="button" onClick={() => setShowForm(false)}><Icon icon="carbon:close-outline" className="text-2xl" /></button></div><div className="mt-5 grid gap-4 md:grid-cols-3"><label className="text-sm font-semibold">Student<select value={studentId} onChange={event => setStudentId(event.target.value)} className="mt-1 w-full rounded border bg-white p-2 font-normal"><option value="">Select student</option>{eligibleStudents.map(student => <option key={student._id} value={student._id}>{getStudentName(student)} — {student.registration_number}</option>)}</select></label><label className="text-sm font-semibold">Login email<input type="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-1 w-full rounded border p-2 font-normal" /></label><label className="text-sm font-semibold">Temporary password<input type="password" value={password} onChange={event => setPassword(event.target.value)} className="mt-1 w-full rounded border p-2 font-normal" /><span className="mt-1 block text-xs font-normal text-gray-800">8+ characters with uppercase, lowercase, number, and symbol.</span></label></div><div className="mt-5 flex justify-end"><button type="button" disabled={!studentId || !email || !password || mutation.isPending} onClick={() => mutation.mutate()} className="rounded-lg bg-primary-purple-700 px-6 py-3 font-semibold text-white disabled:opacity-50">{mutation.isPending ? "Creating..." : "Create account"}</button></div></section>}
        <section className="mt-6 rounded-xl border bg-white p-6"><h2 className="text-lg font-bold">Registered student accounts</h2>{profilesQuery.isLoading || studentsQuery.isLoading ? <div className="flex justify-center py-16"><Spinner /></div> : !profilesQuery.data?.length ? <p className="py-12 text-center text-gray-800">No student portal accounts yet.</p> : <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-grey-50 text-xs uppercase text-gray-800"><tr><th className="p-3">Student</th><th className="p-3">Registration number</th><th className="p-3">Login email</th></tr></thead><tbody>{profilesQuery.data.map(profile => <tr key={profile._id} className="border-t"><td className="p-3 font-semibold">{getStudentName(profile.student)}</td><td className="p-3">{profile.student.registration_number}</td><td className="p-3">{profile.account.email}</td></tr>)}</tbody></table></div>}</section>
      </main>
    </Container>
  );
}
