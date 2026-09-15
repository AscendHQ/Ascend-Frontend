import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_FEES } from "@/config/links";
import { FeeInvoice, FeePayment } from "@/types/fees";

type InvoiceDetailResponse = {
  invoice: FeeInvoice;
  payments: FeePayment[];
};

const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank transfer" },
  { value: "pos", label: "POS" },
  { value: "other", label: "Other" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
};

const getStudentName = (invoice: FeeInvoice) => {
  if (typeof invoice.student === "string") return "Student";
  const info = invoice.student.personal_information;
  return [info.first_name, info.middle_name, info.last_name]
    .filter(Boolean)
    .join(" ");
};

const getClassName = (invoice: FeeInvoice) => {
  if (typeof invoice.class === "string") return "—";
  const section =
    invoice.class.level === "junior"
      ? invoice.class.other_section
      : invoice.class.section;
  return section ? `${invoice.class.name} - ${section}` : invoice.class.name;
};

function SharePaymentLink({ invoiceId }: { invoiceId: string }) {
  const [api, contextHolder] = notification.useNotification();
  const [paymentUrl, setPaymentUrl] = React.useState("");
  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post(`/fees/invoices/${invoiceId}/payment-link`)
        .then(
          response =>
            response.data as { payment_url: string; expires_at: string }
        ),
    onSuccess: response => {
      setPaymentUrl(response.payment_url);
      navigator.clipboard.writeText(response.payment_url).then(
        () =>
          api.success({
            message: "Payment link copied",
            description:
              "Send this secure link to the parent. It expires after 30 days.",
          }),
        () =>
          api.info({
            message: "Payment link created",
            description:
              "Open the preview and copy its address from the browser.",
          })
      );
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Payment link could not be created",
        description: error.response?.data ?? error.message,
      });
    },
  });

  return (
    <>
      {contextHolder}
      <button
        type="button"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
        className="flex items-center gap-2 rounded-lg bg-primary-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-purple-800 disabled:opacity-50"
      >
        <Icon icon="material-symbols:link-rounded" />
        {mutation.isPending ? "Creating link..." : "Copy payment link"}
      </button>
      {paymentUrl && (
        <a
          href={paymentUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-semibold text-primary-purple-700"
        >
          Preview <Icon icon="material-symbols:open-in-new-rounded" />
        </a>
      )}
    </>
  );
}

function PaymentForm({ invoice }: { invoice: FeeInvoice }) {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [amount, setAmount] = React.useState("");
  const [method, setMethod] = React.useState("bank_transfer");
  const [reference, setReference] = React.useState("");
  const [paidAt, setPaidAt] = React.useState(getToday);
  const [note, setNote] = React.useState("");

  const mutation = useMutation({
    mutationFn: () =>
      axiosInstance
        .post(`/fees/invoices/${invoice._id}/payments`, {
          amount: Number(amount),
          method,
          reference: reference || undefined,
          paid_at: paidAt,
          note,
        })
        .then(response => response.data),
    onSuccess: () => {
      api.success({
        message: "Payment recorded",
        description: "The balance and receipt history have been updated.",
      });
      setAmount("");
      setReference("");
      setNote("");
      queryClient.invalidateQueries({ queryKey: ["feeInvoice", invoice._id] });
      queryClient.invalidateQueries({ queryKey: ["feeInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["studentFinances"] });
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.error({
        message: "Payment could not be recorded",
        description: error.response?.data ?? error.message,
      });
    },
  });

  return (
    <section className="print:hidden rounded-lg border-1.5 border-border-colour-light bg-white p-5 sm:p-6">
      {contextHolder}
      <h2 className="text-lg font-semibold">Record payment</h2>
      <p className="mt-1 text-sm text-Text-meduim-emphasis">
        Outstanding balance: {formatCurrency(invoice.balance)}
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Amount
          <input
            type="number"
            min="0.01"
            max={invoice.balance}
            step="0.01"
            value={amount}
            onChange={event => setAmount(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          />
        </label>
        <label className="text-sm font-medium">
          Payment method
          <select
            value={method}
            onChange={event => setMethod(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          >
            {PAYMENT_METHODS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Bank or transaction reference (optional)
          <input
            value={reference}
            onChange={event => setReference(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          />
        </label>
        <label className="text-sm font-medium">
          Payment date
          <input
            type="date"
            max={getToday()}
            value={paidAt}
            onChange={event => setPaidAt(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          />
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Note (optional)
          <textarea
            value={note}
            maxLength={250}
            onChange={event => setNote(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border-colour-light bg-neutral-300 p-2.5 font-normal outline-none focus:border-primary-purple-500"
          />
        </label>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          disabled={
            mutation.isPending ||
            !amount ||
            Number(amount) <= 0 ||
            Number(amount) > invoice.balance
          }
          onClick={() => mutation.mutate()}
          className="w-full rounded-lg bg-primary-purple-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-purple-800 disabled:opacity-50 sm:w-auto"
        >
          {mutation.isPending ? "Recording payment..." : "Record payment"}
        </button>
      </div>
    </section>
  );
}

function InvoiceDocument({ invoice }: { invoice: FeeInvoice }) {
  const student =
    typeof invoice.student === "string" ? undefined : invoice.student;
  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-5 sm:p-6 print:border-0">
      <div className="flex flex-wrap justify-between gap-5 border-b pb-5">
        <div>
          <p className="text-sm font-semibold uppercase text-primary-purple-700">
            School fee invoice
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            {invoice.invoice_number}
          </h1>
          <p className="text-sm capitalize text-Text-meduim-emphasis">
            Status: {invoice.display_status}
          </p>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold">
            {invoice.session}, {invoice.term}
          </p>
          <p>
            Issued {new Date(invoice.createdAt).toLocaleDateString("en-NG")}
          </p>
          <p>Due {new Date(invoice.due_date).toLocaleDateString("en-NG")}</p>
        </div>
      </div>
      <div className="grid gap-5 border-b py-5 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-Text-meduim-emphasis">
            Billed to
          </p>
          <p className="font-semibold">{getStudentName(invoice)}</p>
          <p className="text-sm">{student?.registration_number}</p>
          <p className="text-sm">{getClassName(invoice)}</p>
        </div>
        {student?.guardian_information && (
          <div className="md:text-right">
            <p className="text-xs uppercase text-Text-meduim-emphasis">
              Parent/guardian
            </p>
            <p className="font-semibold">
              {[
                student.guardian_information.first_name,
                student.guardian_information.last_name,
              ]
                .filter(Boolean)
                .join(" ") || "Not provided"}
            </p>
            <p className="text-sm">{student.guardian_information.email}</p>
            <p className="text-sm">
              {student.guardian_information.contact_number}
            </p>
          </div>
        )}
      </div>
      <table className="mt-5 w-full text-left text-sm">
        <thead className="bg-neutral-300 text-xs font-semibold text-Text-high-emphasis">
          <tr>
            <th className="p-3">Fee item</th>
            <th className="p-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr
              key={item.label}
              className="border-b border-border-colour-light"
            >
              <td className="p-3">{item.label}</td>
              <td className="p-3 text-right">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="ml-auto mt-5 w-full max-w-sm space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total</span>
          <strong>{formatCurrency(invoice.total_amount)}</strong>
        </div>
        <div className="flex justify-between text-secondary-green-600">
          <span>Paid</span>
          <strong>{formatCurrency(invoice.amount_paid)}</strong>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg">
          <span>Balance</span>
          <strong>{formatCurrency(invoice.balance)}</strong>
        </div>
      </div>
    </section>
  );
}

function PaymentHistory({ payments }: { payments: FeePayment[] }) {
  return (
    <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-5 sm:p-6 print:border-0">
      <h2 className="text-lg font-semibold">Payment and receipt history</h2>
      {payments.length === 0 ? (
        <p className="mt-4 text-sm text-Text-meduim-emphasis">
          No payments have been recorded for this invoice.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm text-gray-600">
            <thead className="bg-neutral-300 text-xs font-semibold text-Text-high-emphasis">
              <tr>
                <th className="p-3">Receipt</th>
                <th className="p-3">Date</th>
                <th className="p-3">Method</th>
                <th className="p-3">Reference</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr
                  key={payment._id}
                  className="border-t border-border-colour-light"
                >
                  <td className="p-3 font-semibold text-Text-high-emphasis">
                    {payment.receipt_number}
                  </td>
                  <td className="p-3">
                    {new Date(payment.paid_at).toLocaleDateString("en-NG")}
                  </td>
                  <td className="p-3 capitalize">
                    {payment.method.replace("_", " ")}
                  </td>
                  <td className="p-3">{payment.reference}</td>
                  <td className="p-3 text-right font-semibold text-secondary-green-600">
                    {formatCurrency(payment.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function FeeInvoiceDetails() {
  const router = useRouter();
  const invoiceId = router.query.invoiceInfo as string;
  const invoiceQuery = useQuery({
    queryKey: ["feeInvoice", invoiceId],
    queryFn: () =>
      axiosInstance
        .get(`/fees/invoices/${invoiceId}`)
        .then(response => response.data as InvoiceDetailResponse),
    enabled: Boolean(invoiceId),
  });

  if (invoiceQuery.isLoading) {
    return (
      <Container headerTitle="Invoice">
        <div className="flex min-h-[400px] items-center justify-center bg-white">
          <Spinner />
        </div>
      </Container>
    );
  }
  if (!invoiceQuery.data) {
    return (
      <Container headerTitle="Invoice">
        <div className="min-h-[400px] bg-white p-10 text-secondary-red-600">
          Invoice could not be loaded.
        </div>
      </Container>
    );
  }
  const { invoice, payments } = invoiceQuery.data;
  return (
    <Container headerTitle="Invoice">
      <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10 print:p-0">
        <div className="print:hidden mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={DASHBOARD_FEES}
            className="flex items-center gap-2 font-semibold text-primary-purple-700"
          >
            <Icon icon="material-symbols:arrow-back-rounded" /> Back to fees
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {invoice.balance > 0 && (
              <SharePaymentLink invoiceId={invoice._id} />
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg border-1.5 border-border-colour-light bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-300"
            >
              <Icon icon="material-symbols:print-outline-rounded" /> Print
              invoice and receipts
            </button>
          </div>
        </div>
        <InvoiceDocument invoice={invoice} />
        <PaymentHistory payments={payments} />
        {invoice.balance > 0 && (
          <div className="mt-6">
            <PaymentForm invoice={invoice} />
          </div>
        )}
      </main>
    </Container>
  );
}
