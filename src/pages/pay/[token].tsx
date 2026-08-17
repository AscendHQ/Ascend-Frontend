import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import { Spinner } from "@/components/ui/Loading";
import { FeeInvoice, FeePayment } from "@/types/fees";

type PublicInvoice = FeeInvoice & {
  school?: {
    name: string;
    organization_logo?: { path?: string };
  };
};

type PublicInvoiceResponse = {
  invoice: PublicInvoice;
  payments: FeePayment[];
  online_payments_available: boolean;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);

const getStudentName = (invoice: PublicInvoice) => {
  if (typeof invoice.student === "string") return "Student";
  const info = invoice.student.personal_information;
  return [info.first_name, info.middle_name, info.last_name]
    .filter(Boolean)
    .join(" ");
};

function InvoiceSummary({ invoice }: { invoice: PublicInvoice }) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b pb-5">
        <div>
          <p className="text-sm font-semibold uppercase text-primary-purple-700">
            {invoice.school?.name ?? "School fee invoice"}
          </p>
          <h1 className="mt-1 text-2xl font-bold">{invoice.invoice_number}</h1>
          <p className="mt-1 text-sm text-gray-800">
            {getStudentName(invoice)} · {invoice.session}, {invoice.term}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-800">Outstanding balance</p>
          <p className="text-2xl font-bold">{formatCurrency(invoice.balance)}</p>
          <p className="mt-1 text-xs text-gray-800">
            Due {new Date(invoice.due_date).toLocaleDateString("en-NG")}
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {invoice.items.map(item => (
          <div key={item.label} className="flex justify-between gap-4 text-sm">
            <span>{item.label}</span>
            <span className="font-semibold">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2 border-t pt-4 text-sm">
        <div className="flex justify-between">
          <span>Total invoice</span>
          <strong>{formatCurrency(invoice.total_amount)}</strong>
        </div>
        <div className="flex justify-between text-secondary-green-600">
          <span>Previously paid</span>
          <strong>{formatCurrency(invoice.amount_paid)}</strong>
        </div>
      </div>
    </section>
  );
}

function CheckoutForm({
  invoice,
  token,
  isAvailable,
}: {
  invoice: PublicInvoice;
  token: string;
  isAvailable: boolean;
}) {
  const guardianEmail =
    typeof invoice.student === "string"
      ? ""
      : invoice.student.guardian_information?.email ?? "";
  const [email, setEmail] = React.useState(guardianEmail);
  const [amount, setAmount] = React.useState(String(invoice.balance));
  const mutation = useMutation({
    mutationFn: () =>
      axios
        .post(`${apiBaseUrl}/fees/public/invoices/${token}/initialize`, {
          email,
          amount: Number(amount),
        })
        .then(
          response =>
            response.data as { authorization_url: string; reference: string }
        ),
    onSuccess: response => {
      window.location.assign(response.authorization_url);
    },
  });

  if (invoice.balance <= 0) {
    return (
      <section className="rounded-2xl border bg-white p-6 text-center shadow-sm">
        <Icon
          icon="material-symbols:check-circle-rounded"
          className="mx-auto text-5xl text-secondary-green-600"
        />
        <h2 className="mt-3 text-xl font-bold">Invoice fully paid</h2>
        <p className="mt-1 text-sm text-gray-800">
          No outstanding payment is required.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Pay securely online</h2>
      <p className="mt-1 text-sm text-gray-800">
        You may pay the full balance or enter a partial amount.
      </p>
      {!isAvailable && (
        <p className="mt-4 rounded-lg bg-warning-main/10 p-3 text-sm">
          Online payments are temporarily unavailable. Please contact the school.
        </p>
      )}
      <label className="mt-5 block text-sm font-semibold">
        Email address for payment confirmation
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border p-3 font-normal"
          placeholder="parent@example.com"
        />
      </label>
      <label className="mt-4 block text-sm font-semibold">
        Amount to pay
        <input
          type="number"
          min="0.01"
          max={invoice.balance}
          step="0.01"
          value={amount}
          onChange={event => setAmount(event.target.value)}
          className="mt-1 w-full rounded-lg border p-3 font-normal"
        />
      </label>
      {mutation.isError && (
        <p className="mt-4 rounded-lg bg-secondary-red-100 p-3 text-sm text-secondary-red-600">
          {axios.isAxiosError(mutation.error)
            ? mutation.error.response?.data ?? "Payment could not be started."
            : "Payment could not be started."}
        </p>
      )}
      <button
        type="button"
        disabled={
          !isAvailable ||
          mutation.isPending ||
          !email ||
          Number(amount) <= 0 ||
          Number(amount) > invoice.balance
        }
        onClick={() => mutation.mutate()}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        <Icon icon="material-symbols:lock-outline-rounded" />
        {mutation.isPending
          ? "Opening secure checkout..."
          : `Pay ${formatCurrency(Number(amount) || 0)}`}
      </button>
      <p className="mt-3 text-center text-xs text-gray-800">
        Payment is processed securely by Paystack. The school does not receive
        your card or bank credentials.
      </p>
    </section>
  );
}

function ReceiptHistory({ payments }: { payments: FeePayment[] }) {
  if (payments.length === 0) return null;
  return (
    <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="font-bold">Previous payments</h2>
      <div className="mt-3 space-y-3">
        {payments.map(payment => (
          <div
            key={payment._id}
            className="flex items-center justify-between gap-4 border-t pt-3 text-sm"
          >
            <div>
              <p className="font-semibold">{payment.receipt_number}</p>
              <p className="text-xs text-gray-800">
                {new Date(payment.paid_at).toLocaleDateString("en-NG")} ·{" "}
                {payment.provider === "paystack" ? "Online" : payment.method}
              </p>
            </div>
            <strong className="text-secondary-green-600">
              {formatCurrency(payment.amount)}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PublicInvoicePayment() {
  const router = useRouter();
  const token = router.query.token as string;
  const invoiceQuery = useQuery({
    queryKey: ["publicFeeInvoice", token],
    queryFn: () =>
      axios
        .get(`${apiBaseUrl}/fees/public/invoices/${token}`)
        .then(response => response.data as PublicInvoiceResponse),
    enabled: Boolean(token),
    retry: false,
  });

  if (invoiceQuery.isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-300">
        <Spinner />
      </main>
    );
  }
  if (!invoiceQuery.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-300 p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <Icon
            icon="material-symbols:link-off-rounded"
            className="mx-auto text-5xl text-secondary-red-600"
          />
          <h1 className="mt-3 text-xl font-bold">Payment link unavailable</h1>
          <p className="mt-2 text-sm text-gray-800">
            This link is invalid or has expired. Please request a new link from
            the school.
          </p>
        </div>
      </main>
    );
  }
  const { invoice, payments, online_payments_available: isAvailable } =
    invoiceQuery.data;
  return (
    <main className="min-h-screen bg-neutral-300 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-primary-purple-700">
            Secure school payment
          </p>
          <h1 className="text-2xl font-bold">
            {invoice.school?.name ?? "Ascend School Management"}
          </h1>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <InvoiceSummary invoice={invoice} />
            <ReceiptHistory payments={payments} />
          </div>
          <div className="lg:col-span-2">
            <CheckoutForm
              invoice={invoice}
              token={token}
              isAvailable={isAvailable}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
