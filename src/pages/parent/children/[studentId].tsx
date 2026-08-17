import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

import { axiosInstance } from "@/api";
import ParentLayout from "@/components/layout/parent";
import { Spinner } from "@/components/ui/Loading";
import { PARENT_DASHBOARD } from "@/config/links";
import { ParentChildDetails } from "@/types/parent";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

function FinanceSection({ details }: { details: ParentChildDetails }) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Fees and payments</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Summary label="Total invoiced" value={formatCurrency(details.finances.invoiced)} />
        <Summary label="Paid" value={formatCurrency(details.finances.paid)} />
        <Summary label="Outstanding" value={formatCurrency(details.finances.balance)} />
      </div>
      {details.invoices.length === 0 ? (
        <p className="mt-5 text-sm text-gray-800">No invoices yet.</p>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-grey-50 text-xs uppercase text-gray-800">
              <tr><th className="p-3">Invoice</th><th className="p-3">Period</th><th className="p-3">Total</th><th className="p-3">Balance</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
            </thead>
            <tbody>
              {details.invoices.map(invoice => (
                <tr key={invoice._id} className="border-t">
                  <td className="p-3 font-semibold">{invoice.invoice_number}</td>
                  <td className="p-3">{invoice.session}, {invoice.term}</td>
                  <td className="p-3">{formatCurrency(invoice.total_amount)}</td>
                  <td className="p-3 font-semibold">{formatCurrency(invoice.balance)}</td>
                  <td className="p-3 capitalize">{invoice.display_status}</td>
                  <td className="p-3">
                    {invoice.payment_url ? (
                      <a href={invoice.payment_url} className="font-semibold text-primary-purple-700 hover:underline">View / Pay</a>
                    ) : (
                      <span className="font-semibold text-secondary-green-600">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {details.payments.length > 0 && (
        <div className="mt-6 border-t pt-5">
          <h3 className="font-semibold">Recent receipts</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {details.payments.slice(0, 6).map(payment => (
              <div key={payment._id} className="flex justify-between rounded-lg border p-3 text-sm">
                <div><p className="font-semibold">{payment.receipt_number}</p><p className="text-xs text-gray-800">{new Date(payment.paid_at).toLocaleDateString("en-NG")}</p></div>
                <strong className="text-secondary-green-600">{formatCurrency(payment.amount)}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Summary({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-lg bg-neutral-300 p-4"><p className="text-xs text-gray-800">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>;
}

function AttendanceSection({ details }: { details: ParentChildDetails }) {
  const attendance = details.attendance;
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Attendance</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Summary label="Attendance" value={`${attendance.percentage}%`} />
        <Summary label="Present" value={attendance.counts.present} />
        <Summary label="Absent" value={attendance.counts.absent} />
        <Summary label="Late" value={attendance.counts.late} />
        <Summary label="Excused" value={attendance.counts.excused} />
      </div>
      {attendance.history.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-grey-50 text-xs uppercase text-gray-800"><tr><th className="p-3">Date</th><th className="p-3">Period</th><th className="p-3">Status</th><th className="p-3">Remark</th></tr></thead>
            <tbody>{attendance.history.slice(0, 20).map(item => <tr key={item.attendance_id} className="border-t"><td className="p-3">{new Date(`${item.date}T00:00:00`).toLocaleDateString("en-NG")}</td><td className="p-3">{item.session}, {item.term}</td><td className="p-3 capitalize">{item.status}</td><td className="p-3">{item.remark || "—"}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ResultsSection({ details }: { details: ParentChildDetails }) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Approved results</h2>
      {details.results.length === 0 ? (
        <p className="mt-4 text-sm text-gray-800">No approved results are available yet.</p>
      ) : (
        <div className="mt-5 space-y-6">
          {details.results.map(result => (
            <div key={result._id} className="overflow-x-auto rounded-lg border">
              <div className="flex justify-between bg-grey-50 p-4"><strong>{result.session}, {result.term}</strong><span className="text-sm capitalize">{result.status ?? "approved"}</span></div>
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="text-xs uppercase text-gray-800"><tr><th className="p-3">Subject</th><th className="p-3">Mid-term</th><th className="p-3">CA</th><th className="p-3">Exam</th><th className="p-3">Total</th><th className="p-3">Grade</th></tr></thead>
                <tbody>{result.blocks.map(block => <tr key={block._id} className="border-t"><td className="p-3 font-semibold">{typeof block.subject === "string" ? "Subject" : block.subject.name}</td><td className="p-3">{block.mid_term_test}</td><td className="p-3">{block.ca_score}</td><td className="p-3">{block.exam_score}</td><td className="p-3 font-semibold">{block.total}</td><td className="p-3 font-semibold">{block.grade}</td></tr>)}</tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ParentChildPage() {
  const router = useRouter();
  const studentId = router.query.studentId as string;
  const childQuery = useQuery({
    queryKey: ["parentChild", studentId],
    queryFn: () => axiosInstance.get(`/parents/me/children/${studentId}`).then(response => response.data as ParentChildDetails),
    enabled: Boolean(studentId),
  });
  const info = childQuery.data?.student.personal_information;
  const studentName = info ? [info.first_name, info.middle_name, info.last_name].filter(Boolean).join(" ") : "Student information";
  return (
    <ParentLayout title={studentName}>
      <Link href={PARENT_DASHBOARD} className="mb-5 inline-flex items-center gap-2 font-semibold text-primary-purple-700"><Icon icon="material-symbols:arrow-back-rounded" /> Back to my children</Link>
      {childQuery.isLoading ? <div className="flex justify-center py-20"><Spinner /></div> : childQuery.isError || !childQuery.data ? <div className="rounded-xl bg-white p-8 text-secondary-red-600">This student information could not be loaded.</div> : <div className="space-y-6"><AttendanceSection details={childQuery.data} /><ResultsSection details={childQuery.data} /><FinanceSection details={childQuery.data} /></div>}
    </ParentLayout>
  );
}
