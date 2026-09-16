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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

const getRequestError = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Payment could not be started.";
  const data = error.response?.data;
  if (typeof data === "string") return data;
  if (data && typeof data === "object" && "message" in data) {
    return String(data.message);
  }
  return "Payment could not be started. Please try again.";
};

function useOnlineStatus() {
  const [isOnline, setIsOnline] = React.useState(true);
  React.useEffect(() => {
    const updateStatus = () => setIsOnline(window.navigator.onLine);
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);
  return isOnline;
}

function InvoiceSummary({ invoice }: { invoice: PublicInvoice }) {
  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-purple-700">
            {invoice.school?.name ?? "School fee invoice"}
          </p>
          <h1 className="mt-1 text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
            {invoice.invoice_number}
          </h1>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            {getStudentName(invoice)} · {invoice.session}, {invoice.term}
          </p>
        </div>
        <div className="sm:text-right">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
              invoice.display_status === "paid"
                ? "bg-secondary-green-100 text-secondary-green-600"
                : invoice.display_status === "overdue"
                ? "bg-secondary-red-100 text-secondary-red-600"
                : "bg-warning-light text-warning-dark"
            }`}
          >
            {invoice.display_status}
          </span>
          <p className="mt-2 text-sm text-Text-meduim-emphasis">
            Outstanding balance
          </p>
          <p className="text-2xl font-semibold text-Text-high-emphasis">
            {formatCurrency(invoice.balance)}
          </p>
          <p className="mt-1 text-xs text-Text-meduim-emphasis">
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
  isOnline,
}: {
  invoice: PublicInvoice;
  token: string;
  isAvailable: boolean;
  isOnline: boolean;
}) {
  const guardianEmail =
    typeof invoice.student === "string"
      ? ""
      : invoice.student.guardian_information?.email ?? "";
  const [email, setEmail] = React.useState(guardianEmail);
  const [amount, setAmount] = React.useState(String(invoice.balance));
  const numericAmount = Number(amount);
  const emailIsValid = EMAIL_PATTERN.test(email.trim());
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
      <section className="rounded-lg border border-border-colour-light bg-white p-6 text-center">
        <Icon
          icon="material-symbols:check-circle-rounded"
          className="mx-auto text-5xl text-secondary-green-600"
        />
        <h2 className="mt-3 text-xl font-bold">Invoice fully paid</h2>
        <p className="mt-1 text-sm text-Text-meduim-emphasis">
          No outstanding payment is required.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-primary-purple-100 p-2 text-primary-purple-700">
          <Icon
            icon="material-symbols:lock-outline-rounded"
            className="text-xl"
          />
        </span>
        <h2 className="text-lg font-semibold text-Text-high-emphasis">
          Pay securely online
        </h2>
      </div>
      <p className="mt-2 text-sm text-Text-meduim-emphasis">
        You may pay the full balance or enter a partial amount.
      </p>
      {!isAvailable && (
        <p className="mt-4 rounded-lg bg-warning-main/10 p-3 text-sm">
          Online payments are temporarily unavailable. Please contact the
          school.
        </p>
      )}
      {!isOnline && (
        <p className="mt-4 rounded-lg bg-warning-main/10 p-3 text-sm">
          You are offline. Reconnect to the internet before starting payment.
        </p>
      )}
      <label className="mt-5 block text-sm font-semibold">
        Email address for payment confirmation
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-border-colour-light p-3 font-normal outline-none focus:border-primary-purple-700"
          placeholder="parent@example.com"
        />
      </label>
      {email && !emailIsValid && (
        <p className="mt-1 text-xs text-secondary-red-600">
          Enter a valid email address.
        </p>
      )}
      <label className="mt-4 block text-sm font-semibold">
        Amount to pay
        <input
          type="number"
          min="0.01"
          max={invoice.balance}
          step="0.01"
          value={amount}
          onChange={event => setAmount(event.target.value)}
          className="mt-1 w-full rounded-lg border border-border-colour-light p-3 font-normal outline-none focus:border-primary-purple-700"
        />
      </label>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setAmount((invoice.balance / 2).toFixed(2))}
          className="rounded-lg border border-border-colour-light px-3 py-2 text-sm font-semibold text-Text-high-emphasis"
        >
          Pay 50%
        </button>
        <button
          type="button"
          onClick={() => setAmount(String(invoice.balance))}
          className="rounded-lg border border-primary-purple-700 px-3 py-2 text-sm font-semibold text-primary-purple-700"
        >
          Pay full balance
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-4 rounded-lg bg-secondary-red-100 p-3 text-sm text-secondary-red-600">
          {getRequestError(mutation.error)}
        </p>
      )}
      <button
        type="button"
        disabled={
          !isAvailable ||
          !isOnline ||
          mutation.isPending ||
          !emailIsValid ||
          !Number.isFinite(numericAmount) ||
          numericAmount <= 0 ||
          numericAmount > invoice.balance
        }
        onClick={() => mutation.mutate()}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon icon="material-symbols:lock-outline-rounded" />
        {mutation.isPending
          ? "Opening secure checkout..."
          : `Pay ${formatCurrency(numericAmount || 0)}`}
      </button>
      <p className="mt-3 text-center text-xs text-Text-meduim-emphasis">
        Payment is processed securely by Paystack. The school does not receive
        your card or bank credentials.
      </p>
    </section>
  );
}

function ReceiptHistory({ payments }: { payments: FeePayment[] }) {
  if (payments.length === 0) return null;
  return (
    <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-5 sm:p-6">
      <h2 className="font-semibold text-Text-high-emphasis">
        Previous payments
      </h2>
      <div className="mt-3 space-y-3">
        {payments.map(payment => (
          <div
            key={payment._id}
            className="flex items-center justify-between gap-4 border-t border-border-colour-light pt-3 text-sm"
          >
            <div>
              <p className="font-semibold">{payment.receipt_number}</p>
              <p className="text-xs text-Text-meduim-emphasis">
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
  const isOnline = useOnlineStatus();
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
        <div className="max-w-md rounded-lg border border-border-colour-light bg-white p-8 text-center">
          <Icon
            icon="material-symbols:link-off-rounded"
            className="mx-auto text-5xl text-secondary-red-600"
          />
          <h1 className="mt-3 text-xl font-semibold">
            {isOnline ? "Payment link unavailable" : "You are offline"}
          </h1>
          <p className="mt-2 text-sm text-Text-meduim-emphasis">
            {isOnline
              ? "This link is invalid or has expired. Please request a new link from the school."
              : "Reconnect to the internet to load and pay this invoice."}
          </p>
        </div>
      </main>
    );
  }
  const {
    invoice,
    payments,
    online_payments_available: isAvailable,
  } = invoiceQuery.data;
  return (
    <main className="min-h-screen bg-neutral-300 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-purple-700 text-white">
            <Icon
              icon="material-symbols:school-outline-rounded"
              className="text-2xl"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-purple-700">
            Secure school payment
          </p>
          <h1 className="mt-1 text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
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
              isOnline={isOnline}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
